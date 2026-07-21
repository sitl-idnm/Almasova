import { cityGenderParams, getGenderMeta, type GenderSlug } from "@/lib/gender";
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
import { YandexMap } from "@/components/yandex";
import { supportCopy } from "@/content/support-copy";
import { cityAlternates } from "@/lib/seo";
import { getBaseUrl, getCityContent, specialistName } from "@/lib/site-data";

export function generateStaticParams() {
  return cityGenderParams();
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; gender: string }>;
}): Promise<Metadata> {
  return params.then(({ city, gender }) => {
    const content = getCityContent(city);
    const g = getGenderMeta(gender);
    if (!content || !g) return {};
    return {
      title: `Контакты в ${content.prepositionalName} - ${specialistName} — ${g.forWhom}`,
      description: `Контакты и запись в ${content.prepositionalName}. Телефон, режим работы, консультация по трихопигментации и камуфляжу рубцов у Алёны Алмасовой.`,
      alternates: cityAlternates(content.slug, gender as GenderSlug, "/kontakty"),
    };
  });
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ city: string; gender: string }>;
}) {
  const { city, gender } = await params;
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
          url: getBaseUrl(`/${content.slug}/${gender}/kontakty`),
        }}
      />
      <SiteHeader city={content} gender={gender} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: `/${content.slug}/${gender}`, label: content.name },
          { label: "Контакты" },
        ]}
      />
      <main className="pb-16">
        <PageHero
          eyebrow={content.name}
          title={`${copy.hero.titlePrefix}${cityIn}`}
          subtitle={copy.hero.subtitleTemplate}
          primaryHref={`tel:${content.phoneHref}`}
          secondaryHref={`/${content.slug}/${gender}/faq`}
          secondaryLabel="Частые вопросы"
        />

        <Section
          eyebrow={copy.mainSection.eyebrow}
          title={copy.mainSection.title}
          description={copy.mainSection.description}
        >
          <ContactCard city={content} />
        </Section>

        {content.slug === "moskva" ? (
          <Section
            eyebrow="На карте"
            title="Как нас найти"
            description="Студия в Москве на карте — можно построить маршрут."
          >
            <YandexMap />
          </Section>
        ) : null}

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
      <SiteFooter city={content} gender={gender} />
    </>
  );
}
