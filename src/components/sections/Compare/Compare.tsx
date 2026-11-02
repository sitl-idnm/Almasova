import { Check, Minus } from "@phosphor-icons/react/dist/ssr";

import styles from "./Compare.module.scss";

type Cell = { yes?: boolean; text: string };

const COLUMNS = ["Алёна Алмасова", "Тату-мастер / студия", "Клиника пересадки"];

const ROWS: { label: string; cells: Cell[] }[] = [
  {
    label: "Образование",
    cells: [
      { yes: true, text: "Высшее медицинское" },
      { yes: false, text: "Курсы, без медицинской базы" },
      { yes: true, text: "Врачи, но трихопигментация — побочная услуга" },
    ],
  },
  {
    label: "Подход к коже",
    cells: [
      { yes: true, text: "Глубина и пигмент под анатомию кожи — без «синевы»" },
      { yes: false, text: "Часто по одному шаблону" },
      { yes: true, text: "Медицинский, но без фокуса на эстетике точки" },
    ],
  },
  {
    label: "Цена",
    cells: [
      { yes: true, text: "Прозрачный прайс по зонам" },
      { yes: true, text: "От демпинга до «по запросу»" },
      { yes: false, text: "Высокая, часто почасовая" },
    ],
  },
  {
    label: "Консультация",
    cells: [
      { yes: true, text: "Бесплатно, можно по фото" },
      { yes: false, text: "Бывает платной или с задатком" },
      { yes: false, text: "Обычно платная, очно" },
    ],
  },
  {
    label: "Операция",
    cells: [
      { yes: true, text: "Не нужна" },
      { yes: true, text: "Не нужна" },
      { yes: false, text: "Пересадка — операция и восстановление" },
    ],
  },
];

/**
 * «Почему не тату-мастер и не клиника» — главный дифференциатор из анализа
 * конкурентов (02.11.2026): частные мастера без медобразования, врачи — только
 * в дорогих клиниках пересадки. Конкурентов не называем.
 */
export function Compare({ priceFrom }: { priceFrom?: string }) {
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <caption className="visually-hidden">
          Сравнение: специалист с медицинским образованием, тату-мастер и клиника пересадки
        </caption>
        <thead>
          <tr>
            <th scope="col" />
            {COLUMNS.map((c, i) => (
              <th key={c} scope="col" data-own={i === 0 || undefined}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              {row.cells.map((cell, i) => (
                <td key={i} data-own={i === 0 || undefined}>
                  <span className={styles.cell}>
                    {cell.yes ? (
                      <Check size={16} weight="bold" className={styles.yes} aria-label="Да" />
                    ) : (
                      <Minus size={16} weight="bold" className={styles.no} aria-label="Нет" />
                    )}
                    {i === 0 && priceFrom && row.label === "Цена"
                      ? `Прозрачный прайс по зонам, ${priceFrom}`
                      : cell.text}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
