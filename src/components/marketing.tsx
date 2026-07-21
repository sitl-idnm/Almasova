import { ComponentType } from "react";

import { Hero } from "./sections/Hero/Hero";

// ── Adapter barrel ────────────────────────────────────────────────────
// The old monolith component names now map to the new de-neuralized
// section/block components. Kept so pages don't need import churn while the
// neural marketing.module.scss is fully retired.

export { SiteHeader } from "./layout/Header";
export { SiteFooter } from "./layout/Footer";
export { Section } from "@/ui/Section/Section";
export {
  FeatureCards as TileGrid,
  ServiceCards as ServiceGrid,
  Steps,
  Faq as FaqList,
  Reviews as ReviewsGrid,
} from "./sections/blocks/Blocks";
export { PriceTable as PriceGrid } from "./sections/PriceTable/PriceTable";
export {
  InlineFeatureList,
  ProofGrid,
  ContactCard,
  AboutSpecialist,
  Breadcrumbs,
} from "./sections/misc/Misc";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type IconCmp = ComponentType<{
  size?: number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
}>;

const HERO_TAGS: { icon: IconCmp; label: string }[] = [];

/** PageHero — bridge to the new Hero section (kept for page import stability). */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  support,
  primaryHref,
  secondaryHref,
  secondaryLabel = "Посмотреть работы",
  cityCards,
  tags = HERO_TAGS,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  support?: string;
  primaryHref: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  cityCards?: { href: string; title: string; text: string }[];
  tags?: { icon: IconCmp; label: string }[];
}) {
  return (
    <Hero
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      support={support}
      primaryHref={primaryHref}
      secondaryHref={secondaryHref}
      secondaryLabel={secondaryLabel}
      chips={tags.length ? tags : undefined}
      cityCards={cityCards}
    />
  );
}
