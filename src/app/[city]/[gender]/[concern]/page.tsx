import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  Breadcrumbs,
  ContactCard,
  FaqList,
  InlineFeatureList,
  JsonLd,
  PageHero,
  Section,
  SiteFooter,
  SiteHeader,
  TileGrid,
} from "@/components/marketing";
import { WorksGallery } from "@/components/works-gallery";
import { ServiceCards } from "@/components/sections/blocks/Blocks";
import { concernCopy, type ConcernSlug } from "@/content/concern-copy";
import { genderSlugs } from "@/lib/gender";
import { cityAlternates } from "@/lib/seo";
import {
  brandSameAs,
  getBaseUrl,
  getCityContent,
  specialistName,
  type ProofItem,
} from "@/lib/site-data";

const concernSlugs = Object.keys(concernCopy) as ConcernSlug[];

function getConcernGalleryItems(slug: ConcernSlug, items: ProofItem[]) {
  const matches = items.filter((item) => {
    const value = `${item.title} ${item.details}`.toLowerCase();

    if (slug === "posle-peresadki-volos" || slug === "neudachnaya-peresadka-volos") {
      return value.includes("пересад") || value.includes("рубц");
    }

    if (slug === "rubcy-posle-fue-fut") {
      return value.includes("рубц");
    }

    if (slug === "redkie-volosy-u-zhenshchin") {
      return value.includes("поред") || value.includes("макуш") || value.includes("густ");
    }

    if (slug === "zagushchenie-makushki") {
      return value.includes("макуш");
    }

    if (slug === "net-donorskoy-zony") {
      return value.includes("залыс") || value.includes("макуш") || value.includes("пересад");
    }

    return false;
  });

  return (matches.length >= 2 ? matches : items.slice(0, 3)).map((item) => ({
    ...item,
    details: `${item.details}. Подобные случаи помогают понять, насколько этот сценарий близок к вашей ситуации.`,
  }));
}

export function generateStaticParams() {
  return ["moskva", "almaty"].flatMap((city) =>
    genderSlugs.flatMap((gender) =>
      concernSlugs.map((concern) => ({ city, gender, concern })),
    ),
  );
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; concern: string }>;
}): Promise<Metadata> {
  return params.then(({ city, concern }) => {
    const cityContent = getCityContent(city);
    if (!cityContent || !(concern in concernCopy)) {
      return {};
    }

    const copy = concernCopy[concern as ConcernSlug];

    return {
      title: copy.metadataTitleTemplate.replace("{city}", cityContent.prepositionalName),
      description: copy.metadataDescriptionTemplate.replace(
        "{city}",
        cityContent.prepositionalName,
      ),
      alternates: cityAlternates(cityContent.slug, `/${concern}`),
    };
  });
}

export default async function ConcernPage({
  params,
}: {
  params: Promise<{ city: string; concern: string }>;
}) {
  const { city, concern } = await params;
  const cityContent = getCityContent(city);

  if (!cityContent || !(concern in concernCopy)) {
    notFound();
  }

  const copy = concernCopy[concern as ConcernSlug];
  const cityIn = cityContent.prepositionalName;
  const galleryItems = getConcernGalleryItems(concern as ConcernSlug, cityContent.proofItems);
  const serviceHref =
    copy.service === "scar"
      ? `/${cityContent.slug}/kamuflyazh-rubcov-na-golove`
      : `/${cityContent.slug}/trihopigmentaciya`;
  const serviceLabel =
    copy.service === "scar" ? "Камуфляж рубцов на голове" : "Трихопигментация";
  const pageTitle = copy.heroTitleTemplate.replace("{city}", cityIn);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: pageTitle,
        url: getBaseUrl(`/${cityContent.slug}/${concern}`),
      },
      {
        "@type": "Service",
        name: pageTitle,
        areaServed: cityContent.name,
        provider: {
          "@type": "Person",
          name: specialistName,
          sameAs: brandSameAs,
        },
        description: copy.metadataDescriptionTemplate.replace("{city}", cityIn),
      },
      {
        "@type": "FAQPage",
        mainEntity: copy.faqItems.map((faq) => ({
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
      <SiteHeader city={cityContent} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: `/${cityContent.slug}`, label: cityContent.name },
          { href: serviceHref, label: serviceLabel },
          { label: pageTitle },
        ]}
      />
      <main className="pb-16">
        <PageHero
          eyebrow={cityContent.name}
          title={pageTitle}
          subtitle={copy.heroSubtitleTemplate.replace("{city}", cityIn)}
          support={copy.heroSupportTemplate.replace("{city}", cityIn)}
          primaryHref={`tel:${cityContent.phoneHref}`}
          secondaryHref={serviceHref}
          secondaryLabel="К основной услуге"
        />

        <Section
          eyebrow="Сценарий"
          title={copy.problemTitle}
          description={copy.problemDescription}
        >
          <TileGrid items={copy.problemItems} />
        </Section>

        <Section
          eyebrow="Фото работ"
          title={`Какие работы посмотреть в ${cityIn}`}
          description="Я выбрала близкие по смыслу работы из галереи, чтобы вам было проще сопоставить страницу с реальными случаями."
        >
          <WorksGallery items={galleryItems} />
        </Section>

        <Section
          eyebrow="Что можно получить"
          title={copy.resultTitle}
          description={copy.resultDescription}
        >
          <InlineFeatureList items={copy.resultItems} />
        </Section>

        <Section eyebrow="FAQ" title="Частые вопросы по этой ситуации">
          <FaqList items={copy.faqItems} />
        </Section>

        <Section
          eyebrow="Следующий шаг"
          title={`Если хотите понять, подходит ли это вам в ${cityIn}`}
          description={`Проще всего перейти в основной раздел по услуге или сразу связаться со мной. На консультации я объясню, реалистичен ли этот сценарий именно для вашего случая.`}
        >
          <div className="two-col">
            <ServiceCards
              services={[
                {
                  title: serviceLabel,
                  href: serviceHref,
                  description:
                    "Базовые объяснения по процедуре, фото работ, стоимость, отзывы и частые вопросы.",
                },
              ]}
            />
            <ContactCard city={cityContent} />
          </div>
        </Section>
      </main>
      <SiteFooter city={cityContent} />
    </>
  );
}
