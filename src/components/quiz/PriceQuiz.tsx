"use client";

import { useState } from "react";
import { ArrowCounterClockwise, Phone, TelegramLogo } from "@phosphor-icons/react";

import { Button } from "@/ui/Button/Button";
import { defaultTelegramUrl, type CityContent } from "@/lib/site-data";
import { ymGoal } from "@/shared/lib/metrika";
import styles from "./PriceQuiz.module.scss";

type Who = "male" | "female";

/**
 * Зона → индекс строки прайса города (city.priceItems):
 * 0 — локальная зона, 1 — макушка или залысины, 2 — полное загущение.
 */
const ZONES: { id: string; label: string; price: 0 | 1 | 2; who?: Who }[] = [
  { id: "line", label: "Залысины / линия роста", price: 1 },
  { id: "crown", label: "Макушка", price: 1 },
  { id: "part", label: "Пробор", price: 0, who: "female" },
  { id: "full", label: "Вся голова, эффект бритой головы", price: 2, who: "male" },
  { id: "thin", label: "Общее поредение, нужна густота", price: 2, who: "female" },
  { id: "scar", label: "Рубец или шрам", price: 0 },
  { id: "transplant", label: "После пересадки волос", price: 1 },
];

/**
 * Квиз «Сколько будет стоить» — без формы и сбора персональных данных
 * (форм на сайте нет до уведомления РКН). Даёт ориентир из прайса города и
 * ведёт в Telegram/звонок, где клиент сам присылает фото зоны.
 */
export function PriceQuiz({ city, defaultGender }: { city: CityContent; defaultGender?: Who }) {
  const [who, setWho] = useState<Who | null>(defaultGender ?? null);
  const [zone, setZone] = useState<(typeof ZONES)[number] | null>(null);

  const zones = ZONES.filter((z) => !z.who || z.who === who);
  const price = zone ? city.priceItems[zone.price] : null;

  const pickZone = (z: (typeof ZONES)[number]) => {
    setZone(z);
    ymGoal("quiz_done", { zone: z.id, who, city: city.slug });
  };

  return (
    <div className={styles.root} aria-live="polite">
      <div className={styles.head}>
        <p className={styles.kicker}>Калькулятор</p>
        <h3 className={styles.title}>Узнайте ориентир по цене за 2 клика</h3>
      </div>

      {!zone ? (
        <>
          <fieldset className={styles.step}>
            <legend className={styles.legend}>1. Для кого</legend>
            <div className={styles.options}>
              {(["male", "female"] as const).map((w) => (
                <button
                  key={w}
                  type="button"
                  className={styles.option}
                  aria-pressed={who === w}
                  onClick={() => setWho(w)}
                >
                  {w === "male" ? "Мужчине" : "Женщине"}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className={styles.step} disabled={!who}>
            <legend className={styles.legend}>2. Какая зона беспокоит</legend>
            <div className={styles.options}>
              {zones.map((z) => (
                <button key={z.id} type="button" className={styles.option} onClick={() => pickZone(z)}>
                  {z.label}
                </button>
              ))}
            </div>
          </fieldset>
        </>
      ) : (
        <div className={styles.result}>
          <p className={styles.resultZone}>{zone.label}</p>
          <p className={styles.resultPrice}>{price?.price}</p>
          <p className={styles.resultText}>
            за сеанс. {price?.description} Число сеансов зависит от зоны; точную цену назову после
            оценки — пришлите фото при дневном свете, консультация бесплатная.
          </p>
          <div className={styles.actions}>
            <Button
              as="a"
              href={defaultTelegramUrl}
              target="_blank"
              rel="noreferrer"
              variant="accent"
              onClick={() => ymGoal("click_telegram", { from: "quiz" })}
            >
              <TelegramLogo size={18} weight="fill" />
              Отправить фото в Telegram
            </Button>
            <Button
              as="a"
              href={`tel:${city.phoneHref}`}
              variant="bordered"
              onClick={() => ymGoal("click_phone", { from: "quiz" })}
            >
              <Phone size={18} weight="fill" />
              Позвонить
            </Button>
            <button type="button" className={styles.reset} onClick={() => setZone(null)}>
              <ArrowCounterClockwise size={16} />
              Другая зона
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
