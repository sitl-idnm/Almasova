import type { Metadata } from "next";

import { Breadcrumbs, Section, SiteFooter, SiteHeader } from "@/components/marketing";
import { LegalDocView } from "@/components/legal/LegalDoc";
import { consent } from "@/content/legal";
import { getBaseUrl } from "@/lib/site-data";

export const metadata: Metadata = {
  title: consent.metaTitle,
  description: consent.metaDescription,
  alternates: { canonical: getBaseUrl(`/${consent.slug}`) },
  robots: { index: true, follow: true },
};

export default function ConsentPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs items={[{ href: "/", label: "Главная" }, { label: consent.title }]} />
      <main className="pb-16">
        <Section>
          <LegalDocView doc={consent} />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
