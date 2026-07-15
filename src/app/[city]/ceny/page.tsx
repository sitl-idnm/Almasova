import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  Breadcrumbs,
  ContactCard,
  JsonLd,
  Section,
  SiteFooter,
  SiteHeader,
  TileGrid,
} from "@/components/marketing";
import { Hero } from "@/components/sections/Hero/Hero";
import { PriceTable } from "@/components/sections/PriceTable/PriceTable";
import { supportCopy } from "@/content/support-copy";
import { cityAlternates } from "@/lib/seo";
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
      title: `Цены в ${content.prepositionalName} - трихопигментация и камуфляж`,
      description: `Стоимость трихопигментации и камуфляжа рубцов в ${content.prepositionalName}. Ориентиры по зонам, логика расчета и консультация по телефону.`,
      alternates: cityAlternates(content.slug, "/ceny"),
    };
  });
}

export default async function PricesPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const content = getCityContent(city);

  if (!content) notFound();

  const copy = supportCopy.prices;
  const cityIn = content.prepositionalName;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `Цены в ${cityIn}`,
          url: getBaseUrl(`/${content.slug}/ceny`),
        }}
      />
      <SiteHeader city={content} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: `/${content.slug}`, label: content.name },
          { label: "Цены" },
        ]}
      />
      <main className="pb-16">
        <Hero
          eyebrow={content.name}
          title={`${copy.hero.titlePrefix}${cityIn}`}
          subtitle={copy.hero.subtitleTemplate}
          support={copy.hero.support}
          primaryHref={`tel:${content.phoneHref}`}
          secondaryHref={`/${content.slug}/kontakty`}
          secondaryLabel="Связаться"
        />

        <Section
          eyebrow={copy.topSection.eyebrow}
          title={copy.topSection.title}
          description={copy.topSection.description}
        >
          <PriceTable
            items={content.priceItems}
            note="Точная стоимость зависит от площади зоны, наличия рубцов, исходной плотности и числа этапов — её я называю после очной или онлайн-оценки."
          />
        </Section>

        <Section
          eyebrow={copy.factorsSection.eyebrow}
          title={copy.factorsSection.title}
          description={copy.factorsSection.description}
        >
          <TileGrid items={[...copy.factorsSection.items]} />
        </Section>

        <Section
          eyebrow={copy.callSection.eyebrow}
          title={copy.callSection.title}
          description={copy.callSection.description}
        >
          <TileGrid items={[...copy.callSection.items]} />
        </Section>

        <Section eyebrow="Контакты" title="Узнать ориентир по телефону">
          <ContactCard city={content} />
        </Section>
      </main>
      <SiteFooter city={content} />
    </>
  );
}
