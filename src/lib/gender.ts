// Пол — это два отдельных хаба /[city]/muzhchinam и /[city]/zhenshchinam со своими
// текстами и запросами. Остальные страницы НЕ дублируются по полу (раньше было
// /[city]/[gender]/..., поисковики склеивали пары), а тема оформления на них
// берётся из cookie последнего выбора.

export type GenderSlug = "muzhchinam" | "zhenshchinam";

export const genderSlugs: GenderSlug[] = ["muzhchinam", "zhenshchinam"];

export const DEFAULT_GENDER: GenderSlug = "muzhchinam";

type GenderMeta = {
  /** CSS theme applied via data-gender (male = graphite, female = nude). */
  theme: "male" | "female";
  /** «для кого» — дательный, для заголовков: «мужчинам» / «женщинам». */
  dative: string;
  /** родительный: «мужчин» / «женщин». */
  genitive: string;
  /** «для мужчин» / «для женщин» — SEO-хвост. */
  forWhom: string;
  /** прилагательное: «мужская» / «женская». */
  adjective: string;
};

export const genderMeta: Record<GenderSlug, GenderMeta> = {
  muzhchinam: {
    theme: "male",
    dative: "мужчинам",
    genitive: "мужчин",
    forWhom: "для мужчин",
    adjective: "мужская",
  },
  zhenshchinam: {
    theme: "female",
    dative: "женщинам",
    genitive: "женщин",
    forWhom: "для женщин",
    adjective: "женская",
  },
};

export function isGenderSlug(value: string): value is GenderSlug {
  return value === "muzhchinam" || value === "zhenshchinam";
}

export function getGenderMeta(slug: string): GenderMeta | null {
  return isGenderSlug(slug) ? genderMeta[slug] : null;
}
