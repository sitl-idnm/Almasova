import { Fragment, type ReactNode } from "react";

/**
 * Знак ₽ (U+20BD) есть только в latin-ext подмножестве веб-шрифтов: ради одного
 * символа браузер качает лишний файл. Выводим ₽ системным шрифтом (класс .rub).
 */
export function withRub(text: string): ReactNode {
  if (!text.includes("₽")) return text;
  const parts = text.split("₽");
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <span className="rub">₽</span>}
    </Fragment>
  ));
}
