import type { ProofItem } from "@/lib/site-data";
import { driveWorks } from "./works-drive.generated";

/**
 * Кейсы «до/после» тянутся ТОЛЬКО из папки Google Drive
 * (`npm run sync:gallery` → works-drive.generated.ts).
 * Кураторский локальный набор отключён по решению клиента — массив пуст.
 */
export const allWorks: ProofItem[] = [];

/** Источник галереи: Drive-набор (иначе — пусто). */
export const galleryWorks: ProofItem[] = driveWorks.length ? driveWorks : allWorks;

/** Кейсы для мужского варианта (+ универсальные). */
export const worksMale = galleryWorks.filter((w) => w.gender !== "female");
/** Кейсы для женского варианта (+ универсальные). */
export const worksFemale = galleryWorks.filter((w) => w.gender !== "male");
