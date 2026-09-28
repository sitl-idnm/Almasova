/**
 * Синхронизация галереи «до/после» из папки Google Drive.
 *
 *   npm run sync:gallery
 *
 * Что делает:
 *   1) забирает список изображений из ПУБЛИЧНОЙ папки Google Drive (Drive API v3);
 *   2) скачивает каждое фото, ужимает и конвертирует в WebP (sharp);
 *   3) кладёт в public/images/works-drive/;
 *   4) перегенерирует src/content/works-drive.generated.ts.
 *
 * Требуется один раз:
 *   • открыть папку Drive: «Доступ по ссылке → Любой, у кого есть ссылка → Читатель»;
 *   • создать бесплатный API-ключ в Google Cloud Console (включить «Google Drive API»);
 *   • установить sharp:  npm i -D sharp
 *
 * Переменные окружения (можно положить в .env.local):
 *   GDRIVE_API_KEY   — ключ Google API (обязательно);
 *   GDRIVE_FOLDER_ID — id папки (по умолчанию — папка клиента ниже).
 *
 * СХЕМА ИМЁН ФАЙЛОВ В DRIVE (всё опционально, разделитель — двойное подчёркивание `__`):
 *   <пол>__<Заголовок>__<Подпись>__<сеансы>.jpg
 *   пол:      m|muzh|male → мужской;  zh|f|zhen|female → женский;  иначе — общий
 *   пример:   m__Макушка__Просвечивающую макушку сделали визуально плотной__2-3 сеанса.jpg
 *   пример:   zh__Пробор__Вернули густоту по пробору без операций.jpg
 *   Если `__` нет — заголовок берётся из имени файла (дефисы → пробелы).
 */
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const FOLDER_ID = process.env.GDRIVE_FOLDER_ID || "1SKcxLy_n3TiDdNpPoLt5yu5K6z-cs9H7";
const API_KEY = process.env.GDRIVE_API_KEY;

const ROOT = path.resolve(process.cwd());
const OUT_DIR = path.join(ROOT, "public", "images", "works-drive");
const OUT_URL_BASE = "/images/works-drive";
const GEN_FILE = path.join(ROOT, "src", "content", "works-drive.generated.ts");
const MAX_WIDTH = 1600;
const QUALITY = 80;

function fail(msg) {
  console.error("\n✖ " + msg + "\n");
  process.exit(1);
}

if (!API_KEY) {
  fail(
    "Не задан GDRIVE_API_KEY. Создайте API-ключ в Google Cloud Console (включив Google Drive API)\n" +
      "  и запустите: GDRIVE_API_KEY=xxxx npm run sync:gallery\n" +
      "  (или добавьте GDRIVE_API_KEY в .env.local)",
  );
}

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  fail("Не установлен sharp. Выполните: npm i -D sharp");
}

const IMAGE_MIME = /^image\/(jpe?g|png|webp|heic|heif)$/i;

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 60);

const translitLite = (s) => s; // имена файлов латиницей рекомендуются; кириллицу slugify тоже переварит

function parseMeta(rawName) {
  const base = rawName.replace(/\.[^.]+$/, "");
  const parts = base.split("__").map((p) => p.trim());
  let gender = "both";
  let title = base.replace(/[-_]+/g, " ").trim();
  let details = "";
  let sessions = "";

  if (parts.length > 1) {
    const g = parts[0].toLowerCase();
    if (/^(m|muzh|male|man|муж)/.test(g)) gender = "male";
    else if (/^(zh|f|zhen|female|women|жен)/.test(g)) gender = "female";
    const rest = gender === "both" ? parts : parts.slice(1);
    title = (rest[0] || title).replace(/[-_]+/g, " ").trim();
    details = (rest[1] || "").trim();
    sessions = (rest[2] || "").trim();
  }

  if (!details) details = title;
  return { gender, title, details, sessions };
}

async function listFiles() {
  const files = [];
  let pageToken = "";
  do {
    const url = new URL("https://www.googleapis.com/drive/v3/files");
    url.searchParams.set("q", `'${FOLDER_ID}' in parents and trashed=false`);
    url.searchParams.set("key", API_KEY);
    url.searchParams.set("fields", "nextPageToken, files(id,name,mimeType)");
    url.searchParams.set("pageSize", "1000");
    url.searchParams.set("orderBy", "name_natural");
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const res = await fetch(url);
    if (!res.ok) {
      const body = await res.text();
      fail(`Drive API вернул ${res.status}. Проверьте API-ключ и доступ к папке.\n${body}`);
    }
    const data = await res.json();
    files.push(...(data.files || []));
    pageToken = data.nextPageToken || "";
  } while (pageToken);

  return files.filter((f) => IMAGE_MIME.test(f.mimeType));
}

async function downloadFile(id) {
  const url = `https://www.googleapis.com/drive/v3/files/${id}?alt=media&key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) fail(`Не удалось скачать файл ${id}: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  console.log(`→ Папка Drive: ${FOLDER_ID}`);
  const files = await listFiles();
  if (!files.length) {
    console.log("В папке нет изображений — генерирую пустой список.");
  } else {
    console.log(`Найдено изображений: ${files.length}`);
  }

  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  const items = [];
  const usedSlugs = new Set();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const meta = parseMeta(file.name);
    let slug = slugify(translitLite(meta.title)) || `foto-${i + 1}`;
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
  const body = JSON.stringify(items, null, 2);
  await writeFile(GEN_FILE, `${header}${body};\n`, "utf8");

  console.log(`\n✔ Готово. Кейсов: ${items.length}. Обновлён ${path.relative(ROOT, GEN_FILE)}`);
  if (items.length) {
    console.log("  Проверьте сборку:  npm run build");
  }
}

main().catch((e) => fail(e.stack || String(e)));
