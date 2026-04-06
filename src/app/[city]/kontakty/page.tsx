import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  AboutSpecialist,
  Breadcrumbs,
  ContactCard,
  JsonLd,
  PageHero,
  Section,
  SiteFooter,
  SiteHeader,
  TileGrid,
} from "@/components/marketing";
import { supportCopy } from "@/content/support-copy";
import { getBaseUrl, getCityContent, specialistName } from "@/lib/site-data";

export function generateStaticParams() {
  return [{ city: "moskva" }, { city: "almaty" }];
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  return params.then(({ city }) => {
    const content = getCityContent(city);
    if (!content) return {};
    return {
      title: `Контакты в ${content.prepositionalName} - ${specialistName}`,
      description: `Контакты и запись в ${content.prepositionalName}. Телефон, режим работы, консультация по трихопигментации и камуфляжу рубцов у Алёны Алмасовой.`,
      alternates: { canonical: getBaseUrl(`/${content.slug}/kontakty`) },
    };
  });
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const content = getCityContent(city);
  if (!content) notFound();
  const copy = supportCopy.contacts;
  const cityIn = content.prepositionalName;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: `Контакты в ${cityIn}`,
          url: getBaseUrl(`/${content.slug}/kontakty`),
        }}
      />
      <SiteHeader city={content} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: `/${content.slug}`, label: content.name },
          { label: "Контакты" },
        ]}
      />
      <main className="pb-16">
        <PageHero
          eyebrow={content.name}
          title={`${copy.hero.titlePrefix}${cityIn}`}
          subtitle={copy.hero.subtitleTemplate}
          primaryHref={`tel:${content.phoneHref}`}
          secondaryHref={`/${content.slug}/faq`}
          secondaryLabel="Частые вопросы"
        />

        <Section
          eyebrow={copy.mainSection.eyebrow}
          title={copy.mainSection.title}
          description={copy.mainSection.description}
        >
          <ContactCard city={content} />
        </Section>

        <Section
          eyebrow={copy.phoneSection.eyebrow}
          title={copy.phoneSection.title}
          description={copy.phoneSection.description}
        >
          <TileGrid items={[...copy.phoneSection.items]} />
        </Section>

        <Section eyebrow="О специалисте" title="Обо мне">
          <AboutSpecialist />
        </Section>
      </main>
      <SiteFooter city={content} />
    </>
  );
}
