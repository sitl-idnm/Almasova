"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GenderFemaleIcon, GenderMaleIcon } from "@phosphor-icons/react";

import { currentGender, setGender, type Gender } from "./gender";
import styles from "./gender.module.scss";

const SLUG: Record<Gender, string> = { male: "muzhchinam", female: "zhenshchinam" };

/**
 * Toggle between the male/female URL variants (/[city]/[gender]/...).
 * On a gendered path it navigates (swaps the gender segment); off it (e.g. "/")
 * it falls back to the cookie/theme toggle.
 */
export function GenderToggle() {
  const [g, setG] = useState<Gender>("male");
  const pathname = usePathname() || "/";
  const router = useRouter();

  const match = pathname.match(/^\/(moskva|almaty)\/(muzhchinam|zhenshchinam)(\/.*)?$/);
  const urlGender: Gender | null = match ? (match[2] === "zhenshchinam" ? "female" : "male") : null;

  useEffect(() => {
    setG(urlGender ?? currentGender());
  }, [urlGender]);

  const toggle = () => {
    const next: Gender = g === "male" ? "female" : "male";
    setGender(next);
    setG(next);
    if (match) {
      router.push(`/${match[1]}/${SLUG[next]}${match[3] ?? ""}`);
    }
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
