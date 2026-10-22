import type { Metadata } from "next";

import { JsonLd, SiteFooter, SiteHeader } from "@/components/marketing";
import { HomeView } from "@/views/home/home";
import { homeCopy } from "@/content/home-copy";
import { pageMeta } from "@/lib/seo";
import { brandSameAs, defaultPhoneDisplay, getBaseUrl, specialistName } from "@/lib/site-data";

export const metadata: Metadata = pageMeta({
  title: homeCopy.metadataTitle,
  description: homeCopy.metadataDescription,
  alternates: { canonical: getBaseUrl("/") },
});

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: specialistName,
        url: getBaseUrl("/"),
        telephone: defaultPhoneDisplay,
        sameAs: brandSameAs,
      },
      {
        "@type": "Person",
        name: specialistName,
        url: getBaseUrl("/"),
        jobTitle: "Специалист по трихопигментации кожи головы (высшее медицинское образование)",
        sameAs: brandSameAs,
      },
      {
        "@type": "HealthAndBeautyBusiness",
        name: specialistName,
        url: getBaseUrl("/"),
        telephone: defaultPhoneDisplay,
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
