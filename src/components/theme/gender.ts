export type Gender = "male" | "female";

const COOKIE = "gender";
const MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export function readGender(): Gender | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|; )gender=(male|female)/);
  return (m?.[1] as Gender) ?? null;
}

export function currentGender(): Gender {
  if (typeof document === "undefined") return "male";
  const fromCookie = readGender();
  if (fromCookie) return fromCookie;
  const attr = document.documentElement.getAttribute("data-gender");
  return attr === "female" ? "female" : "male";
}

/** Событие смены пола — на него подписываются gender-aware компоненты (напр. галерея). */
export const GENDER_EVENT = "genderchange";

export function setGender(g: Gender): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-gender", g);
  document.cookie = `${COOKIE}=${g}; path=/; max-age=${MAX_AGE}; samesite=lax`;
  window.dispatchEvent(new CustomEvent<Gender>(GENDER_EVENT, { detail: g }));
  // Notify Yandex.Metrika if available (goal wiring lands in the conversion phase)
  const w = window as unknown as { ym?: (id: number, m: string, t: string) => void };
  try {
    w.ym?.(108411536, "reachGoal", g === "female" ? "gender_female" : "gender_male");
  } catch {
    /* no-op */
  }
}
