"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ListIcon,
  PhoneIcon,
  XIcon,
} from "@phosphor-icons/react";

import { GenderToggle } from "@/components/theme/GenderToggle";
import { CitySwitcher } from "./CitySwitcher";
import {
  brandName,
  defaultPhoneDisplay,
  defaultPhoneHref,
  type CityContent,
} from "@/lib/site-data";
import { nbsp } from "@/shared/lib/typography";
import styles from "./Header.module.scss";

export function SiteHeader({ city }: { city?: CityContent | null }) {
  const [open, setOpen] = useState(false);

  const citySlug = city?.slug ?? "moskva";
  const base = `/${citySlug}`;
  const links = [
    { href: base, label: "Трихопигментация" },
    { href: `${base}/kamuflyazh-rubcov-na-golove`, label: "Камуфляж" },
    { href: `${base}/ceny`, label: "Цены" },
    { href: `${base}/do-posle`, label: "До / после" },
    { href: `${base}/otzyvy`, label: "Отзывы" },
    { href: "/blog", label: "Статьи" },
  ];

  const phoneHref = city?.phoneHref ?? defaultPhoneHref;
  const phoneDisplay = city?.phoneDisplay ?? defaultPhoneDisplay;

  return (
    <header className={styles.root}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoName}>{nbsp(brandName)}</span>
          <span className={styles.logoSub}>{nbsp("Трихопигментация · камуфляж рубцов")}</span>
        </Link>

        <nav className={styles.nav}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {nbsp(link.label)}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <CitySwitcher current={city?.slug} />
          <GenderToggle />

          <a className={styles.cta} href={`tel:${phoneHref}`}>
            <PhoneIcon size={18} weight="fill" />
            <span className={styles.ctaText}>{phoneDisplay}</span>
          </a>

          <button
            type="button"
            className={styles.burger}
            aria-label="Меню"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <XIcon size={22} /> : <ListIcon size={22} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className={styles.mobileMenu}>
          <div className={styles.mobileCity}>
            <CitySwitcher current={city?.slug} />
          </div>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setOpen(false)}
            >
              {nbsp(link.label)}
            </Link>
          ))}
          <a
            href={`tel:${phoneHref}`}
            className={styles.mobileCta}
            onClick={() => setOpen(false)}
          >
            <PhoneIcon size={18} weight="fill" />
            {phoneDisplay}
          </a>
        </nav>
      ) : null}
    </header>
  );
}
