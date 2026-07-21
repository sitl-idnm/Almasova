"use client";

import { useEffect, useState } from "react";

import { readGender, setGender, type Gender } from "./gender";
import styles from "./gender.module.scss";

export function GenderOverlay() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!readGender()) setOpen(true);
  }, []);

  if (!open) return null;

  const choose = (value: Gender) => {
    setGender(value);
    setOpen(false);
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Кому подбираем решение"
    >
      <div className={styles.overlayCard}>
        <p className={styles.overlayEyebrow}>Трихопигментация · медицинский подход</p>
        <h2 className={styles.overlayTitle}>Кому подбираем решение?</h2>
        <p className={styles.overlayText}>
          Задачи и подача отличаются. Выберите, чтобы показать примеры и оформление,
          подходящие именно вам. Позже это можно переключить в шапке сайта.
        </p>
        <div className={styles.overlayActions}>
          <button
            type="button"
            className={`${styles.overlayChoice} ${styles.overlayMale}`}
            onClick={() => choose("male")}
          >
            <span className={styles.overlayChoiceTitle}>Мужчинам</span>
            <span className={styles.overlayChoiceText}>
              Залысины, макушка, бритый эффект, рубцы после пересадки
            </span>
          </button>
          <button
            type="button"
            className={`${styles.overlayChoice} ${styles.overlayFemale}`}
            onClick={() => choose("female")}
          >
            <span className={styles.overlayChoiceTitle}>Женщинам</span>
            <span className={styles.overlayChoiceText}>
              Поредение пробора, густота, деликатная и естественная подача
            </span>
          </button>
        </div>
        <button type="button" className={styles.overlaySkip} onClick={() => choose("male")}>
          Пропустить
        </button>
      </div>
    </div>
  );
}
