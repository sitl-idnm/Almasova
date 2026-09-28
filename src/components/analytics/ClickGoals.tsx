"use client";

import { useEffect } from "react";

import { GOALS, ymGoal } from "@/shared/lib/metrika";

/**
 * Централизованный трекинг конверсий через делегирование кликов на document.
 * Ловит все ссылки `tel:` и Telegram (t.me / tg://) без правки каждой кнопки —
 * работает и для серверно-отрендеренных анкоров, и для будущих ссылок.
 */
export function ClickGoals() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        ymGoal(GOALS.clickPhone, { href });
      } else if (href.includes("t.me/") || href.startsWith("tg://")) {
        ymGoal(GOALS.clickTelegram, { href });
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
