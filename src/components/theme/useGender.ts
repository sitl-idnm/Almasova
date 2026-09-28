"use client";

import { useEffect, useState } from "react";

import { currentGender, GENDER_EVENT, type Gender } from "./gender";

/**
 * Реактивно отдаёт текущий пол и обновляется при переключении в шапке.
 * SSR отдаёт "male" (как data-gender по умолчанию), после гидрации
 * синхронизируется с cookie/атрибутом — без вспышки контента.
 */
export function useGender(): Gender {
  const [gender, setGenderState] = useState<Gender>("male");

  useEffect(() => {
    setGenderState(currentGender());
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<Gender>).detail;
      setGenderState(detail ?? currentGender());
    };
    window.addEventListener(GENDER_EVENT, onChange);
    return () => window.removeEventListener(GENDER_EVENT, onChange);
  }, []);

  return gender;
}
