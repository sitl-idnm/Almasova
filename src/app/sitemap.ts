import type { MetadataRoute } from "next";

import { concernCopy } from "@/content/concern-copy";
import { legalDocs } from "@/content/legal";
import { genderSlugs } from "@/lib/gender";

const base = "https://almasova.com";

/**
 * Даты последней правки текстов (lastmod). Обновлять вручную при изменении
 * копирайта или title/description: дата сборки здесь не годится — она менялась
 * бы при каждом деплое, и поисковики перестали бы доверять lastmod.
 */
const PAGES_UPDATED = "2026-10-22";
const LEGAL_UPDATED = "2026-09-28";
const cities = ["moskva", "almaty"];
const concerns = Object.keys(concernCopy);

const subPaths = [
  "",
  "/trihopigmentaciya",
  "/kamuflyazh-rubcov-na-golove",
  "/ceny",
  "/do-posle",
  "/otzyvy",
  "/faq",
  "/kontakty",
  ...concerns.map((concern) => `/${concern}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    ...cities.flatMap((city) =>
      genderSlugs.flatMap((gender) =>
        subPaths.map((sub) => `/${city}/${gender}${sub}`),
      ),
    ),
    ...legalDocs.map((doc) => `/${doc.slug}`),
  ];

  const legalPaths = new Set(legalDocs.map((doc) => `/${doc.slug}`));

  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: legalPaths.has(path) ? LEGAL_UPDATED : PAGES_UPDATED,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : path.split("/").length <= 3 ? 0.9 : 0.8,
  }));
}
