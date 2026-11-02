import { genderLead } from "@/content/gender-copy";
import { GenderAccent } from "./GenderAccent";

/** Вводный абзац героя: оба гендерных варианта в HTML, видимый — по теме. */
export function GenderLead({ page }: { page: string }) {
  const lead = (g: "muzhchinam" | "zhenshchinam") =>
    (genderLead[g][page] ?? genderLead[g].default).lead;
  return <GenderAccent inline male={lead("muzhchinam")} female={lead("zhenshchinam")} />;
}
