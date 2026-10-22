"use client";

import { useSyncExternalStore } from "react";

/**
 * Согласие на аналитические cookie (Яндекс.Метрика, виджеты Яндекса).
 * Хранится в localStorage: "granted" | "denied". Старое значение "1"
 * (кнопка «Принять» до появления выбора) считается согласием.
 */
export type Consent = "granted" | "denied" | "unset";

const STORAGE_KEY = "cookie-consent";
const CONSENT_EVENT = "consentchange";

// Выбор в текущей вкладке — на случай, если localStorage недоступен.
let sessionChoice: Exclude<Consent, "unset"> | null = null;

export function readConsent(): Consent {
  if (sessionChoice) return sessionChoice;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "granted" || v === "1") return "granted";
    if (v === "denied") return "denied";
    return "unset";
  } catch {
    return "unset";
  }
}

export function setConsent(value: Exclude<Consent, "unset">): void {
  sessionChoice = value;
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* localStorage недоступен — выбор живёт до перезагрузки (sessionChoice) */
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Текущее согласие. На сервере и до гидрации — "pending", чтобы ничего не мигало. */
export function useConsent(): Consent | "pending" {
  return useSyncExternalStore<Consent | "pending">(subscribe, readConsent, () => "pending");
}
