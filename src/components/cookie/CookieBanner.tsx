"use client";

import Link from "next/link";

import { setConsent, useConsent } from "@/shared/lib/consent";

import styles from "./CookieBanner.module.scss";

/**
 * Баннер о cookie/аналитике. Показывается, пока посетитель не сделал выбор.
 * Яндекс.Метрика (см. analytics/Metrika.tsx) запускается только после «Принять»;
 * «Отклонить» запоминает отказ, аналитика не загружается.
 */
export function CookieBanner() {
  const consent = useConsent();

  if (consent !== "unset") return null;

  return (
    <div className={styles.root} role="dialog" aria-label="Использование cookie">
      <p className={styles.text}>
        Мы используем файлы cookie и Яндекс.Метрику для аналитики и корректной работы
        сайта. Продолжая пользоваться сайтом, вы соглашаетесь с{" "}
        <Link href="/politika-cookies" className={styles.link}>
          Политикой cookie
        </Link>
        .
      </p>
      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => setConsent("denied")}
          className={`${styles.button} ${styles.buttonSecondary}`}
        >
          Отклонить
        </button>
        <button type="button" onClick={() => setConsent("granted")} className={styles.button}>
          Принять
        </button>
      </div>
    </div>
  );
}
