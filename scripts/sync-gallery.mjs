/**
 * Синхронизация галереи «до/после» из ПУБЛИЧНОЙ папки Google Drive.
 *
 *   npm run sync:gallery
 *
 * Что делает:
 *   1) забирает список изображений из публичной папки Drive (без API-ключа,
 *      через embeddedfolderview);
 *   2) скачивает каждое фото, ужимает и конвертирует в WebP (sharp);
 *   3) кладёт в public/images/works-drive/ (папка полностью пересобирается);
 *   4) перегенерирует src/content/works-drive.generated.ts.
 *
 * Требуется один раз:
 *   • папка Drive должна быть открыта: «Доступ по ссылке → Любой, у кого есть ссылка → Читатель»;
 *   • установить sharp:  npm i -D sharp
 *
 * Переменные окружения (необязательно):
 *   GDRIVE_FOLDER_ID — id папки (по умолчанию — папка клиента ниже).
 *
 * ПОДПИСИ/ПОЛ. Если имя файла в Drive содержит двойное подчёркивание `__`, оно
 * разбирается как  <пол>__<Заголовок>__<Подпись>__<сеансы>.jpg  (пол: m|zh).
 * Иначе кейс получает нейтральную подпись «Работа N» и показывается всем.
 */
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const FOLDER_ID = process.env.GDRIVE_FOLDER_ID || "1NUkP5UMET5C7hmvUn1n6uWouP-_zyVbw";

const ROOT = path.resolve(process.cwd());
const OUT_DIR = path.join(ROOT, "public", "images", "works-drive");
const OUT_URL_BASE = "/images/works-drive";
const GEN_FILE = path.join(ROOT, "src", "content", "works-drive.generated.ts");
const MAX_WIDTH = 1600;
const QUALITY = 80;
const UA = "Mozilla/5.0";

function fail(msg) {
  console.error("\n✖ " + msg + "\n");
  process.exit(1);
}

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  fail("Не установлен sharp. Выполните: npm i -D sharp");
}

const IMAGE_EXT = /\.(jpe?g|png|webp|heic|heif)$/i;

const TRANSLIT = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sch",
  ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

// Латиница-безопасный slug (кириллица → транслит), чтобы имена файлов и URL
// не ломались на Linux/CDN.
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[а-яё]/g, (ch) => TRANSLIT[ch] ?? "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 60);

function parseMeta(rawName, index) {
  const base = rawName.replace(/\.[^.]+$/, "");
  const fallbackTitle = `Работа ${index + 1}`;

  if (base.includes("__")) {
    const parts = base.split("__").map((p) => p.trim());
    let gender = "both";
    const g = parts[0].toLowerCase();
    if (/^(m|muzh|male|man|муж)/.test(g)) gender = "male";
    else if (/^(zh|f|zhen|female|women|жен)/.test(g)) gender = "female";
    const rest = gender === "both" ? parts : parts.slice(1);
    const title = (rest[0] || fallbackTitle).replace(/[-_]+/g, " ").trim();
    const details = (rest[1] || "Трихопигментация — до и после").trim();
    const sessions = (rest[2] || "").trim();
    return { gender, title, details, sessions };
  }

  return {
    gender: "both",
    title: fallbackTitle,
    details: "Трихопигментация — до и после",
    sessions: "",
  };
}

async function listFiles() {
  const url = `https://drive.google.com/embeddedfolderview?id=${FOLDER_ID}#list`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`Не удалось открыть папку (${res.status}). Проверьте доступ «по ссылке».`);
  const html = await res.text();

  const files = [];
  const re = /id="entry-([A-Za-z0-9_-]{20,})"[\s\S]*?flip-entry-title[^>]*>([^<]+)</g;
  let m;
  while ((m = re.exec(html))) {
    const [, id, name] = m;
    if (IMAGE_EXT.test(name)) files.push({ id, name: name.trim() });
  }
  return files;
}

async function downloadFile(id) {
  const url = `https://drive.usercontent.google.com/download?id=${id}&export=download`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`Не удалось скачать файл ${id}: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  console.log(`→ Папка Drive: ${FOLDER_ID}`);
  const files = await listFiles();
  console.log(files.length ? `Найдено изображений: ${files.length}` : "В папке нет изображений.");

  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  const items = [];
  const usedSlugs = new Set();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const meta = parseMeta(file.name, i);
    let slug = slugify(meta.title) || `foto-${i + 1}`;
    while (usedSlugs.has(slug)) slug += `-${i + 1}`;
    usedSlugs.add(slug);

    process.stdout.write(`  [${i + 1}/${files.length}] ${file.name} … `);
    const buf = await downloadFile(file.id);
    const webp = await sharp(buf)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toBuffer();
    const fileName = `${slug}.webp`;
    await writeFile(path.join(OUT_DIR, fileName), webp);
    console.log(`ok (${Math.round(webp.length / 1024)} KB, ${meta.gender})`);

    items.push({
      title: meta.title,
      details: meta.details,
      sessions: meta.sessions,
      imageSrc: `${OUT_URL_BASE}/${fileName}`,
      alt: `${meta.title}: до и после`,
      gender: meta.gender,
    });
  }

  const header = `import type { ProofItem } from "@/lib/site-data";

/**
 * АВТОГЕНЕРИРУЕМЫЙ ФАЙЛ — не редактировать вручную.
 * Создан скриптом scripts/sync-gallery.mjs (npm run sync:gallery).
 * Источник: папка Google Drive ${FOLDER_ID}.
 */
export const driveWorks: ProofItem[] = `;
  await writeFile(GEN_FILE, `${header}${JSON.stringify(items, null, 2)};\n`, "utf8");

  console.log(`\n✔ Готово. Кейсов: ${items.length}. Обновлён ${path.relative(ROOT, GEN_FILE)}`);
}

main().catch((e) => fail(e.stack || String(e)));
