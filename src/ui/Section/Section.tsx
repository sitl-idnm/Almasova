import { ReactNode } from "react";

import styles from "./Section.module.scss";

type SectionProps = {
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  /** Full-bleed accent background behind the section (Chaika hammock/header). */
  bleed?: boolean;
  className?: string;
  children?: ReactNode;
};

/**
 * Section — vertical rhythm (section-block) + container gutters + optional
 * eyebrow/title/description header. Replaces the monolith's decorated Section.
 */
export function Section({
  eyebrow,
  title,
  description,
  bleed = false,
  className,
  children,
}: SectionProps) {
  return (
    <section className={[styles.root, bleed && styles.bleed, className].filter(Boolean).join(" ")}>
      <div className={styles.inner}>
        {(eyebrow || title || description) && (
          <header className={styles.head}>
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            {title && <h2 className={styles.title}>{title}</h2>}
            {description && <p className={styles.description}>{description}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
