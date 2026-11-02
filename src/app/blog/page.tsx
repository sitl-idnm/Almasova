import type { Metadata } from "next";

import {
  Breadcrumbs,
  JsonLd,
  PageHero,
  Section,
  SiteFooter,
  SiteHeader,
} from "@/components/marketing";
import { ServiceCards } from "@/components/sections/blocks/Blocks";
import { blogArticles } from "@/content/blog";
import { breadcrumbSchema, businessSchema, pageMeta } from "@/lib/seo";
import { defaultPhoneHref, getBaseUrl } from "@/lib/site-data";

export const metadata: Metadata = pageMeta({
  title: "Статьи о трихопигментации: вопросы и честные ответы",
  description:
    "Что такое трихопигментация, посинеет ли голова, чем отличается от тату волос, как скрыть залысины и что делать после неудачной пересадки волос.",
  alternates: { canonical: getBaseUrl("/blog") },
});

export default function BlogIndex() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      businessSchema(),
      {
        "@type": "Blog",
        name: "Статьи о трихопигментации",
        url: getBaseUrl("/blog"),
        publisher: { "@id": `${getBaseUrl("/")}#business` },
        blogPost: blogArticles.map((a) => ({
          "@type": "BlogPosting",
          headline: a.title,
          url: getBaseUrl(`/blog/${a.slug}`),
          datePublished: a.published,
        })),
      },
      breadcrumbSchema([
        { name: "Главная", path: "/" },
        { name: "Статьи", path: "/blog" },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <SiteHeader />
      <Breadcrumbs items={[{ href: "/", label: "Главная" }, { label: "Статьи" }]} />
      <main className="pb-16">
        <PageHero
          eyebrow="Статьи"
          title="Трихопигментация: вопросы и честные ответы"
          subtitle="Разбираю то, что спрашивают чаще всего: как делается процедура, сколько держится, посинеет ли голова и чем она отличается от тату волос."
          support="Трихопигментация — эстетическая процедура, а не лечение. Решение о процедуре принимается на консультации."
          primaryHref={`tel:${defaultPhoneHref}`}
          secondaryHref="/moskva"
          secondaryLabel="Трихопигментация в Москве"
        />
        <Section eyebrow="Все статьи" title="Читать по теме">
          <ServiceCards
            services={blogArticles.map((a) => ({
              title: a.title,
              href: `/blog/${a.slug}`,
              description: `${a.excerpt} · ${a.readingMinutes} мин`,
            }))}
          />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
