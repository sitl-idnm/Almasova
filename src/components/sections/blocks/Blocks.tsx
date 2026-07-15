import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";

import type { FaqItem, ReviewItem } from "@/lib/site-data";
import styles from "./Blocks.module.scss";

/** ServiceCards — de-neuralized ServiceGrid: link cards, hover reveals accent line. */
export function ServiceCards({
  services,
}: {
  services: readonly { title: string; href: string; description: string }[];
}) {
  return (
    <div className={styles.services}>
      {services.map((service) => (
        <Link key={service.href} href={service.href} className={styles.service}>
          <div className={styles.serviceBody}>
            <h3 className={styles.serviceTitle}>{service.title}</h3>
            <p className={styles.serviceText}>{service.description}</p>
          </div>
          <span className={styles.serviceMore}>
            Подробнее <ArrowUpRight size={16} />
          </span>
        </Link>
      ))}
    </div>
  );
}

/** FeatureCards — de-neuralized TileGrid: surface + 1px inset line, no shadow. */
export function FeatureCards({ items }: { items: readonly string[] }) {
  return (
    <div className={styles.cards}>
      {items.map((item) => (
        <div key={item} className={styles.card}>
          <span className={styles.cardIcon}>
            <CheckCircle size={20} weight="fill" />
          </span>
          <p className={styles.cardText}>{item}</p>
        </div>
      ))}
    </div>
  );
}

/** Steps — numbered process cards (Chaika restraint). */
export function Steps({ steps }: { steps: readonly { title: string; text: string }[] }) {
  return (
    <div className={styles.steps}>
      {steps.map((step, i) => (
        <div key={step.title} className={styles.step}>
          <span className={styles.stepNum}>{i + 1}</span>
          <h3 className={styles.stepTitle}>{step.title}</h3>
          <p className={styles.stepText}>{step.text}</p>
        </div>
      ))}
    </div>
  );
}

/** Faq — native <details>, minimal +/- marker, no neural chrome. */
export function Faq({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className={styles.faqList}>
      {items.map((item) => (
        <details key={item.question} className={styles.faq}>
          <summary className={styles.faqQ}>
            <span>{item.question}</span>
            <span className={styles.faqMark} aria-hidden="true" />
          </summary>
          <p className={styles.faqA}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

/** Reviews — avatar/initials + name + label + quote. */
export function Reviews({ items }: { items: readonly ReviewItem[] }) {
  const initials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? "")
      .join("");

  return (
    <div className={styles.reviews}>
      {items.map((item) => (
        <article key={`${item.name}-${item.label}`} className={styles.review}>
          <div className={styles.reviewHead}>
            <div className={styles.reviewAvatar}>
              {item.avatarSrc ? (
                <Image src={item.avatarSrc} alt={item.avatarAlt ?? item.name} fill sizes="56px" />
              ) : (
                <span>{initials(item.name)}</span>
              )}
            </div>
            <div>
              <p className={styles.reviewName}>{item.name}</p>
              <p className={styles.reviewLabel}>{item.label}</p>
            </div>
          </div>
          <p className={styles.reviewQuote}>«{item.quote}»</p>
        </article>
      ))}
    </div>
  );
}
