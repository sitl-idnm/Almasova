import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  Breadcrumbs,
  ContactCard,
  FaqList,
  JsonLd,
  PageHero,
  Section,
  SiteFooter,
  SiteHeader,
} from "@/components/marketing";
import { supportCopy } from "@/content/support-copy";
import { cityAlternates, cityParams, pageMeta } from "@/lib/seo";
import { getCityContent } from "@/lib/site-data";

export function generateStaticParams() {
  return cityParams();
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  return params.then(({ city }) => {
    const content = getCityContent(city);
    if (!content) return {};
    return pageMeta({
      title: `Вопросы о трихопигментации в ${content.prepositionalName}`,
      description: `Частые вопросы о трихопигментации и камуфляже рубцов в ${content.prepositionalName}: больно ли, сколько держится, нужна ли коррекция, можно ли после пересадки.`,
      alternates: cityAlternates(content.slug, "/faq"),
    });
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const content = getCityContent(city);
  if (!content) notFound();
  const copy = supportCopy.faq;
  const cityIn = content.prepositionalName;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />
      <SiteHeader city={content} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: `/${content.slug}`, label: content.name },
          { label: "FAQ" },
        ]}
      />
      <main className="pb-16">
        <PageHero
          eyebrow={content.name}
          title={`${copy.hero.titlePrefix}${cityIn}`}
          subtitle={copy.hero.subtitleTemplate}
          primaryHref={`tel:${content.phoneHref}`}
          secondaryHref={`/${content.slug}/trihopigmentaciya`}
          secondaryLabel="О процедуре"
        />

        <Section
          eyebrow={copy.mainSection.eyebrow}
          title={copy.mainSection.title}
          description={copy.mainSection.description}
        >
          <FaqList items={content.faqs} />
        </Section>

        <Section eyebrow="Контакты" title="Задать свой вопрос по телефону">
          <ContactCard city={content} />
        </Section>
      </main>
      <SiteFooter city={content} />
    </>
  );
}
