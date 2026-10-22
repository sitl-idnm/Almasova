"use client";

import Link from "next/link";

import { setGender } from "./gender";
import styles from "./gender.module.scss";

/**
 * Выбор «Мужчинам / Женщинам» на первом экране главной — вместо модального окна.
 * Обычные ссылки на гендерные разделы Москвы (работают и без JS, полезны для
 * перелинковки); клик дополнительно запоминает пол для оформления сайта.
 */
export function GenderChoice({ className }: { className?: string }) {
  return (
    <nav className={`${styles.choice} ${className ?? ""}`} aria-label="Кому подбираем решение">
      <span className={styles.choiceLabel}>Кому подбираем решение:</span>
      <Link
        href="/moskva/muzhchinam"
        className={styles.choiceLink}
        onClick={() => setGender("male")}
      >
        Мужчинам
      </Link>
      <Link
        href="/moskva/zhenshchinam"
        className={styles.choiceLink}
        onClick={() => setGender("female")}
      >
        Женщинам
      </Link>
    </nav>
  );
}
