import { redirect } from "next/navigation";

import { DEFAULT_GENDER } from "@/lib/gender";

// Bare /[city] has no gendered content — send to the default gender variant.
export function generateStaticParams() {
  return [{ city: "moskva" }, { city: "almaty" }];
}

export default async function CityIndex({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  redirect(`/${city}/${DEFAULT_GENDER}`);
}
