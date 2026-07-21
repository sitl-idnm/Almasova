"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChatCircleDotsIcon,
  ListIcon,
  PhoneIcon,
  TelegramLogoIcon,
  XIcon,
} from "@phosphor-icons/react";

import { GenderToggle } from "@/components/theme/GenderToggle";
import { CitySwitcher } from "./CitySwitcher";
import {
  brandName,
  defaultPhoneDisplay,
  defaultPhoneHref,
  defaultTelegramUrl,
  type CityContent,
} from "@/lib/site-data";
import { nbsp } from "@/shared/lib/typography";
import styles from "./Header.module.scss";

export function SiteHeader({ city }: { city?: CityContent | null }) {
  const [open, setOpen] = useState(false);

  const links = city
    ? [
        { href: `/${city.slug}/trihopigmentaciya`, label: "Трихопигментация" },
        { href: `/${city.slug}/kamuflyazh-rubcov-na-golove`, label: "Камуфляж рубцов" },
        { href: `/${city.slug}/ceny`, label: "Цены" },
        { href: `/${city.slug}/do-posle`, label: "До / после" },
        { href: `/${city.slug}/otzyvy`, label: "Отзывы" },
        { href: `/${city.slug}/faq`, label: "FAQ" },
      ]
    : [
        { href: "/moskva/trihopigmentaciya", label: "Трихопигментация" },
        { href: "/moskva/kamuflyazh-rubcov-na-golove", label: "Камуфляж рубцов" },
        { href: "/moskva/ceny", label: "Цены" },
        { href: "/moskva/do-posle", label: "До / после" },
        { href: "/moskva/otzyvy", label: "Отзывы" },
        { href: "/moskva/faq", label: "FAQ" },
      ];

  const phoneHref = city?.phoneHref ?? defaultPhoneHref;
  const phoneDisplay = city?.phoneDisplay ?? defaultPhoneDisplay;

  return (
    <header className={styles.root}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label={brandName}>
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

          <div className={styles.socials}>
            <a href={`tel:${phoneHref}`} className={styles.social} aria-label="Позвонить">
              <PhoneIcon size={18} weight="fill" />
            </a>
            <a
              href={defaultTelegramUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.social}
              aria-label="Telegram"
            >
              <TelegramLogoIcon size={18} weight="fill" />
            </a>
            <span className={styles.social} aria-label="MAX" title="MAX">
              <ChatCircleDotsIcon size={18} weight="fill" />
            </span>
          </div>

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
