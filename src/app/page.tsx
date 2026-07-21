import type { Metadata } from "next";

import { JsonLd, SiteFooter, SiteHeader } from "@/components/marketing";
import { HomeView } from "@/views/home/home";
import { homeCopy } from "@/content/home-copy";
import { brandSameAs, getBaseUrl, specialistName } from "@/lib/site-data";

export const metadata: Metadata = {
  title: homeCopy.metadataTitle,
  description: homeCopy.metadataDescription,
  alternates: {
    canonical: getBaseUrl("/"),
  },
};

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: specialistName,
        url: getBaseUrl("/"),
        telephone: "+7 985 990 7601",
        sameAs: brandSameAs,
      },
      {
        "@type": "Person",
        name: specialistName,
        url: getBaseUrl("/"),
        jobTitle: "Врач, специалист по трихопигментации кожи головы",
        sameAs: brandSameAs,
      },
      {
        "@type": "MedicalBusiness",
        name: specialistName,
        url: getBaseUrl("/"),
        telephone: "+7 985 990 7601",
        areaServed: ["Москва", "Алматы"],
        sameAs: brandSameAs,
      },
      {
        "@type": "WebSite",
        name: specialistName,
        url: getBaseUrl("/"),
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
