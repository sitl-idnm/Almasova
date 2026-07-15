"use client";

import { useEffect, useState } from "react";
import { GenderFemaleIcon, GenderMaleIcon } from "@phosphor-icons/react";

import { currentGender, setGender, type Gender } from "./gender";
import styles from "./gender.module.scss";

export function GenderToggle() {
  const [g, setG] = useState<Gender>("male");

  useEffect(() => {
    setG(currentGender());
  }, []);

  const choose = (value: Gender) => {
    setGender(value);
    setG(value);
  };

  return (
    <div className={styles.toggle} role="group" aria-label="Кому подбираем решение">
      <button
        type="button"
        className={styles.toggleBtn}
        data-active={g === "male"}
        aria-pressed={g === "male"}
        aria-label="Мужчинам"
        title="Мужчинам"
        onClick={() => choose("male")}
      >
        <GenderMaleIcon size={18} weight="bold" />
      </button>
      <button
        type="button"
        className={styles.toggleBtn}
        data-active={g === "female"}
        aria-pressed={g === "female"}
        aria-label="Женщинам"
        title="Женщинам"
        onClick={() => choose("female")}
      >
        <GenderFemaleIcon size={18} weight="bold" />
      </button>
    </div>
  );
}
