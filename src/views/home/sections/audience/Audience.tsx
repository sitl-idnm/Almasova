import { FC } from "react";
import Image from "next/image";
import {
  CheckCircleIcon,
  GenderFemaleIcon,
  GenderMaleIcon,
  SyringeIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/ui/Button/Button";
import { nbsp } from "@/shared/lib/typography";
import { defaultPhoneHref } from "@/lib/site-data";

import styles from "./Audience.module.scss";

const pills = [
  { icon: GenderMaleIcon, label: "Мужчинам" },
  { icon: GenderFemaleIcon, label: "Женщинам" },
  { icon: SyringeIcon, label: "После пересадки" },
];

const list = [
  "Залысины и редеющая линия роста волос",
  "Поредение по пробору у женщин",
  "Просвечивающая макушка",
  "Рубцы после пересадки, травм и операций",
  "Хочется эффект плотной щетины без операции",
];

export const Audience: FC = () => {
  return (
    <section className={styles.root}>
      <div className={styles.wrap}>
        <div className={styles.left}>
          <h2 className={styles.title}>{nbsp("Кому подходит трихопигментация")}</h2>

          <div className={styles.tags}>
            {pills.map(({ icon: Ic, label }) => (
              <span key={label} className={styles.tag}>
                <Ic size={24} weight="regular" />
                {nbsp(label)}
              </span>
            ))}
          </div>

          <div className={styles.card}>
            <ul className={styles.list}>
              {list.map((item) => (
                <li key={item}>
                  <CheckCircleIcon size={24} weight="fill" className={styles.check} />
                  <span>{nbsp(item)}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button as="a" href={`tel:${defaultPhoneHref}`} variant="accent" block>
            Записаться на консультацию
          </Button>
        </div>

        <div className={styles.photo}>
          <div className={styles.ring} />
          <Image
            src="/images/alena.png"
            alt="Алёна Алмасова — врач, трихопигментация"
            width={640}
            height={640}
            className={styles.photoImg}
          />
        </div>
      </div>
    </section>
  );
};
