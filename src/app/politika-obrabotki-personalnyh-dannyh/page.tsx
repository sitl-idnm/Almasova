import type { Metadata } from "next";

import { Breadcrumbs, Section, SiteFooter, SiteHeader } from "@/components/marketing";
import { LegalDocView } from "@/components/legal/LegalDoc";
import { privacyPolicy } from "@/content/legal";
import { getBaseUrl } from "@/lib/site-data";

export const metadata: Metadata = {
  title: privacyPolicy.metaTitle,
  description: privacyPolicy.metaDescription,
  alternates: { canonical: getBaseUrl(`/${privacyPolicy.slug}`) },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[{ href: "/", label: "Главная" }, { label: privacyPolicy.title }]}
      />
      <main className="pb-16">
        <Section>
          <LegalDocView doc={privacyPolicy} />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
