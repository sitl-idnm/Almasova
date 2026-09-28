import type { LegalDoc } from "@/content/legal";
import styles from "./LegalDoc.module.scss";

/** Рендер юридического документа: заголовок, вступление и разделы-проза. */
export function LegalDocView({ doc }: { doc: LegalDoc }) {
  return (
    <article className={styles.root}>
      <h1 className={styles.title}>{doc.title}</h1>
      <p className={styles.intro}>{doc.intro}</p>
      {doc.sections.map((section) => (
        <section key={section.heading} className={styles.section}>
          <h2 className={styles.heading}>{section.heading}</h2>
          {section.body.map((block, i) =>
            Array.isArray(block) ? (
              <ul key={i} className={styles.list}>
                {block.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p key={i} className={styles.paragraph}>
                {block}
              </p>
            ),
          )}
        </section>
      ))}
    </article>
  );
}
