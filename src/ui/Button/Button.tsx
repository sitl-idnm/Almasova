import { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";

import styles from "./Button.module.scss";

export type ButtonVariant = "accent" | "soft" | "bordered" | "light";

type ButtonOwnProps<E extends ElementType> = {
  variant?: ButtonVariant;
  block?: boolean;
  as?: E;
  children: ReactNode;
  className?: string;
};

type ButtonProps<E extends ElementType> = ButtonOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof ButtonOwnProps<E>>;

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/** Polymorphic button (Chaika pattern): renders <button> by default, or any tag via `as`. */
export function Button<E extends ElementType = "button">({
  variant = "accent",
  block = false,
  as,
  children,
  className,
  ...props
}: ButtonProps<E>) {
  const Tag = (as ?? "button") as ElementType;

  return (
    <Tag
      className={cx(styles.root, styles[variant], block && styles.block, className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
