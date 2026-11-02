import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  Breadcrumbs,
  ContactCard,
  FaqList,
  JsonLd,
  Section,
  SiteFooter,
  SiteHeader,
} from "@/components/marketing";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { ServiceCards } from "@/components/sections/blocks/Blocks";
import { blogArticles } from "@/content/blog";
import { breadcrumbSchema, businessSchema, faqSchema, pageMeta, personSchema } from "@/lib/seo";
import { getBaseUrl, getCityContent, specialistName } from "@/lib/site-data";
import styles from "./article.module.scss";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogArticles.map((a) => ({ slug: a.slug }));
}

function getArticle(slug: string) {
  return blogArticles.find((a) => a.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const meta = pageMeta({
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: getBaseUrl(`/blog/${slug}`) },
  });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: article.published,
      modifiedTime: article.updated,
      authors: [specialistName],
    },
  };
}

const dateFmt = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const path = `/blog/${slug}`;
  const moskva = getCityContent("moskva")!;
  const others = blogArticles.filter((a) => a.slug !== slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      businessSchema(),
      personSchema(),
      {
        "@type": "Article",
        headline: article.title,
        description: article.metaDescription,
        url: getBaseUrl(path),
        mainEntityOfPage: getBaseUrl(path),
        datePublished: article.published,
        dateModified: article.updated,
        inLanguage: "ru",
        image: getBaseUrl("/opengraph-image"),
        author: { "@id": `${getBaseUrl("/")}#person` },
        publisher: { "@id": `${getBaseUrl("/")}#business` },
      },
      breadcrumbSchema([
        { name: "Главная", path: "/" },
        { name: "Статьи", path: "/blog" },
        { name: article.title, path },
      ]),
      faqSchema(article.faq),
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/blog", label: "Статьи" },
          { label: article.title },
        ]}
      />
      <main className="pb-16">
        <article className={`container ${styles.article}`}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>Статья · {article.readingMinutes} мин</p>
            <h1 className={styles.title}>{article.title}</h1>
            <p className={styles.lead}>{article.lead}</p>
            <p className={styles.byline}>
              {specialistName}, специалист по трихопигментации с высшим медицинским образованием ·
              обновлено{" "}
              <time dateTime={article.updated}>{dateFmt.format(new Date(article.updated))}</time>
            </p>
          </header>
          <ArticleBody blocks={article.body} />
        </article>

        {article.faq.length > 0 && (
          <Section eyebrow="FAQ" title="Коротко о главном">
            <FaqList items={article.faq} />
          </Section>
        )}

        <Section eyebrow="Услуги" title="Если хотите разобрать свой случай">
          <ServiceCards
            services={article.related.map((r) => ({
              title: r.label,
              href: r.href,
              description: "Фото работ, цены и ответы на вопросы.",
            }))}
          />
        </Section>

        <Section eyebrow="Читать дальше" title="Другие статьи">
          <ServiceCards
            services={others.map((a) => ({
              title: a.title,
              href: `/blog/${a.slug}`,
              description: a.excerpt,
            }))}
          />
        </Section>

        <Section eyebrow="Консультация" title="Бесплатная оценка по фото">
          <ContactCard city={moskva} />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
