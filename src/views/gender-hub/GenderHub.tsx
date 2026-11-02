import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Certificate, ShieldCheck, Sparkle } from "@phosphor-icons/react/dist/ssr";

import {
  AboutSpecialist,
  Breadcrumbs,
  ContactCard,
  InlineFeatureList,
  JsonLd,
  Section,
  SiteFooter,
  SiteHeader,
} from "@/components/marketing";
import { WorksGallery } from "@/components/works-gallery";
import { Hero } from "@/components/sections/Hero/Hero";
import { PriceTable } from "@/components/sections/PriceTable/PriceTable";
import { Faq, FeatureCards, Reviews, ServiceCards } from "@/components/sections/blocks/Blocks";
import { PriceQuiz } from "@/components/quiz/PriceQuiz";
import { GenderSync } from "@/components/theme/GenderSync";
import { genderHubCopy } from "@/content/gender-hub-copy";
import { worksFemale, worksMale } from "@/content/works";
import { genderMeta, type GenderSlug } from "@/lib/gender";
import {
  breadcrumbSchema,
  businessSchema,
  cityAlternates,
  faqSchema,
  pageMeta,
  serviceSchema,
} from "@/lib/seo";
import { getCityContent, sharedFaqs, type CityContent } from "@/lib/site-data";

function fill(template: string, city: CityContent) {
  return template
    .replace("{city}", city.prepositionalName)
    .replace("{priceFrom}", city.priceItems[0]?.price ?? "");
}

export function genderHubMetadata(city: string, gender: GenderSlug): Metadata {
  const content = getCityContent(city);
  if (!content) return {};
  const copy = genderHubCopy[gender];
  return pageMeta({
    title: fill(copy.metaTitle, content),
    description: fill(copy.metaDescription, content),
    alternates: cityAlternates(content.slug, `/${gender}`),
  });
}

/**
 * Хаб /[city]/muzhchinam | /[city]/zhenshchinam. Тема оформления — из URL
 * (GenderSync), тексты и FAQ — свои для каждого пола, без дублей с другими страницами.
 */
export function GenderHub({ city, gender }: { city: string; gender: GenderSlug }) {
  const content = getCityContent(city);
  if (!content) notFound();

  const copy = genderHubCopy[gender];
  const gm = genderMeta[gender];
  const cityIn = content.prepositionalName;
  const path = `/${content.slug}/${gender}`;
  const h1 = fill(copy.h1, content);
  const works = gender === "zhenshchinam" ? worksFemale : worksMale;
  // Общий вопрос «это не лечение» нужен на каждой коммерческой странице.
  const faq = [...copy.faq, sharedFaqs[2]];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      businessSchema(),
      serviceSchema({
        city: content.slug,
        cityName: content.name,
        name: h1,
        description: fill(copy.metaDescription, content),
        path,
        priceItems: content.priceItems,
      }),
      breadcrumbSchema([
        { name: "Главная", path: "/" },
        { name: `Трихопигментация в ${cityIn}`, path: `/${content.slug}` },
        { name: copy.eyebrow, path },
      ]),
      faqSchema(faq),
    ],
  };

  return (
    <>
      <GenderSync theme={gm.theme} />
      <JsonLd data={schema} />
      <SiteHeader city={content} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: `/${content.slug}`, label: content.name },
          { label: copy.eyebrow },
        ]}
      />
      <main className="pb-16">
        <Hero
          eyebrow={`${content.name} · ${copy.eyebrow}`}
          title={h1}
          subtitle={copy.subtitle}
          support={copy.support}
          primaryHref={`tel:${content.phoneHref}`}
          secondaryHref={`/${content.slug}/do-posle`}
          secondaryLabel="Посмотреть работы"
          chips={[
            { icon: ShieldCheck, label: "С мед. образованием, а не тату-мастер" },
            { icon: Sparkle, label: "Без «синевы» и эффекта тату" },
            { icon: Certificate, label: "Консультация бесплатно" },
          ]}
        />

        <Section eyebrow="Кому подходит" title={copy.problemsTitle} description={copy.problemsDescription}>
          <FeatureCards items={copy.problems} />
        </Section>

        <Section
          eyebrow="Фото работ"
          title={`Работы: ${gm.dative}`}
          description="Реальные работы из моей галереи. Больше — на странице «До и после»."
        >
          <WorksGallery items={works.length ? works : content.proofItems} />
        </Section>

        <Section eyebrow="Результат" title={copy.resultTitle} description={copy.resultDescription}>
          <InlineFeatureList items={copy.resultItems} />
        </Section>

        <Section eyebrow="Подробно" title={copy.deepTitle}>
          <div className="prose">
            {copy.deepParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Зоны"
          title={`Подробнее по вашей ситуации в ${cityIn}`}
          description="Отдельные страницы по зонам — с фото, ответами на вопросы и ценами."
        >
          <ServiceCards
            services={copy.concernLinks.map((c) => ({
              title: c.title,
              href: `/${content.slug}/${c.slug}`,
              description: c.description,
            }))}
          />
        </Section>

        <Section
          eyebrow="Стоимость"
          title={`Цены на трихопигментацию ${gm.forWhom} в ${cityIn}`}
          description="Цена зависит от площади зоны и числа этапов. Консультация — бесплатно, точную стоимость называю после оценки, в том числе по фото."
        >
          <PriceTable items={content.priceItems} />
          <PriceQuiz city={content} defaultGender={gm.theme} />
        </Section>

        <Section eyebrow="Отзывы" title="Что говорят клиенты">
          <Reviews items={content.reviews} />
        </Section>

        <Section eyebrow="FAQ" title={`Частые вопросы: трихопигментация ${gm.forWhom}`}>
          <Faq items={faq} />
        </Section>

        <Section eyebrow="Контакты" title="Записаться на консультацию">
          <ContactCard city={content} />
        </Section>

        <Section eyebrow="Обо мне" title="Кто будет работать с вами">
          <AboutSpecialist />
        </Section>
      </main>
      <SiteFooter city={content} />
    </>
  );
}

