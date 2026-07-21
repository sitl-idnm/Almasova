// Gender URL layer: /[city]/[gender]/... where gender ∈ muzhchinam | zhenshchinam.
// Separate URLs let us target gendered keywords ("трихопигментация для мужчин/женщин")
// and drive the visual theme (data-gender) from the URL instead of a cookie.

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

/** city × gender static params for generateStaticParams. */
export function cityGenderParams() {
  return ["moskva", "almaty"].flatMap((city) =>
    genderSlugs.map((gender) => ({ city, gender })),
  );
}

export function getGenderMeta(slug: string): GenderMeta | null {
  return isGenderSlug(slug) ? genderMeta[slug] : null;
}
