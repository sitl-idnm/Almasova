import { FC } from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  TelegramLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

import { YandexReviews } from "@/components/yandex";
import { nbsp } from "@/shared/lib/typography";
import { CONTACTS } from "@/shared/const/contacts";

import styles from "./Trust.module.scss";

const chips = [
  "Врач, а не тату-мастер",
  "Сертифицированные пигменты",
  "Одноразовые расходники",
  "Медицинская чистота",
  "Честная оценка показаний",
  "Зажившие работы спустя годы",
];

const ChipGroup: FC<{ ariaHidden?: boolean }> = ({ ariaHidden }) => (
  <div className={styles.chipGroup} aria-hidden={ariaHidden}>
    {chips.map((chip) => (
      <span key={chip} className={styles.chip}>
        <CheckCircleIcon size={22} weight="fill" className={styles.chipIcon} />
        {nbsp(chip)}
      </span>
    ))}
  </div>
);

export const Trust: FC = () => {
  return (
    <section className={styles.root}>
      <div className={styles.wrap}>
        <h2 className={styles.title}>{nbsp("Почему мне доверяют")}</h2>

        <div className={styles.marquee}>
          <div className={styles.track}>
            <ChipGroup />
            <ChipGroup ariaHidden />
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>Записаться на консультацию</h3>
            <p className={styles.panelText}>
              {nbsp(
                "Первичная консультация бесплатна — оцениваю показания и рассказываю, чего реально ждать в вашем случае. Свяжитесь удобным способом:",
              )}
            </p>

            <div className={styles.actions}>
              <a className={styles.contactBtn} href={CONTACTS.phoneHref}>
                <PhoneIcon size={20} weight="fill" />
                Позвонить
              </a>
              <a
                className={styles.contactBtn}
                href={CONTACTS.telegram}
                target="_blank"
                rel="noreferrer"
              >
                <TelegramLogoIcon size={20} weight="fill" />
                Написать в Telegram
              </a>
            </div>

            <div className={styles.contactRow}>
              <MapPinIcon size={22} weight="regular" className={styles.rowIcon} />
              <span>{nbsp("Москва · приём по записи")}</span>
            </div>
            <div className={styles.contactRow}>
              <ClockIcon size={22} weight="regular" className={styles.rowIcon} />
              <span>{nbsp("Ежедневно, время согласуем по телефону")}</span>
            </div>
          </div>

          <div className={styles.reviews}>
            <YandexReviews />
          </div>
        </div>
      </div>
    </section>
  );
};
