import { FC } from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

import { WorksGallery } from "@/components/works-gallery";
import { allWorks } from "@/content/works";
import { Button } from "@/ui/Button/Button";
import { nbsp } from "@/shared/lib/typography";

import styles from "./Works.module.scss";

export const Works: FC = () => {
  return (
    <section className={styles.root} id="works">
      <div className={styles.wrap}>
        <div className={styles.head}>
          <div>
            <h2 className={styles.title}>{nbsp("Работы до и после")}</h2>
            <p className={styles.subtitle}>
              {nbsp(
                "Реальные случаи: залысины, макушка, пробор, зоны после пересадки и рубцы. Переключите пол в шапке — покажу релевантные работы.",
              )}
            </p>
          </div>
          <Button as={Link} href="/moskva/muzhchinam/do-posle" variant="bordered" className={styles.headCta}>
            Все работы
            <ArrowUpRightIcon size={16} />
          </Button>
        </div>

        <WorksGallery items={allWorks} />
      </div>
    </section>
  );
};
