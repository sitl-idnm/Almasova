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
import { DEFAULT_GENDER } from "@/lib/gender";
import { nbsp } from "@/shared/lib/typography";
import styles from "./Footer.module.scss";

export function SiteFooter({
  city,
  gender = DEFAULT_GENDER,
}: {
  city?: CityContent | null;
  gender?: string;
}) {
  const phoneHref = city?.phoneHref ?? defaultPhoneHref;
  const phoneDisplay = city?.phoneDisplay ?? defaultPhoneDisplay;
  const citySlug = city?.slug ?? "moskva";
  const base = `/${citySlug}/${gender}`;
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
          <Link href={`/moskva/${gender}`}>{nbsp("Москва")}</Link>
          <Link href={`/almaty/${gender}`}>{nbsp("Алматы")}</Link>
        </div>

        <div className={styles.col}>
          <p className={styles.colLabel}>Разделы</p>
          <Link href={`${base}/do-posle`}>{nbsp("До и после")}</Link>
          <Link href={`${base}/ceny`}>{nbsp("Цены")}</Link>
          <Link href={`${base}/faq`}>{nbsp("Вопросы")}</Link>
          <Link href={`${base}/kontakty`}>{nbsp("Контакты")}</Link>
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
