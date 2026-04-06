import type { MetadataRoute } from "next";

const base = "https://almasova.com";
const cities = ["moskva", "almaty"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    ...cities.flatMap((city) => [
      `/${city}`,
      `/${city}/trihopigmentaciya`,
      `/${city}/kamuflyazh-rubcov-na-golove`,
      `/${city}/ceny`,
      `/${city}/do-posle`,
      `/${city}/otzyvy`,
      `/${city}/faq`,
      `/${city}/kontakty`,
    ]),
  ];

  return staticPages.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : path.split("/").length <= 2 ? 0.9 : 0.8,
  }));
}
