"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Header.module.scss";

const CITIES = [
  { slug: "moskva", label: "Москва" },
  { slug: "almaty", label: "Алматы" },
] as const;

/**
 * Переключатель города в шапке. На городской странице ведёт на тот же раздел
 * в другом городе (сохраняем подпуть), иначе — на хаб города.
 */
export function CitySwitcher({ current }: { current?: string | null }) {
  const pathname = usePathname() || "/";
  const match = pathname.match(/^\/(moskva|almaty)(\/.*)?$/);
  const active = current ?? match?.[1] ?? "moskva";

  const hrefFor = (slug: string) => (match ? `/${slug}${match[2] ?? ""}` : `/${slug}`);

  return (
    <div className={styles.citySwitch} role="group" aria-label="Город">
      {CITIES.map((c) => (
        <Link
          key={c.slug}
          href={hrefFor(c.slug)}
          className={styles.cityBtn}
          data-active={c.slug === active}
          aria-current={c.slug === active ? "page" : undefined}
        >
          {c.label}
        </Link>
      ))}
    </div>
  );
}
