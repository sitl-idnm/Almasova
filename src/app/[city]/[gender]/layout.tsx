import { notFound } from "next/navigation";

import { GenderSync } from "@/components/theme/GenderSync";
import { genderMeta, isGenderSlug } from "@/lib/gender";

export default async function GenderLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ city: string; gender: string }>;
}) {
  const { gender } = await params;
  if (!isGenderSlug(gender)) notFound();

  return (
    <>
      <GenderSync theme={genderMeta[gender].theme} />
      {children}
    </>
  );
}
