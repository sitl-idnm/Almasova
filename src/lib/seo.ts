import type { Metadata } from "next";

import type { GenderSlug } from "./gender";
import { getBaseUrl, type CitySlug } from "./site-data";

// Одна услуга/раздел существует в двух странах на одном языке (RU).
// hreflang разводит Москву (ru-RU) и Алматы (ru-KZ), чтобы Яндекс/Google
// не считали их дублями и не каннибализировали выдачу. x-default → Москва.
const cityLang: Record<CitySlug, string> = {
  moskva: "ru-RU",
  almaty: "ru-KZ",
};

const cities = Object.keys(cityLang) as CitySlug[];

/**
 * Canonical + взаимные hreflang для страницы, которая существует в каждом городе.
 * @param city    текущий город
 * @param subPath путь после `/{city}` (напр. `/ceny`, `/trihopigmentaciya`); "" для хаба города
 */
export function cityAlternates(
  city: CitySlug,
  gender: GenderSlug,
  subPath = "",
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const c of cities) {
    languages[cityLang[c]] = getBaseUrl(`/${c}/${gender}${subPath}`);
  }
  languages["x-default"] = getBaseUrl(`/moskva/${gender}${subPath}`);

  return {
    canonical: getBaseUrl(`/${city}/${gender}${subPath}`),
    languages,
  };
}

type PageMetaInput = {
  title: string;
  description: string;
  /** canonical (+ hreflang); canonical же уходит в og:url */
  alternates: NonNullable<Metadata["alternates"]>;
};

/**
 * title/description/canonical страницы + своя соцмета (og:*, twitter:*).
 * openGraph дочернего сегмента целиком заменяет корневой, поэтому общие поля
 * (siteName, locale, картинка 1200×630) повторяем здесь.
 */
export function pageMeta({ title, description, alternates }: PageMetaInput): Metadata {
  const url = typeof alternates.canonical === "string" ? alternates.canonical : undefined;
  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url,
      siteName: "Алёна Алмасова",
      locale: "ru_RU",
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Алёна Алмасова — трихопигментация и камуфляж рубцов",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/twitter-image"],
    },
  };
}
