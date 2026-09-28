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

const nextConfig: NextConfig = {
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
