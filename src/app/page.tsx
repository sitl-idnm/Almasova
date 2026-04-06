import type { Metadata } from "next";
import Link from "next/link";

import {
  AboutSpecialist,
  FaqList,
  InlineFeatureList,
  JsonLd,
  PageHero,
  ReviewsGrid,
  Section,
  ServiceGrid,
  SiteFooter,
  SiteHeader,
  TileGrid,
} from "@/components/marketing";
import { WorksGallery } from "@/components/works-gallery";
import { homeCopy } from "@/content/home-copy";
import {
  brandSameAs,
  cityContent,
  getBaseUrl,
  sharedFaqs,
  specialistName,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: homeCopy.metadataTitle,
  description: homeCopy.metadataDescription,
  alternates: {
    canonical: getBaseUrl("/"),
  },
};

export default function HomePage() {
  const featuredWorks = [
    { ...cityContent.moskva.proofItems[0], title: "Москва · мужское облысение" },
    { ...cityContent.almaty.proofItems[1], title: "Алматы · заметная макушка" },
    { ...cityContent.moskva.proofItems[2], title: "Москва · после пересадки волос" },
    { ...cityContent.almaty.proofItems[3], title: "Алматы · камуфляж рубцов" },
  ];

  const featuredReviews = [
    { ...cityContent.moskva.reviews[0], label: `Москва · ${cityContent.moskva.reviews[0].label}` },
    { ...cityContent.almaty.reviews[0], label: `Алматы · ${cityContent.almaty.reviews[0].label}` },
    { ...cityContent.moskva.reviews[1], label: `Москва · ${cityContent.moskva.reviews[1].label}` },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: specialistName,
        url: getBaseUrl("/"),
        telephone: "+7 985 990 7601",
        sameAs: brandSameAs,
      },
      {
        "@type": "Person",
        name: specialistName,
        url: getBaseUrl("/"),
        jobTitle: "Врач, специалист по трихопигментации кожи головы",
        sameAs: brandSameAs,
      },
      {
        "@type": "MedicalBusiness",
        name: specialistName,
        url: getBaseUrl("/"),
        telephone: "+7 985 990 7601",
        areaServed: ["Москва", "Алматы"],
        sameAs: brandSameAs,
      },
      {
        "@type": "WebSite",
        name: specialistName,
        url: getBaseUrl("/"),
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <SiteHeader />
      <main className="pb-14">
        <PageHero
          eyebrow={homeCopy.hero.eyebrow}
          title={homeCopy.hero.title}
          subtitle={homeCopy.hero.subtitle}
          support={homeCopy.hero.support}
          primaryHref="tel:+79859907601"
          secondaryHref="/moskva"
          secondaryLabel="Выбрать город"
          cityCards={[...homeCopy.hero.cityCards]}
        />

        <Section
          eyebrow={homeCopy.fitSection.eyebrow}
          title={homeCopy.fitSection.title}
          description={homeCopy.fitSection.description}
        >
          <TileGrid items={[...homeCopy.fitSection.items]} />
        </Section>

        <Section
          eyebrow={homeCopy.citySection.eyebrow}
          title={homeCopy.citySection.title}
          description={homeCopy.citySection.description}
        >
          <ServiceGrid services={[...homeCopy.citySection.services]} />
        </Section>

        <Section
          eyebrow={homeCopy.directionsSection.eyebrow}
          title={homeCopy.directionsSection.title}
          description={homeCopy.directionsSection.description}
        >
          <ServiceGrid services={[...homeCopy.directionsSection.services]} />
        </Section>

        <Section
          eyebrow={homeCopy.scenariosSection.eyebrow}
          title={homeCopy.scenariosSection.title}
          description={homeCopy.scenariosSection.description}
        >
          <ServiceGrid services={[...homeCopy.scenariosSection.services]} />
        </Section>

        <Section
          eyebrow={homeCopy.beforeAfterSection.eyebrow}
          title={homeCopy.beforeAfterSection.title}
          description={homeCopy.beforeAfterSection.description}
        >
          <WorksGallery items={featuredWorks} />
        </Section>

        <Section
          eyebrow={homeCopy.reviewsSection.eyebrow}
          title={homeCopy.reviewsSection.title}
          description={homeCopy.reviewsSection.description}
        >
          <ReviewsGrid items={featuredReviews} />
        </Section>

        <Section
          eyebrow={homeCopy.priceSection.eyebrow}
          title={homeCopy.priceSection.title}
          description={homeCopy.priceSection.description}
        >
          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="surface rounded-[2rem] p-6 sm:p-8">
              <InlineFeatureList items={[...homeCopy.priceSection.items]} />
            </div>
            <div className="grid gap-4">
              <Link
                href="/moskva/ceny"
                className="surface rounded-[1.8rem] p-6 hover:-translate-y-0.5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  Москва
                </p>
                <p className="mt-3 text-2xl">Цены в Москве</p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  Есть стартовые ориентиры по зонам и понятная логика расчета стоимости.
                </p>
              </Link>
              <Link
                href="/almaty/ceny"
                className="surface rounded-[1.8rem] p-6 hover:-translate-y-0.5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  Алматы
                </p>
                <p className="mt-3 text-2xl">Цены в Алматы</p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  Если случай сложный, стоимость обсуждается после оценки зоны и задачи.
                </p>
              </Link>
            </div>
          </div>
        </Section>

        <Section
          eyebrow={homeCopy.faqSection.eyebrow}
          title={homeCopy.faqSection.title}
          description={homeCopy.faqSection.description}
        >
          <FaqList items={sharedFaqs.slice(0, 4)} />
        </Section>

        <Section
          eyebrow={homeCopy.aboutSection.eyebrow}
          title={homeCopy.aboutSection.title}
          description={homeCopy.aboutSection.description}
        >
          <AboutSpecialist />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
