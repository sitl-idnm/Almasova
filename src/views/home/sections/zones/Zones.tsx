import { FC } from "react";
import Link from "next/link";
import { PhoneIcon, ScissorsIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/ui/Button/Button";
import { nbsp } from "@/shared/lib/typography";
import { defaultPhoneHref } from "@/lib/site-data";

import styles from "./Zones.module.scss";

const head = ["Зона", "Что решает", "Сеансы", "Ориентир"];

const rows = [
  ["Линия роста и залысины", "Возврат чёткой линии, залысины менее заметны", "2–3", "от 25 000 ₽"],
  ["Макушка", "Плотность там, где просвечивает кожа головы", "2–3", "от 45 000 ₽"],
  ["Пробор (женщинам)", "Густота по пробору без операции", "2–3", "от 25 000 ₽"],
  ["После пересадки", "Маскировка просветов, добор плотности", "индивид.", "от 45 000 ₽"],
  ["Полное загущение", "Крупные зоны, эффект аккуратной щетины", "2–3", "от 70 000 ₽"],
];

export const Zones: FC = () => {
  return (
    <section className={styles.root} id="zones">
      <div className={styles.wrap}>
        <h2 className={styles.title}>{nbsp("Что можно скорректировать")}</h2>

        <div className={styles.desc}>
          <p>
            {nbsp(
              "Трихопигментация не отращивает волосы — она создаёт эффект более плотной зоны и убирает лишний акцент с проблемного участка. Это не лечение облысения, а визуальная коррекция.",
            )}
          </p>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {head.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td key={i}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.actions}>
          <Button as="a" href={`tel:${defaultPhoneHref}`} variant="accent">
            <PhoneIcon size={18} weight="fill" />
            Узнать ориентировочную стоимость
          </Button>
          <Button as={Link} href="/moskva/muzhchinam/ceny" variant="bordered">
            Все цены
          </Button>
        </div>

        <div className={styles.highlight}>
          <div className={styles.highlightInner}>
            <span className={styles.highlightIcon}>
              <ScissorsIcon size={28} weight="regular" />
            </span>
            <h3 className={styles.highlightTitle}>Камуфляж рубцов на голове</h3>
            <p className={styles.highlightText}>
              {nbsp(
                "Линейные и точечные рубцы после пересадки, травм и операций делаю менее заметными при короткой стрижке — подбираю плотность точечно под каждый рубец.",
              )}
            </p>
            <Button
              as={Link}
              href="/moskva/muzhchinam/kamuflyazh-rubcov-na-golove"
              variant="light"
              className={styles.highlightCta}
            >
              Подробнее о камуфляже рубцов
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
