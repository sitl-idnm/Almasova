import { FC } from "react";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  EyeIcon,
  HandHeartIcon,
  ShieldCheckIcon,
  StethoscopeIcon,
  TimerIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/ui/Button/Button";
import { nbsp } from "@/shared/lib/typography";

import styles from "./Advantages.module.scss";

type Item = {
  icon: typeof EyeIcon;
  title: string;
  body: string;
  accent?: boolean;
};

const row1: Item[] = [
  {
    icon: StethoscopeIcon,
    title: "Врач, а не тату-мастер",
    body: "Оцениваю показания и противопоказания, вижу кожу как специалист — а не просто «набиваю» пигмент.",
    accent: true,
  },
  {
    icon: HandHeartIcon,
    title: "Честная оценка",
    body: "Если трихопигментация вам не подходит — скажу прямо и предложу альтернативу. Без лишних обещаний.",
  },
];

const row2: Item[] = [
  {
    icon: EyeIcon,
    title: "Без «синевы» и татуэффекта",
    body: "Подбираю оттенок и плотность под ваш цвет волос и кожи — зона читается как своя щетина.",
  },
  {
    icon: TimerIcon,
    title: "Зажившие работы спустя годы",
    body: "Показываю не только результат «сразу после», но и как выглядит зона через год-два.",
    accent: true,
  },
  {
    icon: ShieldCheckIcon,
    title: "Стерильность и пигменты",
    body: "Одноразовые расходники, сертифицированные пигменты, медицинская чистота на каждом этапе.",
  },
];

const Card: FC<{ item: Item }> = ({ item }) => {
  const Ic = item.icon;
  return (
    <div className={`${styles.card} ${item.accent ? styles.accent : styles.lite}`}>
      <div className={styles.head}>
        <Ic size={32} weight="regular" className={styles.icon} />
        <span className={styles.cardTitle}>{nbsp(item.title)}</span>
      </div>
      <p className={styles.body}>{nbsp(item.body)}</p>
    </div>
  );
};

export const Advantages: FC = () => {
  return (
    <section className={styles.root}>
      <div className={styles.wrap}>
        <h2 className={styles.title}>
          {nbsp("Почему ко мне идут за трихопигментацией")}
        </h2>

        <div className={styles.grid}>
          <div className={`${styles.gridRow} ${styles.rowTwo}`}>
            {row1.map((item) => (
              <Card key={item.title} item={item} />
            ))}
          </div>
          <div className={`${styles.gridRow} ${styles.rowThree}`}>
            {row2.map((item) => (
              <Card key={item.title} item={item} />
            ))}
          </div>
        </div>

        <Button
          as={Link}
          href="/moskva/trihopigmentaciya"
          variant="accent"
          className={styles.cta}
        >
          Как проходит процедура
          <ArrowUpRightIcon size={16} />
        </Button>
      </div>
    </section>
  );
};
