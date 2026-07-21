import Link from "next/link";
import {
  ChatCircleDotsIcon,
  PhoneIcon,
  TelegramLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

import {
  brandName,
  defaultPhoneDisplay,
  defaultPhoneHref,
  defaultTelegramUrl,
  specialistName,
  type CityContent,
} from "@/lib/site-data";
import { nbsp } from "@/shared/lib/typography";
import styles from "./Footer.module.scss";

export function SiteFooter({ city }: { city?: CityContent | null }) {
  const phoneHref = city?.phoneHref ?? defaultPhoneHref;
  const phoneDisplay = city?.phoneDisplay ?? defaultPhoneDisplay;
  const year = new Date().getFullYear();

  return (
    <footer className={styles.root}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <p className={styles.brandName}>{nbsp(specialistName)}</p>
          <p className={styles.brandText}>
            {nbsp(
              "Врач. Трихопигментация кожи головы и медицинский камуфляж рубцов — залысины, редкая макушка и рубцы без неестественного эффекта.",
            )}
          </p>
          <div className={styles.socials}>
            <a href={`tel:${phoneHref}`} className={styles.social} aria-label="Позвонить">
              <PhoneIcon size={20} weight="fill" />
            </a>
            <a
              href={defaultTelegramUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.social}
              aria-label="Telegram"
            >
              <TelegramLogoIcon size={20} weight="fill" />
            </a>
            <span className={styles.social} aria-label="MAX" title="MAX">
              <ChatCircleDotsIcon size={20} weight="fill" />
            </span>
          </div>
        </div>

        <div className={styles.col}>
          <p className={styles.colLabel}>Города</p>
          <Link href="/moskva">{nbsp("Москва")}</Link>
          <Link href="/almaty">{nbsp("Алматы")}</Link>
        </div>

        <div className={styles.col}>
          <p className={styles.colLabel}>Разделы</p>
          <Link href={city ? `/${city.slug}/do-posle` : "/moskva/do-posle"}>
            {nbsp("До и после")}
          </Link>
          <Link href={city ? `/${city.slug}/ceny` : "/moskva/ceny"}>{nbsp("Цены")}</Link>
          <Link href={city ? `/${city.slug}/faq` : "/moskva/faq"}>{nbsp("Вопросы")}</Link>
          <Link href={city ? `/${city.slug}/kontakty` : "/moskva/kontakty"}>
            {nbsp("Контакты")}
          </Link>
        </div>

        <div className={styles.col}>
          <p className={styles.colLabel}>Связь</p>
          <a href={`tel:${phoneHref}`} className={styles.phone}>
            {phoneDisplay}
          </a>
          <p className={styles.note}>{nbsp("Телефон, Telegram, MAX и онлайн-консультация")}</p>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© {year} {nbsp(brandName)}</span>
        <span>{nbsp("Трихопигментация · медицинский камуфляж")}</span>
      </div>
    </footer>
  );
}
