import { ReactNode } from "react";

import styles from "./Chip.module.scss";

/** Pill/chip — soft accent background, accent text (Chaika safety-chip). */
export function Chip({ children }: { children: ReactNode }) {
  return <span className={styles.chip}>{children}</span>;
}
