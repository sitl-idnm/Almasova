import type { Metadata } from "next";

import {
  brandSameAs,
  defaultPhoneDisplay,
  getBaseUrl,
  specialistName,
  type CitySlug,
  type FaqItem,
  type PriceItem,
} from "./site-data";

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
 * Одна страница на город — без вариантов по полу (они склеивались как дубли).
 * @param city    текущий город
 * @param subPath путь после `/{city}` (напр. `/ceny`); "" для главной страницы города
 */
export function cityAlternates(
  city: CitySlug,
  subPath = "",
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const c of cities) {
    languages[cityLang[c]] = getBaseUrl(`/${c}${subPath}`);
  }
  languages["x-default"] = getBaseUrl(`/moskva${subPath}`);

  return {
    canonical: getBaseUrl(`/${city}${subPath}`),
    languages,
  };
}

/** generateStaticParams для страниц уровня /[city]/... */
export function cityParams() {
  return cities.map((city) => ({ city }));
}

/* ---------------- JSON-LD ---------------- */

/**
 * Как бренд ищут на самом деле: по Wordstat «алмазовой» (через з) — 34 запроса
 * в месяц против 5 у правильного написания. alternateName помогает поисковикам
 * связать оба написания с сайтом и карточками на Картах.
 */
export const brandAlternateNames = [
  "Алёна Алмазова",
  "Алмазова",
  "Алмасова",
  "Студия трихопигментации SMP Алмасовой",
  "Студия трихопигментации SMP Алмазовой",
];

/** Единая сущность бизнеса (на неё ссылаются Service.provider и Article.publisher). */
export function businessSchema(extra: Record<string, unknown> = {}) {
  return {
    "@type": "HealthAndBeautyBusiness",
    "@id": `${getBaseUrl("/")}#business`,
    name: specialistName,
    alternateName: brandAlternateNames,
    url: getBaseUrl("/"),
    telephone: defaultPhoneDisplay,
    image: getBaseUrl("/opengraph-image"),
    priceRange: "₽₽",
    areaServed: ["Москва", "Алматы"],
    founder: { "@id": `${getBaseUrl("/")}#person` },
    sameAs: brandSameAs,
    ...extra,
  };
}

export function personSchema() {
  return {
    "@type": "Person",
    "@id": `${getBaseUrl("/")}#person`,
    name: specialistName,
    alternateName: "Алёна Алмазова",
    url: getBaseUrl("/"),
    jobTitle: "Специалист по трихопигментации кожи головы",
    description:
      "Специалист по трихопигментации и камуфляжу рубцов на голове с высшим медицинским образованием. Москва и Алматы.",
    worksFor: { "@id": `${getBaseUrl("/")}#business` },
    sameAs: brandSameAs,
  };
}

export function faqSchema(items: readonly FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** BreadcrumbList; последний пункт — текущая страница (url обязателен у всех). */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getBaseUrl(item.path),
    })),
  };
}

const currencyByCity: Record<CitySlug, string> = { moskva: "RUB", almaty: "KZT" };

/** «от 15 000 ₽» → 15000 */
function priceNumber(price: string): number | null {
  const digits = price.replace(/[^\d]/g, "");
  return digits ? Number(digits) : null;
}

/**
 * Service + OfferCatalog с ценами «от …» — чтобы цена была видна в сниппете.
 * minPrice в UnitPriceSpecification = честное «от».
 */
export function serviceSchema({
  city,
  cityName,
  name,
  description,
  path,
  priceItems,
}: {
  city: CitySlug;
  cityName: string;
  name: string;
  description: string;
  path: string;
  priceItems: readonly PriceItem[];
}) {
  const currency = currencyByCity[city];
  return {
    "@type": "Service",
    name,
    serviceType: "Трихопигментация кожи головы",
    description,
    url: getBaseUrl(path),
    areaServed: { "@type": "City", name: cityName },
    provider: { "@id": `${getBaseUrl("/")}#business` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Цены — ${cityName}`,
      itemListElement: priceItems.map((item) => {
        const value = priceNumber(item.price);
        return {
          "@type": "Offer",
          name: item.title,
          description: item.description,
          priceCurrency: currency,
          ...(value
            ? {
                price: value,
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  minPrice: value,
                  priceCurrency: currency,
                  unitText: "сеанс",
                },
              }
            : {}),
          availability: "https://schema.org/InStock",
          url: getBaseUrl(`/${city}/ceny`),
        };
      }),
    },
  };
}

/** Суффикс из title.template корневого layout. */
const BRAND_SUFFIX = " | Алёна Алмасова";
/** Дальше Яндекс и Google обрезают title в выдаче. */
const TITLE_MAX = 70;

/** Добавлять « | Алёна Алмасова», только если title с ним влезает в 70 символов. */
export function fitTitle(title: string): Metadata["title"] {
  return title.length + BRAND_SUFFIX.length <= TITLE_MAX ? title : { absolute: title };
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
    title: fitTitle(title),
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
