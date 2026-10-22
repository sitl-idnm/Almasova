import type { NextConfig } from "next";
import path from "node:path";

const stylesDir = path.join(process.cwd(), "src/shared/styles");

/**
 * Старая (проиндексированная) структура была плоской: /[city]/<подстраница>.
 * Редизайн ввёл сегмент пола: /[city]/[gender]/<подстраница>. Чтобы не потерять
 * позиции и входящий трафик по старым адресам, отдаём 308-редиректы на дефолтный
 * пол (muzhchinam). Список = все прежние подстраницы города + concern-страницы.
 */
const OLD_SUBPATHS = [
  "trihopigmentaciya",
  "kamuflyazh-rubcov-na-golove",
  "ceny",
  "do-posle",
  "otzyvy",
  "faq",
  "kontakty",
  // concern-страницы (были на /[city]/[concern])
  "posle-peresadki-volos",
  "rubcy-posle-fue-fut",
  "redkie-volosy-u-zhenshchin",
  "zagushchenie-makushki",
  "net-donorskoy-zony",
  "neudachnaya-peresadka-volos",
  "effekt-brityh-volos",
  "liniya-rosta-volos",
  "posle-himioterapii",
  "trihopigmentaciya-dlya-zhenshchin",
];

/** Публичные картинки из /public/images. */
const IMAGE_CACHE = [
  // Файлы /images без хеша в имени (alena.png) → 31 день. При замене фото
  // лучше дать файлу новое имя, иначе вернувшиеся посетители увидят старое до месяца.
  {
    source: "/images/:path*",
    headers: [{ key: "Cache-Control", value: "public, max-age=2678400, stale-while-revalidate=86400" }],
  },
  // Фото галереи: в имени хеш содержимого (scripts/sync-gallery.mjs) → год, immutable.
  // Правило стоит после общего: при совпадении ключа в Next побеждает последнее.
  {
    source: "/images/works-drive/:path*",
    headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
  },
  // Сгенерированные иконка и картинки для соцсетей.
  {
    source: "/:route(icon|opengraph-image|twitter-image)",
    headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
  },
];

const nextConfig: NextConfig = {
  images: {
    // Оптимизированные /_next/image кешируются браузером 31 день (по умолчанию 4 ч).
    minimumCacheTTL: 2678400,
  },
  async headers() {
    return [...IMAGE_CACHE];
  },
  sassOptions: {
    // `loadPaths` for the modern Dart Sass API, `includePaths` for legacy —
    // set both so `@use "mixins"` / `@use "variables"` resolve either way.
    loadPaths: [stylesDir],
    includePaths: [stylesDir],
  },
  async redirects() {
    return [
      // Старый плоский адрес города → дефолтный пол.
      {
        source: "/:city(moskva|almaty)",
        destination: "/:city/muzhchinam",
        permanent: true,
      },
      // Старые плоские подстраницы и concern-страницы → под /muzhchinam/.
      {
        source: `/:city(moskva|almaty)/:slug(${OLD_SUBPATHS.join("|")})`,
        destination: "/:city/muzhchinam/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
