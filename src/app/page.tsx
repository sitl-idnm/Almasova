import type { Metadata } from "next";

import { JsonLd, SiteFooter, SiteHeader } from "@/components/marketing";
import { HomeView } from "@/views/home/home";
import { homeCopy } from "@/content/home-copy";
import { brandAlternateNames, businessSchema, pageMeta, personSchema } from "@/lib/seo";
import { getBaseUrl, specialistName } from "@/lib/site-data";

export const metadata: Metadata = pageMeta({
  title: homeCopy.metadataTitle,
  description: homeCopy.metadataDescription,
  alternates: { canonical: getBaseUrl("/") },
});

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      businessSchema(),
      personSchema(),
      {
        "@type": "WebSite",
        name: specialistName,
        alternateName: brandAlternateNames,
        url: getBaseUrl("/"),
        publisher: { "@id": `${getBaseUrl("/")}#business` },
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <SiteHeader />
      <HomeView />
      <SiteFooter />
    </>
  );
}
