"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

import type { ProofItem } from "@/lib/site-data";

function preventHangingPrepositions(text: string): string {
  return text.replace(
    /(^|[\s(«"])([A-Za-zА-Яа-яЁё]{1,2})\s+(?=[A-Za-zА-Яа-яЁё0-9])/g,
    (_, prefix: string, word: string) => `${prefix}${word}\u00A0`,
  );
}

export function WorksGallery({ items }: { items: ProofItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeItem = items[activeIndex];
  const lightboxItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  const goPrev = () => {
    setActiveIndex((current) => (current === 0 ? items.length - 1 : current - 1));
  };

  const goNext = () => {
    setActiveIndex((current) => (current === items.length - 1 ? 0 : current + 1));
  };

  const goLightboxPrev = () => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return current === 0 ? items.length - 1 : current - 1;
    });
  };

  const goLightboxNext = () => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return current === items.length - 1 ? 0 : current + 1;
    });
  };

  return (
    <>
      <div className="surface overflow-hidden rounded-[2rem]">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
          <button
            type="button"
            className="group relative min-h-[360px] overflow-hidden bg-[var(--background-strong)] text-left sm:min-h-[460px]"
            onClick={() => setLightboxIndex(activeIndex)}
          >
            <Image
              src={activeItem.imageSrc}
              alt={activeItem.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 62vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent p-5 text-white">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                    {preventHangingPrepositions("Смотреть фото")}
                  </p>
                  <p className="mt-2 text-2xl leading-tight">
                    {preventHangingPrepositions(activeItem.title)}
                  </p>
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <Expand className="h-5 w-5" strokeWidth={1.8} />
                </span>
              </div>
            </div>
          </button>

          <div className="flex flex-col justify-between p-6 sm:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                {preventHangingPrepositions("До и после")}
              </p>
              <h3 className="mt-4 text-3xl leading-tight sm:text-4xl">
                {preventHangingPrepositions(activeItem.title)}
              </h3>
              <p className="mt-4 text-sm leading-8 text-[var(--muted)] sm:text-base">
                {preventHangingPrepositions(activeItem.details)}
              </p>
              <div className="mt-6 inline-flex rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                {preventHangingPrepositions(activeItem.sessions)}
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  {activeIndex + 1} / {items.length}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/75 text-[var(--foreground)] hover:bg-white"
                    aria-label="Предыдущая работа"
                  >
                    <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/75 text-[var(--foreground)] hover:bg-white"
                    aria-label="Следующая работа"
                  >
                    <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
                  </button>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-4 gap-3">
                {items.map((item, index) => (
                  <button
                    key={`${item.title}-${item.imageSrc}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`relative aspect-[0.9] overflow-hidden rounded-[1.2rem] border transition ${
                      index === activeIndex
                        ? "border-[var(--accent)] ring-2 ring-[var(--accent-soft)]"
                        : "border-[var(--line)] opacity-80 hover:opacity-100"
                    }`}
                    aria-label={preventHangingPrepositions(`Открыть работу: ${item.title}`)}
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 1024px) 22vw, 14vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightboxItem ? (
        <div className="fixed inset-0 z-50 bg-black/82 p-4 backdrop-blur-sm sm:p-8">
          <div className="mx-auto flex h-full max-w-6xl flex-col">
            <div className="mb-4 flex items-center justify-between gap-4 text-white">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                  {preventHangingPrepositions("Галерея работ")}
                </p>
                <p className="mt-2 text-2xl leading-tight">
                  {preventHangingPrepositions(lightboxItem.title)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/8"
                aria-label="Закрыть галерею"
              >
                <X className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </div>

            <div className="relative flex-1 overflow-hidden rounded-[2rem] bg-white/5">
              <Image
                src={lightboxItem.imageSrc}
                alt={lightboxItem.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />

              <button
                type="button"
                onClick={goLightboxPrev}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white"
                aria-label="Предыдущая работа"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
              </button>
              <button
                type="button"
                onClick={goLightboxNext}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white"
                aria-label="Следующая работа"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 text-white/82">
              <p className="max-w-3xl text-sm leading-7">
                {preventHangingPrepositions(lightboxItem.details)}
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                {lightboxIndex !== null ? lightboxIndex + 1 : 1} / {items.length}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
