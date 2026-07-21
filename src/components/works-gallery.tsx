"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowsOutIcon,
  CaretLeftIcon,
  CaretRightIcon,
  XIcon,
} from "@phosphor-icons/react";

import type { ProofItem } from "@/lib/site-data";
import { nbsp } from "@/shared/lib/typography";
import styles from "./works-gallery.module.scss";

export function WorksGallery({ items }: { items: ProofItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeItem = items[activeIndex];
  const lightboxItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  const goPrev = () =>
    setActiveIndex((c) => (c === 0 ? items.length - 1 : c - 1));
  const goNext = () =>
    setActiveIndex((c) => (c === items.length - 1 ? 0 : c + 1));

  const goLightboxPrev = () =>
    setLightboxIndex((c) => (c === null ? c : c === 0 ? items.length - 1 : c - 1));
  const goLightboxNext = () =>
    setLightboxIndex((c) => (c === null ? c : c === items.length - 1 ? 0 : c + 1));

  return (
    <>
      <div className={styles.gallery}>
        <button
          type="button"
          className={styles.stage}
          onClick={() => setLightboxIndex(activeIndex)}
        >
          <Image
            key={activeIndex}
            src={activeItem.imageSrc}
            alt={activeItem.alt}
            fill
            sizes="(max-width: 900px) 100vw, 62vw"
            className={styles.stageImg}
          />
          <div className={styles.stageOverlay}>
            <div>
              <p className={styles.stageKicker}>{nbsp("Смотреть фото")}</p>
              <p className={styles.stageTitle}>{nbsp(activeItem.title)}</p>
            </div>
            <span className={styles.stageExpand}>
              <ArrowsOutIcon size={20} weight="regular" />
            </span>
          </div>
        </button>

        <div className={styles.panel}>
          <div>
            <p className={styles.panelKicker}>До и после</p>
            <h3 className={styles.panelTitle}>{nbsp(activeItem.title)}</h3>
            <p className={styles.panelText}>{nbsp(activeItem.details)}</p>
            <span className={styles.panelBadge}>{nbsp(activeItem.sessions)}</span>
          </div>

          <div className={styles.panelFooter}>
            <div className={styles.panelNav}>
              <p className={styles.counter}>
                {activeIndex + 1} / {items.length}
              </p>
              <div className={styles.navBtns}>
                <button
                  type="button"
                  onClick={goPrev}
                  className={styles.navBtn}
                  aria-label="Предыдущая работа"
                >
                  <CaretLeftIcon size={20} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className={styles.navBtn}
                  aria-label="Следующая работа"
                >
                  <CaretRightIcon size={20} />
                </button>
              </div>
            </div>

            <div className={styles.thumbs}>
              {items.map((item, index) => (
                <button
                  key={`${item.title}-${item.imageSrc}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={styles.thumb}
                  data-active={index === activeIndex}
                  aria-label={nbsp(`Открыть работу: ${item.title}`)}
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 900px) 22vw, 14vw"
                    className={styles.thumbImg}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {lightboxItem ? (
        <div className={styles.lightbox}>
          <div className={styles.lightboxInner}>
            <div className={styles.lightboxHead}>
              <div>
                <p className={styles.lightboxKicker}>Галерея работ</p>
                <p className={styles.lightboxTitle}>{nbsp(lightboxItem.title)}</p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className={styles.lightboxClose}
                aria-label="Закрыть галерею"
              >
                <XIcon size={20} />
              </button>
            </div>

            <div className={styles.lightboxStage}>
              <Image
                src={lightboxItem.imageSrc}
                alt={lightboxItem.alt}
                fill
                sizes="100vw"
                className={styles.lightboxImg}
              />
              <button
                type="button"
                onClick={goLightboxPrev}
                className={`${styles.lightboxArrow} ${styles.arrowLeft}`}
                aria-label="Предыдущая работа"
              >
                <CaretLeftIcon size={20} />
              </button>
              <button
                type="button"
                onClick={goLightboxNext}
                className={`${styles.lightboxArrow} ${styles.arrowRight}`}
                aria-label="Следующая работа"
              >
                <CaretRightIcon size={20} />
              </button>
            </div>

            <div className={styles.lightboxFoot}>
              <p className={styles.lightboxDetails}>{nbsp(lightboxItem.details)}</p>
              <p className={styles.counter}>
                {(lightboxIndex ?? 0) + 1} / {items.length}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
