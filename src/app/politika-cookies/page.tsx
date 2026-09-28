import type { Metadata } from "next";

import { Breadcrumbs, Section, SiteFooter, SiteHeader } from "@/components/marketing";
import { LegalDocView } from "@/components/legal/LegalDoc";
import { cookiePolicy } from "@/content/legal";
import { getBaseUrl } from "@/lib/site-data";

export const metadata: Metadata = {
  title: cookiePolicy.metaTitle,
  description: cookiePolicy.metaDescription,
  alternates: { canonical: getBaseUrl(`/${cookiePolicy.slug}`) },
  robots: { index: true, follow: true },
};

export default function CookiePolicyPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[{ href: "/", label: "Главная" }, { label: cookiePolicy.title }]}
      />
      <main className="pb-16">
        <Section>
          <LegalDocView doc={cookiePolicy} />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
