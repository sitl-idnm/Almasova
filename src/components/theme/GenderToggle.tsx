"use client";

import { useEffect, useState } from "react";
import { GenderFemaleIcon, GenderMaleIcon } from "@phosphor-icons/react";

import { currentGender, setGender, type Gender } from "./gender";
import styles from "./gender.module.scss";

/** Single unified toggle: a click anywhere flips male<->female, thumb slides. */
export function GenderToggle() {
  const [g, setG] = useState<Gender>("male");

  useEffect(() => {
    setG(currentGender());
  }, []);

  const toggle = () => {
    const next: Gender = g === "male" ? "female" : "male";
    setGender(next);
    setG(next);
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      data-gender={g}
      onClick={toggle}
      aria-label={g === "male" ? "Переключить на женский вариант" : "Переключить на мужской вариант"}
      title="Мужчинам / женщинам"
    >
      <span className={styles.thumb} aria-hidden="true" />
      <span className={styles.icon} data-side="male" aria-hidden="true">
        <GenderMaleIcon size={16} weight="bold" />
      </span>
      <span className={styles.icon} data-side="female" aria-hidden="true">
        <GenderFemaleIcon size={16} weight="bold" />
      </span>
    </button>
  );
}
