import type { MetadataRoute } from "next";

import { blogArticles } from "@/content/blog";
import { concernCopy } from "@/content/concern-copy";
import { legalDocs } from "@/content/legal";
import { genderSlugs } from "@/lib/gender";

const base = "https://almasova.com";

/**
 * Даты последней правки текстов (lastmod). Обновлять вручную при изменении
 * копирайта или title/description: дата сборки здесь не годится — она менялась
 * бы при каждом деплое, и поисковики перестали бы доверять lastmod.
 */
const PAGES_UPDATED = "2026-11-02";
const LEGAL_UPDATED = "2026-09-28";
const cities = ["moskva", "almaty"];
const concerns = Object.keys(concernCopy);

/** Одна страница на город — без гендерных копий (они 301-ят сюда). */
const subPaths = [
  "",
  ...genderSlugs.map((gender) => `/${gender}`),
  "/kamuflyazh-rubcov-na-golove",
  "/ceny",
  "/do-posle",
  "/otzyvy",
  "/faq",
  "/kontakty",
  ...concerns.map((concern) => `/${concern}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: base, lastModified: PAGES_UPDATED, changeFrequency: "weekly", priority: 1 },
    ...cities.flatMap((city) =>
      subPaths.map((sub) => ({
        url: `${base}/${city}${sub}`,
        lastModified: PAGES_UPDATED,
        changeFrequency: "weekly" as const,
        priority: sub === "" ? 0.95 : 0.8,
      })),
    ),
    { url: `${base}/blog`, lastModified: PAGES_UPDATED, changeFrequency: "weekly", priority: 0.7 },
    ...blogArticles.map((article) => ({
      url: `${base}/blog/${article.slug}`,
      lastModified: article.updated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...legalDocs.map((doc) => ({
      url: `${base}/${doc.slug}`,
      lastModified: LEGAL_UPDATED,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
  return pages;
}
