import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  Breadcrumbs,
  ContactCard,
  JsonLd,
  PageHero,
  Section,
  SiteFooter,
  SiteHeader,
  TileGrid,
} from "@/components/marketing";
import { WorksGallery } from "@/components/works-gallery";
import { supportCopy } from "@/content/support-copy";
import { getBaseUrl, getCityContent } from "@/lib/site-data";

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
      title: `До и после в ${content.prepositionalName} - работы Алёны Алмасовой`,
      description: `До и после по трихопигментации и камуфляжу рубцов в ${content.prepositionalName}. Кейсы Алёны Алмасовой по залысинам, макушке, рубцам и после пересадки волос.`,
      alternates: { canonical: getBaseUrl(`/${content.slug}/do-posle`) },
    };
  });
}

export default async function BeforeAfterPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const content = getCityContent(city);
  if (!content) notFound();
  const copy = supportCopy.beforeAfter;
  const cityIn = content.prepositionalName;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `До и после в ${cityIn}`,
          url: getBaseUrl(`/${content.slug}/do-posle`),
        }}
      />
      <SiteHeader city={content} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: `/${content.slug}`, label: content.name },
          { label: "До / после" },
        ]}
      />
      <main className="pb-16">
        <PageHero
          eyebrow={content.name}
          title={`${copy.hero.titlePrefix}${cityIn}`}
          subtitle={copy.hero.subtitleTemplate}
          support={copy.hero.support}
          primaryHref={`tel:${content.phoneHref}`}
          secondaryHref={`/${content.slug}/trihopigmentaciya`}
          secondaryLabel="О процедуре"
        />

        <Section
          eyebrow={copy.worksSection.eyebrow}
          title={copy.worksSection.title}
          description={copy.worksSection.description}
        >
          <WorksGallery items={content.proofItems} />
        </Section>

        <Section
          eyebrow={copy.notesSection.eyebrow}
          title={copy.notesSection.title}
          description={copy.notesSection.description}
        >
          <TileGrid items={[...copy.notesSection.items]} />
        </Section>

        <Section
          eyebrow={copy.whySection.eyebrow}
          title={copy.whySection.title}
          description={copy.whySection.description}
        >
          <TileGrid items={[...copy.whySection.items]} />
        </Section>

        <Section eyebrow="Контакты" title="Обсудить свой случай">
          <ContactCard city={content} />
        </Section>
      </main>
      <SiteFooter city={content} />
    </>
  );
}
