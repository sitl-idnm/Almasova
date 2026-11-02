import type { FaqItem } from "@/lib/site-data";

/**
 * Блок тела статьи. В `text` и `items` можно ставить ссылки в виде
 * `[текст ссылки](/moskva/ceny)` — рендер превратит их в <Link>.
 */
export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] }
  /** Выделенная плашка: «Важно», «Коротко», дисклеймер. */
  | { type: "note"; title?: string; text: string };

export type BlogArticle = {
  slug: string;
  /** H1 статьи. */
  title: string;
  /** <title>, до 70 символов. */
  metaTitle: string;
  /** meta description, 140–160 символов. */
  metaDescription: string;
  /** Короткий ответ сразу под H1 (40–60 слов) — под сниппет и ИИ-ответы. */
  lead: string;
  /** ISO-дата публикации. */
  published: string;
  /** ISO-дата последней правки. */
  updated: string;
  readingMinutes: number;
  /** Подпись карточки в списке статей. */
  excerpt: string;
  body: BlogBlock[];
  faq: FaqItem[];
  /** Ссылки на коммерческие страницы в конце статьи. */
  related: { label: string; href: string }[];
};
