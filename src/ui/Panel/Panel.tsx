import { ReactNode } from "react";

import styles from "./Panel.module.scss";

type PanelProps = {
  /** `surface` — plain card; `block` — accent-filled color block (Chaika hammock). */
  tone?: "surface" | "block";
  className?: string;
  children: ReactNode;
};

/**
 * Panel — the core "de-neuralized" container. No drop shadow: a card is just a
 * background + a 1px inset line (Chaika restraint). `block` = accent color block.
 */
export function Panel({ tone = "surface", className, children }: PanelProps) {
  const cls = [styles.panel, styles[tone], className].filter(Boolean).join(" ");
  return <div className={cls}>{children}</div>;
}
