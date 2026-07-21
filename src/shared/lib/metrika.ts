/**
 * Yandex.Metrika integration — counter id + typed `reachGoal` wrapper.
 * Счётчик уже подключён в layout.tsx (id 108411536).
 */

export const YM_ID = Number(process.env.NEXT_PUBLIC_YM_ID) || 108411536;

/** All conversion goals fired from the UI. Keep in sync with Метрика dashboard. */
export const GOALS = {
  // открытие формы заявки
  openLeadForm: "open_lead_form",
  // успешные отправки
  submitLead: "submit_lead",
  submitPhoto: "submit_photo",
  // ошибка отправки (сеть/сервер)
  submitError: "submit_error",
  // клики по контактам
  clickPhone: "click_phone",
  clickTelegram: "click_telegram",
} as const;

export type Goal = (typeof GOALS)[keyof typeof GOALS];

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
  }
}

/** Fire a Метрика goal. No-op on the server or before the counter is ready. */
export function ymGoal(target: Goal | string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.ym !== "function" || !YM_ID) {
    return;
  }
  window.ym(YM_ID, "reachGoal", target, params);
}
