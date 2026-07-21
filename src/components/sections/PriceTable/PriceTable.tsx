import styles from "./PriceTable.module.scss";

export type PriceRow = { title: string; price: string; description: string };

/**
 * PriceTable — Chaika tracks-table pattern: rows separated by 1px inset lines,
 * no cards/shadows/gradients. Zone + description on the left, accent price right.
 */
export function PriceTable({ items, note }: { items: PriceRow[]; note?: string }) {
  return (
    <div className={styles.table}>
      <div className={styles.head}>
        <span>Объём работы</span>
        <span>Ориентир</span>
      </div>
      {items.map((row) => (
        <div key={row.title} className={styles.row}>
          <div className={styles.cell}>
            <p className={styles.title}>{row.title}</p>
            <p className={styles.desc}>{row.description}</p>
          </div>
          <p className={styles.price}>{row.price}</p>
        </div>
      ))}
      {note && <p className={styles.note}>{note}</p>}
    </div>
  );
}
