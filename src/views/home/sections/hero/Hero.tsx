import { FC } from "react";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  CertificateIcon,
  ImagesIcon,
  PhoneIcon,
  StethoscopeIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/ui/Button/Button";
import { nbsp } from "@/shared/lib/typography";
import { defaultPhoneHref } from "@/lib/site-data";

import styles from "./Hero.module.scss";

type Tag = { icon: typeof PhoneIcon; label: string };

// Ordered shortest → longest, like Chaika.
const tags: Tag[] = [
  { icon: StethoscopeIcon, label: "Врач, а не тату-мастер" },
  { icon: CertificateIcon, label: "Медицинский подход" },
  { icon: ImagesIcon, label: "Зажившие работы спустя годы" },
];

export const Hero: FC = () => {
  return (
    <section className={styles.root}>
      {/* photo goes in .card background — see .module.scss (--hero-image) */}
      <div className={styles.card} data-slot="hero-photo">
        <div className={styles.inner}>
          <div className={styles.left}>
            <p className={styles.eyebrow}>Трихопигментация · камуфляж рубцов</p>
            <h1 className={styles.title}>
              {nbsp("Трихопигментация волос в Москве")}
            </h1>
            <p className={styles.subtitle}>
              {nbsp(
                "Визуально возвращаю густоту волос при залысинах, поредении и рубцах — без операции, аккуратно и естественно.",
              )}
            </p>

            <div className={styles.buttons}>
              <Button as="a" href={`tel:${defaultPhoneHref}`} variant="accent">
                <PhoneIcon size={18} weight="fill" />
                Позвонить
              </Button>
              <Button as={Link} href="#works" variant="light">
                Смотреть работы
                <ArrowUpRightIcon size={16} />
              </Button>
            </div>
          </div>

          <div className={styles.tags}>
            {tags.map(({ icon: Ic, label }) => (
              <span key={label} className={styles.tag}>
                <Ic size={20} weight="regular" />
                {nbsp(label)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
