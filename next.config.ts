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
