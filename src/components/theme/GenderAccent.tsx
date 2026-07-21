import { ReactNode } from "react";

/**
 * Gender-conditional copy accent. BOTH variants are server-rendered; the
 * inactive one is hidden purely via CSS (.g-male/.g-female in global.scss).
 * Crawler sees both phrases, switching gender does NOT re-render content —
 * SEO-safe personalization over static HTML.
 *
 * `inline` uses the inline variants so it can sit mid-sentence.
 */
export function GenderAccent({
  male,
  female,
  inline = false,
}: {
  male: ReactNode;
  female: ReactNode;
  inline?: boolean;
}) {
  const [m, f] = inline ? ["g-male-inline", "g-female-inline"] : ["g-male", "g-female"];
  return (
    <>
      <span className={m}>{male}</span>
      <span className={f}>{female}</span>
    </>
  );
}
