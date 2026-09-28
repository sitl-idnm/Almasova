"use client";

import { useEffect } from "react";

import { GENDER_EVENT, type Gender } from "./gender";

/**
 * On gendered URLs the theme is driven by the URL, not a cookie.
 * Sets data-gender for the current page and keeps the cookie in sync so the
 * bare "/" and non-gendered chrome match the last viewed gender.
 */
export function GenderSync({ theme }: { theme: Gender }) {
  useEffect(() => {
    if (document.documentElement.getAttribute("data-gender") !== theme) {
      document.documentElement.setAttribute("data-gender", theme);
      window.dispatchEvent(new CustomEvent<Gender>(GENDER_EVENT, { detail: theme }));
    }
    document.cookie = `gender=${theme}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  }, [theme]);

  return null;
}
