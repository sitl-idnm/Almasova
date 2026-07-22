import styles from "./yandex.module.scss";

/** Яндекс-карта организации. Адаптивная обёртка; src — виджет-конструктор из site-data. */
export function YandexMap({ src }: { src: string }) {
  return (
    <div className={styles.map}>
      <iframe
        className={styles.mapFrame}
        src={src}
        title="Алёна Алмасова на Яндекс.Картах"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

/** Виджет отзывов Яндекса для организации (Москва, oid 19842067924). */
export function YandexReviews() {
  return (
    <div className={styles.reviews}>
      <iframe
        className={styles.reviewsFrame}
        src="https://yandex.ru/maps-reviews-widget/19842067924?comments"
        title="Отзывы об Алёне Алмасовой на Яндекс.Картах"
        loading="lazy"
      />
      <a
        href="https://yandex.ru/maps/org/permanentny_makiyazh/19842067924/"
        target="_blank"
        rel="noreferrer"
        className={styles.reviewsLink}
      >
        Отзывы на Яндекс.Картах
      </a>
    </div>
  );
}
