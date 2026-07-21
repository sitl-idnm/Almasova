import type { MetadataRoute } from "next";

import { concernCopy } from "@/content/concern-copy";
import { genderSlugs } from "@/lib/gender";

const base = "https://almasova.com";
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
  ];

  return paths.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : path.split("/").length <= 3 ? 0.9 : 0.8,
  }));
}
