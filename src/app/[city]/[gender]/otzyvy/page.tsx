import { cityGenderParams } from "@/lib/gender";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  Breadcrumbs,
  ContactCard,
  JsonLd,
  PageHero,
  ReviewsGrid,
  Section,
  SiteFooter,
  SiteHeader,
  TileGrid,
} from "@/components/marketing";
import { YandexReviews } from "@/components/yandex";
import { supportCopy } from "@/content/support-copy";
import { cityAlternates } from "@/lib/seo";
import { getBaseUrl, getCityContent, specialistName } from "@/lib/site-data";

export function generateStaticParams() {
  return cityGenderParams();
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
      title: `Отзывы в ${content.prepositionalName} - ${specialistName}`,
      description: `Отзывы по трихопигментации и камуфляжу рубцов в ${content.prepositionalName}. Залысины, макушка, рубцы на голове и случаи после пересадки волос.`,
      alternates: cityAlternates(content.slug, "/otzyvy"),
    };
  });
}

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const content = getCityContent(city);
  if (!content) notFound();
  const copy = supportCopy.reviews;
  const cityIn = content.prepositionalName;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Отзывы в ${cityIn}`,
          url: getBaseUrl(`/${content.slug}/otzyvy`),
        }}
      />
      <SiteHeader city={content} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: `/${content.slug}`, label: content.name },
          { label: "Отзывы" },
        ]}
      />
      <main className="pb-16">
        <PageHero
          eyebrow={content.name}
          title={`${copy.hero.titlePrefix}${cityIn}`}
          subtitle={copy.hero.subtitleTemplate}
          support={copy.hero.support}
          primaryHref={`tel:${content.phoneHref}`}
          secondaryHref={`/${content.slug}/do-posle`}
          secondaryLabel="Смотреть работы"
        />

        <Section
          eyebrow={copy.mainSection.eyebrow}
          title={copy.mainSection.title}
          description={copy.mainSection.description}
        >
          <ReviewsGrid items={content.reviews} />
        </Section>

        {content.slug === "moskva" ? (
          <Section
            eyebrow="Яндекс.Карты"
            title="Отзывы на Яндексе"
            description="Живые отзывы клиентов из карточки организации на Яндекс.Картах."
          >
            <YandexReviews />
          </Section>
        ) : null}

        <Section
          eyebrow={copy.themesSection.eyebrow}
          title={copy.themesSection.title}
          description={copy.themesSection.description}
        >
          <TileGrid items={[...copy.themesSection.items]} />
        </Section>

        <Section eyebrow="Контакты" title="Получить консультацию">
          <ContactCard city={content} />
        </Section>
      </main>
      <SiteFooter city={content} />
    </>
  );
}
