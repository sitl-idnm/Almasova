import type { NextConfig } from "next";
import path from "node:path";

const stylesDir = path.join(process.cwd(), "src/shared/styles");

const CITY = ":city(moskva|almaty)";
const GENDER = ":gender(muzhchinam|zhenshchinam)";

/**
 * Страницы, которые живут по одной на город: /[city]/<slug>. Раньше каждая была
 * в двух копиях /[city]/muzhchinam/<slug> и /[city]/zhenshchinam/<slug> с
 * одинаковыми заголовками — поисковики склеивали пары (анализ конкурентов
 * 02.11.2026). Теперь гендерные копии 301-ят на единственный адрес.
 */
const CITY_PAGES = [
  "kamuflyazh-rubcov-na-golove",
  "ceny",
  "do-posle",
  "otzyvy",
  "faq",
  "kontakty",
  "posle-peresadki-volos",
  "rubcy-posle-fue-fut",
  "zagushchenie-makushki",
  "net-donorskoy-zony",
  "liniya-rosta-volos",
  "posle-himioterapii",
].join("|");

/**
 * Страницы, слитые с другими (каннибализировали один запрос). Ключ — старый
 * slug (и с полом, и без — плоская структура до редизайна), значение — куда теперь.
 */
const MERGED: Record<string, string> = {
  trihopigmentaciya: "",
  "trihopigmentaciya-dlya-zhenshchin": "/zhenshchinam",
  "redkie-volosy-u-zhenshchin": "/zhenshchinam",
  "effekt-brityh-volos": "/muzhchinam",
  "neudachnaya-peresadka-volos": "/posle-peresadki-volos",
};

/** Технические и альтернативные хосты → основной домен. */
const ALT_HOSTS = ["almasova.vercel.app", "www.almasova.com"];

/**
 * CSP пока только в режиме Report-Only: браузер ничего не блокирует, а лишь
 * шлёт отчёты на /api/csp-report. Включать как Content-Security-Policy —
 * после 2–4 недель без неожиданных нарушений в логах.
 * 'unsafe-inline' для скриптов нужен: страницы статические (SSG), nonce на каждый
 * запрос без перевода в динамический рендер не выдать; инлайн — код Next,
 * анти-FOUC темы и загрузчик Метрики.
 */
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://mc.yandex.ru https://mc.yandex.com https://yastatic.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://mc.yandex.ru https://mc.yandex.com https://avatars.mds.yandex.net",
  "font-src 'self' data:",
  "connect-src 'self' https://mc.yandex.ru https://mc.yandex.com wss://mc.yandex.ru wss://mc.yandex.com",
  // Виджеты карты и отзывов (yandex.ru) и служебные фреймы Метрики.
  "frame-src https://yandex.ru https://*.yandex.ru https://mc.yandex.ru https://mc.yandex.com",
  "child-src blob: https://mc.yandex.ru https://mc.yandex.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Карта кликов и Вебвизор Метрики показывают сайт во фрейме своего интерфейса.
  "frame-ancestors 'self' https://metrika.yandex.ru https://metrika.yandex.com https://metrika.yandex.by https://metrika.yandex.kz https://metrica.yandex.com https://*.webvisor.com https://*.webvisor.org",
  "report-uri /api/csp-report",
].join("; ");

/**
 * Защитные заголовки для всех ответов. X-Frame-Options намеренно не ставим:
 * SAMEORIGIN запретил бы показ сайта в карте кликов/Вебвизоре Метрики.
 * От встраивания на чужие сайты защитит frame-ancestors выше, когда CSP
 * переведут из Report-Only в рабочий режим.
 */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy-Report-Only", value: CSP_REPORT_ONLY },
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
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }, ...IMAGE_CACHE];
  },
  sassOptions: {
    // `loadPaths` for the modern Dart Sass API, `includePaths` for legacy —
    // set both so `@use "mixins"` / `@use "variables"` resolve either way.
    loadPaths: [stylesDir],
    includePaths: [stylesDir],
  },
  async redirects() {
    return [
      // almasova.vercel.app попал в индекс Яндекса как дубль сайта.
      ...ALT_HOSTS.map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: "https://almasova.com/:path*",
        statusCode: 301 as const,
      })),
      // Слитые страницы — и из гендерной структуры, и из старой плоской.
      ...Object.entries(MERGED).flatMap(([slug, target]) => [
        { source: `/${CITY}/${GENDER}/${slug}`, destination: `/:city${target}`, statusCode: 301 as const },
        { source: `/${CITY}/${slug}`, destination: `/:city${target}`, statusCode: 301 as const },
      ]),
      // Гендерные копии обычных страниц → одна страница на город.
      {
        source: `/${CITY}/${GENDER}/:slug(${CITY_PAGES})`,
        destination: "/:city/:slug",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
