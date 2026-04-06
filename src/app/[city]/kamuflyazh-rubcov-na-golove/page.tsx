import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  AboutSpecialist,
  Breadcrumbs,
  ContactCard,
  FaqList,
  InlineFeatureList,
  JsonLd,
  PageHero,
  ReviewsGrid,
  Section,
  SiteFooter,
  SiteHeader,
  TileGrid,
} from "@/components/marketing";
import { WorksGallery } from "@/components/works-gallery";
import { scarCopy } from "@/content/scar-copy";
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
      title: scarCopy[content.slug].metadataTitle,
      description: scarCopy[content.slug].metadataDescription,
      alternates: {
        canonical: getBaseUrl(`/${content.slug}/kamuflyazh-rubcov-na-golove`),
      },
    };
  });
}

export default async function ScarCamouflagePage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const content = getCityContent(city);

  if (!content) {
    notFound();
  }

  const copy = scarCopy;
  const cityIn = content.prepositionalName;

  const faqItems = [
    {
      question: "Можно ли полностью скрыть рубец?",
      answer:
        "Обещать полное исчезновение рубца неправильно. Задача процедуры - сделать рубцовую зону менее заметной и уменьшить контраст с окружающей кожей.",
    },
    {
      question: "Подходит ли камуфляж после пересадки волос?",
      answer:
        "Да, это один из самых частых поводов обращения. Особенно если рубцы заметны при короткой стрижке или не устраивает общий визуальный результат.",
    },
    {
      question: "Подходит ли процедура для любого рубца?",
      answer:
        "Нет. Все зависит от типа рубцовой ткани, кожи, цвета волос и окружающей зоны. Поэтому предварительная оценка обязательна.",
    },
    {
      question: "Сколько нужно сеансов?",
      answer:
        "Количество этапов определяется индивидуально после оценки рубца, площади и сложности задачи.",
    },
    {
      question: "Когда виден итоговый результат?",
      answer:
        "Промежуточный эффект заметен быстро, но финально результат оценивается после заживления.",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `Камуфляж рубцов на голове в ${cityIn}`,
        provider: {
          "@type": "Person",
          name: specialistName,
          sameAs: brandSameAs,
        },
        areaServed: content.name,
        description:
          "Маскировка рубцов после пересадки волос, операций и травм на коже головы.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: getBaseUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: content.name,
            item: getBaseUrl(`/${content.slug}`),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Камуфляж рубцов на голове",
            item: getBaseUrl(`/${content.slug}/kamuflyazh-rubcov-na-golove`),
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((faq) => ({
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

  const proofItems = content.proofItems.map((item) => ({
    ...item,
    title:
      item.title === "Мужское облысение" || item.title === "Залысины"
        ? "Рубцы после пересадки"
        : item.title,
  }));

  return (
    <>
      <JsonLd data={schema} />
      <SiteHeader city={content} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: `/${content.slug}`, label: content.name },
          { label: "Камуфляж рубцов на голове" },
        ]}
      />
      <main className="pb-16">
        <PageHero
          eyebrow={content.name}
          title={`${copy.hero.titlePrefix}${cityIn}`}
          subtitle={copy.hero.subtitleTemplate.replace("{city}", cityIn)}
          support={copy.hero.support}
          primaryHref={`tel:${content.phoneHref}`}
          secondaryHref={`/${content.slug}/do-posle`}
          secondaryLabel="Смотреть реальные работы"
        />

        <Section
          eyebrow={copy.fitSection.eyebrow}
          title={copy.fitSection.title}
          description={copy.fitSection.description}
        >
          <TileGrid items={[...copy.fitSection.items]} />
        </Section>

        <Section
          eyebrow={copy.beforeAfterSection.eyebrow}
          title={copy.beforeAfterSection.title}
          description={copy.beforeAfterSection.description}
        >
          <WorksGallery items={proofItems} />
        </Section>

        <Section
          eyebrow={copy.resultSection.eyebrow}
          title={copy.resultSection.title}
          description={copy.resultSection.description}
        >
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="surface rounded-[1.8rem] p-6 sm:p-8">
              <h3 className="text-3xl">{copy.resultSection.leftTitle}</h3>
              <div className="mt-5">
                <InlineFeatureList
                  variant="dense"
                  items={[...copy.resultSection.leftItems]}
                />
              </div>
            </div>
            <div className="surface rounded-[1.8rem] p-6 sm:p-8">
              <h3 className="text-3xl">{copy.resultSection.rightTitle}</h3>
              <p className="mt-4 text-sm leading-8 text-[var(--muted)] sm:text-base">
                {copy.resultSection.rightText}
              </p>
            </div>
          </div>
        </Section>

        <Section
          eyebrow={copy.priceSection.eyebrow}
          title={`${copy.priceSection.titlePrefix}${cityIn}`}
          description={copy.priceSection.description}
        >
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                title: copy.priceSection.cards.local.title,
                price: content.slug === "moskva" ? "от 9 900 ₽" : "индивидуально",
                text: copy.priceSection.cards.local.text,
              },
              {
                title: copy.priceSection.cards.transplant.title,
                price: content.slug === "moskva" ? "от 19 900 ₽" : "индивидуально",
                text: copy.priceSection.cards.transplant.text,
              },
              {
                title: copy.priceSection.cards.complex.title,
                price: "после оценки",
                text: copy.priceSection.cards.complex.text,
              },
            ].map((item) => (
              <div key={item.title} className="surface rounded-[1.8rem] p-6">
                <p className="text-2xl">{item.title}</p>
                <p className="mt-3 text-3xl font-semibold text-[var(--accent-strong)]">
                  {item.price}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <a className="button-primary" href={`tel:${content.phoneHref}`}>
              {copy.priceSection.cta}
            </a>
          </div>
        </Section>

        <Section
          eyebrow={copy.reviewsSection.eyebrow}
          title={copy.reviewsSection.title}
          description={copy.reviewsSection.description}
        >
          <ReviewsGrid items={content.reviews} />
        </Section>

        <Section eyebrow="FAQ" title="Частые вопросы">
          <FaqList items={faqItems} />
        </Section>

        <Section
          eyebrow={copy.contactsSection.eyebrow}
          title={copy.contactsSection.title}
          description={copy.contactsSection.description}
        >
          <ContactCard city={content} />
        </Section>

        <Section
          eyebrow={copy.aboutSection.eyebrow}
          title={copy.aboutSection.title}
        >
          <AboutSpecialist />
        </Section>
      </main>
      <SiteFooter city={content} />
    </>
  );
}
