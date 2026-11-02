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
import { PriceTable } from "@/components/sections/PriceTable/PriceTable";
import { ServiceCards } from "@/components/sections/blocks/Blocks";
import { Compare } from "@/components/sections/Compare/Compare";
import { PriceQuiz } from "@/components/quiz/PriceQuiz";
import { GenderAccent } from "@/components/theme/GenderAccent";
import { blogArticles } from "@/content/blog";
import { genderLead } from "@/content/gender-copy";
import { trichopigmentaciyaCopy } from "@/content/trichopigmentaciya-copy";
import {
  breadcrumbSchema,
  businessSchema,
  cityAlternates,
  cityParams,
  faqSchema,
  pageMeta,
  personSchema,
  serviceSchema,
} from "@/lib/seo";
import { getCityContent, sharedFaqs } from "@/lib/site-data";

// Только известные города: /wp-admin и прочие адреса первого уровня — сразу 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return cityParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const content = getCityContent(city);
  if (!content) return {};

  return pageMeta({
    title: trichopigmentaciyaCopy[content.slug].metadataTitle,
    description: trichopigmentaciyaCopy[content.slug].metadataDescription,
    alternates: cityAlternates(content.slug),
  });
}

/**
 * Главная посадочная города по запросу «трихопигментация {город}».
 * Бывшие /[city]/trihopigmentaciya и /[city]/[gender] склеены сюда (301),
 * чтобы под ключ работала одна страница, а не пять.
 */
export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const content = getCityContent(city);
  if (!content) notFound();

  const copy = trichopigmentaciyaCopy;
  const cityIn = content.prepositionalName;
  const path = `/${content.slug}`;
  const h1 = `${copy.hero.titlePrefix}${cityIn}`;

  const faqItems = [
    sharedFaqs[0],
    sharedFaqs[1],
    sharedFaqs[2],
    {
      question: "Сколько стоит трихопигментация?",
      answer: `В ${cityIn} — ${content.priceItems
        .map((p) => `${p.title.toLowerCase()} ${p.price}`)
        .join(", ")} за сеанс. Консультация бесплатная, точную стоимость называю после оценки зоны, в том числе по фото.`,
    },
    sharedFaqs[4],
    sharedFaqs[5],
    {
      question: "Сколько сеансов потребуется?",
      answer:
        "Количество этапов зависит от зоны, исходной ситуации и желаемой визуальной плотности. Универсальной цифры для всех нет — план я объясняю после оценки.",
    },
    ...content.faqs.slice(0, 2),
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      businessSchema({ address: { "@type": "PostalAddress", addressLocality: content.name } }),
      personSchema(),
      serviceSchema({
        city: content.slug,
        cityName: content.name,
        name: h1,
        description: copy[content.slug].metadataDescription,
        path,
        priceItems: content.priceItems,
      }),
      breadcrumbSchema([
        { name: "Главная", path: "/" },
        { name: h1, path },
      ]),
      faqSchema(faqItems),
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <SiteHeader city={content} />
      <Breadcrumbs items={[{ href: "/", label: "Главная" }, { label: content.name }]} />
      <main className="pb-16">
        <PageHero
          eyebrow={`${content.name} · SMP, татуаж волос на голове`}
          title={h1}
          subtitle={copy.hero.subtitleTemplate.replace("{city}", cityIn)}
          support={copy.hero.support}
          primaryHref={`tel:${content.phoneHref}`}
          secondaryHref={`${path}/do-posle`}
          secondaryLabel="Посмотреть до и после"
        />

        <Section
          eyebrow="Кому подбираем решение"
          title="Мужчинам и женщинам — разные задачи"
          description="У мужчин чаще залысины и эффект бритой головы, у женщин — пробор и общая густота. Отдельные страницы с работами и ответами:"
        >
          <ServiceCards
            services={[
              {
                title: "Трихопигментация для мужчин",
                href: `${path}/muzhchinam`,
                description: genderLead.muzhchinam.default.lead,
              },
              {
                title: "Трихопигментация для женщин",
                href: `${path}/zhenshchinam`,
                description: genderLead.zhenshchinam.default.lead,
              },
            ]}
          />
        </Section>

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
          eyebrow="Чем я отличаюсь"
          title="Специалист с медицинским образованием, а не тату-мастер"
          description="Трихопигментацию делают и тату-мастера, и клиники пересадки. Вот в чём разница для вас."
        >
          <Compare priceFrom={content.priceItems[0]?.price} />
        </Section>

        <Section
          eyebrow={copy.resultSection.eyebrow}
          title={copy.resultSection.title}
          description={copy.resultSection.description}
        >
          <div className="two-col">
            <div className="panel">
              <h3 className="panel-title">{copy.resultSection.leftTitle}</h3>
              <p className="panel-text">
                <GenderAccent
                  male={copy.resultSection.leftText}
                  female="Если свои волосы сохранены, трихопигментация уменьшает контраст между волосами и кожей: пробор и макушка перестают просвечивать, а волосы выглядят гуще при привычной длине."
                />
              </p>
            </div>
            <div className="panel">
              <h3 className="panel-title">{copy.resultSection.rightTitle}</h3>
              <InlineFeatureList variant="dense" items={[...copy.resultSection.rightItems]} />
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
          <PriceTable items={content.priceItems} note="Консультация — бесплатно, в том числе по фото." />
          <PriceQuiz city={content} />
        </Section>

        <Section
          eyebrow="Зоны и ситуации"
          title={`Трихопигментация по зонам в ${cityIn}`}
          description="Подробные страницы под конкретную задачу — с фото, ценами и ответами."
        >
          <ServiceCards services={content.services} />
        </Section>

        <Section
          eyebrow={copy.reviewsSection.eyebrow}
          title={copy.reviewsSection.title}
          description={copy.reviewsSection.description}
        >
          <ReviewsGrid items={content.reviews} />
        </Section>

        <Section eyebrow="FAQ" title="Частые вопросы о трихопигментации">
          <FaqList items={faqItems} />
        </Section>

        <Section
          eyebrow="Статьи"
          title="Разобраться до консультации"
          description="Честные ответы на вопросы, которые задают чаще всего."
        >
          <ServiceCards
            services={blogArticles.slice(0, 4).map((a) => ({
              title: a.title,
              href: `/blog/${a.slug}`,
              description: a.excerpt,
            }))}
          />
        </Section>

        <Section
          eyebrow={copy.contactsSection.eyebrow}
          title={copy.contactsSection.title}
          description={copy.contactsSection.description}
        >
          <ContactCard city={content} />
        </Section>

        <Section eyebrow={copy.aboutSection.eyebrow} title={copy.aboutSection.title}>
          <AboutSpecialist />
        </Section>
      </main>
      <SiteFooter city={content} />
    </>
  );
}
