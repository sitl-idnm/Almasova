"use client";

import Script from "next/script";

import { useConsent } from "@/shared/lib/consent";
import { YM_ID } from "@/shared/lib/metrika";

/**
 * Яндекс.Метрика (Вебвизор, карта кликов). Загружается только после того,
 * как посетитель нажал «Принять» в баннере cookie: до согласия ни скрипт,
 * ни cookie Яндекса на устройство не попадают.
 */
export function Metrika() {
  const consent = useConsent();
  if (consent !== "granted") return null;

  return (
    <Script id="yandex-metrika" strategy="afterInteractive">
      {`
        (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}', 'ym');

        ym(${YM_ID}, 'init', {
          ssr: true,
          webvisor: true,
          clickmap: true,
          ecommerce: "dataLayer",
          referrer: document.referrer,
          url: location.href,
          accurateTrackBounce: true,
          trackLinks: true
        });
      `}
    </Script>
  );
}
