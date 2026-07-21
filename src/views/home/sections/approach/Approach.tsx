import { FC } from "react";
import { ChatCircleTextIcon } from "@phosphor-icons/react/dist/ssr";

import { nbsp } from "@/shared/lib/typography";

import styles from "./Approach.module.scss";

export const Approach: FC = () => {
  return (
    <section className={styles.root}>
      <div className={styles.wrap}>
        <div className={styles.inner}>
          <h2 className={styles.title}>
            {nbsp("Никакой «синевы» и эффекта татуировки")}
          </h2>

          <div className={styles.body}>
            <div className={styles.group}>
              <p>
                {nbsp(
                  "Главный страх перед процедурой — что зона станет синей и будет выглядеть как татуировка. Поэтому я работаю послойно: начинаю деликатно, оцениваю, как пигмент лёг и зажил, и только потом добираю плотность.",
                )}
              </p>
              <div className={styles.free}>
                <ChatCircleTextIcon size={30} weight="regular" className={styles.freeIcon} />
                <span>
                  Первичная консультация — <span className={styles.accent}>бесплатно</span>
                  {nbsp(", оцениваю показания честно")}
                </span>
              </div>
            </div>
            <p>
              {nbsp(
                "Подбираю оттенок под ваш цвет волос, а не «универсальный чёрный», и рассчитываю плотность так, чтобы зона читалась как своя щетина. Если по показаниям процедура вам не подходит — скажу об этом прямо.",
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
