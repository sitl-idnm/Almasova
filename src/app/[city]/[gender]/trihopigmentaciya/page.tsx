import { cityGenderParams, getGenderMeta, type GenderSlug } from "@/lib/gender";
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
  Steps,
  TileGrid,
} from "@/components/marketing";
import { WorksGallery } from "@/components/works-gallery";
import { trichopigmentaciyaCopy } from "@/content/trichopigmentaciya-copy";
import { leadFor } from "@/content/gender-copy";
import { cityAlternates } from "@/lib/seo";
import { brandSameAs, getBaseUrl, getCityContent, specialistName } from "@/lib/site-data";

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
    if (!content) {
      return {};
    }

    return {
      title: trichopigmentaciyaCopy[content.slug].metadataTitle,
      description: trichopigmentaciyaCopy[content.slug].metadataDescription,
      alternates: cityAlternates(content.slug, gender as GenderSlug, "/trihopigmentaciya"),
    };
  });
}

export default async function TrichopigmentationPage({
  params,
}: {
  params: Promise<{ city: string; gender: string }>;
}) {
  const { city, gender } = await params;
  const content = getCityContent(city);

  if (!content) {
    notFound();
  }

  const copy = trichopigmentaciyaCopy;
  const cityIn = content.prepositionalName;
  const gm = getGenderMeta(gender)!;

  const faqItems = [
    {
      question: "Подойдет ли трихопигментация именно в моем случае?",
      answer:
        "Это зависит от зоны, степени поредения, состояния кожи, цвета волос и ожидаемого результата. Поэтому первый шаг - спокойная консультация и разбор вашей ситуации.",
    },
    {
      question: "Можно ли делать процедуру после пересадки волос?",
      answer:
        "Да, в ряде случаев трихопигментация используется после пересадки волос, когда нужно добавить визуальную плотность или уменьшить заметность рубцов.",
    },
    {
      question: "Сколько держится результат?",
      answer:
        "Стойкость зависит от кожи, ухода, солнца, образа жизни и конкретной зоны работы. Коррекция обсуждается заранее как нормальная часть плана.",
    },
    {
      question: "Больно ли делать трихопигментацию?",
      answer:
        "Ощущения индивидуальны, но чаще речь идет о терпимом дискомфорте, а не о выраженной боли. Этот момент заранее обсуждается на консультации.",
    },
    {
      question: "Сколько сеансов потребуется?",
      answer:
        "Количество этапов зависит от зоны, исходной ситуации и желаемой визуальной плотности. Универсальной цифры для всех нет.",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `Трихопигментация в ${cityIn}`,
        url: getBaseUrl(`/${content.slug}/${gender}/trihopigmentaciya`),
      },
      {
        "@type": "Service",
        name: `Трихопигментация в ${cityIn}`,
        provider: {
          "@type": "Person",
          name: specialistName,
          sameAs: brandSameAs,
        },
        areaServed: content.name,
        description:
          "Визуальная коррекция при облысении, поредении волос, заметной макушке и в ряде случаев после пересадки волос.",
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
            item: getBaseUrl(`/${content.slug}/${gender}`),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Трихопигментация",
            item: getBaseUrl(`/${content.slug}/${gender}/trihopigmentaciya`),
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

  return (
    <>
      <JsonLd data={schema} />
      <SiteHeader city={content} gender={gender} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: `/${content.slug}/${gender}`, label: content.name },
          { label: "Трихопигментация" },
        ]}
      />
      <main className="pb-16">
        <PageHero
          eyebrow={content.name}
          title={`${copy.hero.titlePrefix}${cityIn} — ${gm.dative}`}
          subtitle={copy.hero.subtitleTemplate.replace("{city}", cityIn)}
          support={leadFor(gender as GenderSlug, "trihopigmentaciya")}
          primaryHref={`tel:${content.phoneHref}`}
          secondaryHref={`/${content.slug}/${gender}/do-posle`}
          secondaryLabel="Посмотреть до и после"
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
          <WorksGallery items={content.proofItems} />
        </Section>

        <Section
          eyebrow={copy.resultSection.eyebrow}
          title={copy.resultSection.title}
          description={copy.resultSection.description}
        >
          <div className="two-col">
            <div className="panel">
              <h3 className="panel-title">{copy.resultSection.leftTitle}</h3>
              <p className="panel-text">{copy.resultSection.leftText}</p>
            </div>
            <div className="panel">
              <h3 className="panel-title">{copy.resultSection.rightTitle}</h3>
              <InlineFeatureList
                variant="dense"
                items={[...copy.resultSection.rightItems]}
              />
            </div>
          </div>
        </Section>

        <Section
          eyebrow={copy.processSection.eyebrow}
          title={copy.processSection.title}
          description={copy.processSection.description}
        >
          <Steps steps={[...copy.processSection.steps]} />
        </Section>

        <Section
          eyebrow={copy.priceSection.eyebrow}
          title={`${copy.priceSection.titlePrefix}${cityIn}`}
          description={copy.priceSection.description}
        >
          <div className="card-grid">
            {content.priceItems.map((item) => (
              <div key={item.title} className="panel">
                <p className="panel-title">{item.title}</p>
                <p className="panel-price">{item.price}</p>
                <p className="panel-text">{item.description}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
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
      <SiteFooter city={content} gender={gender} />
    </>
  );
}
