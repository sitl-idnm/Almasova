"use client";

import { useSyncExternalStore } from "react";

import { currentGender, GENDER_EVENT, type Gender } from "./gender";

function subscribe(onChange: () => void) {
  window.addEventListener(GENDER_EVENT, onChange);
  return () => window.removeEventListener(GENDER_EVENT, onChange);
}

/**
 * Реактивно отдаёт текущий пол и обновляется при переключении в шапке.
 * SSR отдаёт "male" (как data-gender по умолчанию), после гидрации
 * синхронизируется с cookie/атрибутом — без вспышки контента.
 */
export function useGender(): Gender {
  return useSyncExternalStore(subscribe, currentGender, () => "male");
}
