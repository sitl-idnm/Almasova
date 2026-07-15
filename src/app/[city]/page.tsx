import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  AboutSpecialist,
  ContactCard,
  FaqList,
  InlineFeatureList,
  JsonLd,
  ReviewsGrid,
  Section,
  ServiceGrid,
  SiteFooter,
  SiteHeader,
  Steps,
  TileGrid,
} from "@/components/marketing";
import { WorksGallery } from "@/components/works-gallery";
import { Hero } from "@/components/sections/Hero/Hero";
import { Certificate, ShieldCheck, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { cityHubCopy } from "@/content/city-copy";
import { cityAlternates } from "@/lib/seo";
import { brandSameAs, getBaseUrl, getCityContent, specialistName } from "@/lib/site-data";

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
    if (!content) {
      return {};
    }

    return {
      title: cityHubCopy[content.slug].metadataTitle,
      description: cityHubCopy[content.slug].metadataDescription,
      alternates: cityAlternates(content.slug),
    };
  });
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const content = getCityContent(city);

  if (!content) {
    notFound();
  }

  const copy = cityHubCopy[content.slug];
  const cityIn = content.prepositionalName;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `${content.name} - ${specialistName}`,
        url: getBaseUrl(`/${content.slug}`),
        description: content.intro,
      },
      {
        "@type": "MedicalBusiness",
        name: specialistName,
        areaServed: content.name,
        telephone: content.phoneDisplay,
        sameAs: brandSameAs,
        address: {
          "@type": "PostalAddress",
          addressLocality: content.name,
          streetAddress: content.address,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: content.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <SiteHeader city={content} />
      <main className="pb-16">
        <Hero
          eyebrow={copy.hero.eyebrow}
          title={copy.hero.title}
          subtitle={copy.hero.subtitle}
          support={copy.hero.support}
          primaryHref={`tel:${content.phoneHref}`}
          secondaryHref={`/${content.slug}/do-posle`}
          secondaryLabel="Посмотреть работы"
          chips={[
            { icon: ShieldCheck, label: "Врач, а не тату-мастер" },
            { icon: Sparkle, label: "Естественный результат" },
            { icon: Certificate, label: "Оценка показаний" },
          ]}
        />

        <Section
          eyebrow={cityHubCopy.fitSection.eyebrow}
          title={cityHubCopy.fitSection.title}
          description={cityHubCopy.fitSection.description}
        >
          <TileGrid items={content.problems} />
        </Section>

        <Section
          eyebrow={cityHubCopy.beforeAfterSection.eyebrow}
          title={cityHubCopy.beforeAfterSection.title}
          description={cityHubCopy.beforeAfterSection.description}
        >
          <WorksGallery items={content.proofItems} />
        </Section>

        <Section
          eyebrow={cityHubCopy.servicesSection.eyebrow}
          title={`${cityHubCopy.servicesSection.title} в ${cityIn}`}
          description={cityHubCopy.servicesSection.description}
        >
          <ServiceGrid services={content.services} />
        </Section>

        <Section
          eyebrow={cityHubCopy.processSection.eyebrow}
          title={cityHubCopy.processSection.title}
          description={cityHubCopy.processSection.description}
        >
          <Steps steps={[...cityHubCopy.processSection.steps]} />
        </Section>

        <Section
          eyebrow={cityHubCopy.priceSection.eyebrow}
          title={`${cityHubCopy.priceSection.titlePrefix}${cityIn}`}
          description={cityHubCopy.priceSection.description}
        >
          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="surface rounded-[2rem] p-6 sm:p-8">
              <h3 className="text-3xl">{cityHubCopy.priceSection.leftTitle}</h3>
              <div className="mt-5">
                <InlineFeatureList items={[...cityHubCopy.priceSection.leftItems]} />
              </div>
            </div>

            <div className="surface rounded-[2rem] p-6 sm:p-8">
              <h3 className="text-3xl">{cityHubCopy.priceSection.rightTitle}</h3>
              <div className="mt-5 grid gap-3">
                {content.priceItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[var(--line)] bg-white/65 px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-7 text-[var(--muted)]">
                      {item.price} — {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section
          eyebrow={cityHubCopy.reviewsSection.eyebrow}
          title={cityHubCopy.reviewsSection.title}
          description={cityHubCopy.reviewsSection.description}
        >
          <ReviewsGrid items={content.reviews} />
        </Section>

        <Section
          eyebrow={cityHubCopy.faqSection.eyebrow}
          title={cityHubCopy.faqSection.title}
          description={cityHubCopy.faqSection.description}
        >
          <FaqList items={content.faqs} />
        </Section>

        <Section
          eyebrow={cityHubCopy.reasonsSection.eyebrow}
          title={`${cityHubCopy.reasonsSection.titlePrefix}${cityIn}`}
          description={cityHubCopy.reasonsSection.description}
        >
          <TileGrid items={content.reasons} />
        </Section>

        <Section
          eyebrow="Локальные ориентиры"
          title={`Что важно учесть перед записью в ${cityIn}`}
          description={`Я собрала короткие ориентиры именно для пациентов в ${cityIn}, чтобы вам было проще понять формат консультации, стоимость и логику дальнейших шагов.`}
        >
          <TileGrid items={content.localTrust} />
        </Section>

        <Section
          eyebrow={cityHubCopy.contactsSection.eyebrow}
          title={cityHubCopy.contactsSection.title}
          description={cityHubCopy.contactsSection.description}
        >
          <ContactCard city={content} />
        </Section>

        <Section
          eyebrow={cityHubCopy.aboutSection.eyebrow}
          title={cityHubCopy.aboutSection.title}
          description={cityHubCopy.aboutSection.description}
        >
          <AboutSpecialist />
        </Section>
      </main>
      <SiteFooter city={content} />
    </>
  );
}
