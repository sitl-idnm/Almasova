"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "./CookieBanner.module.scss";

const STORAGE_KEY = "cookie-consent";

/**
 * Информационный баннер о cookie/аналитике. Появляется, пока согласие не дано,
 * и запоминает выбор в localStorage. Яндекс.Метрику не блокирует (уведомительная
 * модель): продолжая пользоваться сайтом, пользователь соглашается.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* localStorage недоступен — просто скрываем баннер */
    }
    setVisible(false);
  };

  if (!visible) return null;

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
      <button type="button" onClick={accept} className={styles.button}>
        Принять
      </button>
    </div>
  );
}
