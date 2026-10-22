import { redirect } from "next/navigation";

import { DEFAULT_GENDER } from "@/lib/gender";

// Только известные города: /wp-admin и прочие адреса первого уровня — сразу 404,
// без промежуточного редиректа на /wp-admin/muzhchinam.
export const dynamicParams = false;

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
