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
): Metadata["alternates"] {
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
