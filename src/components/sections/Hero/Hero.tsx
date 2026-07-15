import { ComponentType } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/ui/Button/Button";
import styles from "./Hero.module.scss";

type PhosphorIcon = ComponentType<{ size?: number; weight?: "fill" | "regular" | "bold" }>;

export type HeroChip = { icon: PhosphorIcon; label: string };
export type HeroCityCard = { href: string; title: string; text: string };

type HeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  support?: string;
  primaryHref: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  chips?: HeroChip[];
  cityCards?: HeroCityCard[];
  /** Aside plate copy when there are no city cards. */
  asideTitle?: string;
  asideText?: string;
};

/**
 * Hero — Chaika full-bleed rounded panel, de-neuralized: flat surface + a single
 * 1px inset line, no glow/gradient/drop-shadow. Arsenal display title.
 * The aside plate carries `data-slot="hero-lead"` — reserved for the future
 * lead form (blocked until РКН registration); shows a phone CTA meanwhile.
 */
export function Hero({
  eyebrow,
  title,
  subtitle,
  support,
  primaryHref,
  primaryLabel = "Позвонить",
  secondaryHref,
  secondaryLabel = "Посмотреть работы",
  chips,
  cityCards,
  asideTitle = "Медицинский подход",
  asideText = "Оцениваю показания и противопоказания, подбираю линию, плотность и оттенок под ваш случай — без шаблона и лишних обещаний.",
}: HeroProps) {
  return (
    <section className={styles.wrap}>
      <div className={styles.panel}>
        <div className={styles.main}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          {support && <p className={styles.support}>{support}</p>}

          <div className={styles.actions}>
            <Button as="a" href={primaryHref} variant="accent">
              <Phone size={18} weight="fill" />
              {primaryLabel}
            </Button>
            {secondaryHref && (
              <Button as={Link} href={secondaryHref} variant="bordered">
                {secondaryLabel}
                <ArrowUpRight size={16} />
              </Button>
            )}
          </div>

          {chips?.length ? (
            <div className={styles.chips}>
              {chips.map(({ icon: Ic, label }) => (
                <span key={label} className={styles.chip}>
                  <Ic size={16} weight="fill" />
                  {label}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className={styles.side}>
          {cityCards?.length ? (
            <div className={styles.cities}>
              {cityCards.map((card) => (
                <Link key={card.href} href={card.href} className={styles.city}>
                  <span className={styles.cityIcon}>
                    <MapPin size={20} weight="fill" />
                  </span>
                  <span className={styles.cityBody}>
                    <span className={styles.cityTitle}>{card.title}</span>
                    <span className={styles.cityText}>{card.text}</span>
                  </span>
                  <ArrowUpRight size={20} className={styles.cityArrow} />
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.aside} data-slot="hero-lead">
              <span className={styles.asideIcon}>
                <ShieldCheck size={24} weight="fill" />
              </span>
              <p className={styles.asideTitle}>{asideTitle}</p>
              <p className={styles.asideText}>{asideText}</p>
              {/* TODO(РКН): заменить на <LeadForm variant="lead" /> после регистрации. */}
              <Button as="a" href={primaryHref} variant="soft" block>
                <Phone size={16} weight="fill" />
                Записаться на консультацию
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
