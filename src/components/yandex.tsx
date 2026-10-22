"use client";

import { useState } from "react";
import { MapPinIcon } from "@phosphor-icons/react";

import { useConsent } from "@/shared/lib/consent";

import styles from "./yandex.module.scss";

/** Ссылка «открыть в Яндекс.Картах» для карты из конструктора (тот же um=constructor:…). */
function mapPageUrl(widgetSrc: string) {
  return widgetSrc.replace("/map-widget/v1/", "/maps/").replace("source=constructor", "source=constructorLink");
}

/**
 * Яндекс-карта организации. Виджет весит 2–4 МБ и занимает процессор на 2+ с,
 * поэтому до клика показываем лёгкую заглушку; iframe грузится по кнопке.
 * `fill` — растянуть по родителю (карточка контактов), иначе своя высота.
 */
export function YandexMap({
  src,
  address,
  fill = false,
}: {
  src: string;
  address?: string;
  fill?: boolean;
}) {
  const [active, setActive] = useState(false);

  return (
    <div className={`${styles.map} ${fill ? styles.mapFill : ""}`}>
      {active ? (
        <iframe
          className={styles.mapFrame}
          src={src}
          title="Алёна Алмасова на Яндекс.Картах"
          allowFullScreen
        />
      ) : (
        <div className={styles.mapStub}>
          <MapPinIcon size={32} weight="fill" className={styles.mapStubIcon} aria-hidden="true" />
          {address ? <p className={styles.mapStubAddress}>{address}</p> : null}
          <button type="button" className={styles.mapStubButton} onClick={() => setActive(true)}>
            Показать карту
          </button>
          <a href={mapPageUrl(src)} target="_blank" rel="noreferrer" className={styles.mapStubLink}>
            Открыть в Яндекс.Картах
          </a>
        </div>
      )}
    </div>
  );
}

const REVIEWS_URL = "https://yandex.ru/maps/org/permanentny_makiyazh/19842067924/";

/**
 * Виджет отзывов Яндекса для организации (Москва, oid 19842067924).
 * Iframe ставит cookie Яндекса, поэтому грузится после согласия на cookie
 * или по кнопке; до этого — ссылка на отзывы.
 */
export function YandexReviews() {
  const consent = useConsent();
  const [requested, setRequested] = useState(false);
  const show = requested || consent === "granted";

  return (
    <div className={`${styles.reviews} ${show ? "" : styles.reviewsIdle}`}>
      {show ? (
        <iframe
          className={styles.reviewsFrame}
          src="https://yandex.ru/maps-reviews-widget/19842067924?comments"
          title="Отзывы об Алёне Алмасовой на Яндекс.Картах"
          loading="lazy"
        />
      ) : (
        <div className={styles.mapStub}>
          <p className={styles.mapStubAddress}>Отзывы клиентов на Яндекс.Картах</p>
          <button type="button" className={styles.mapStubButton} onClick={() => setRequested(true)}>
            Показать отзывы
          </button>
        </div>
      )}
      <a href={REVIEWS_URL} target="_blank" rel="noreferrer" className={styles.reviewsLink}>
        Отзывы на Яндекс.Картах
      </a>
    </div>
  );
}
