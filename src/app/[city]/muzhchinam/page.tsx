import { cityParams } from "@/lib/seo";
import { GenderHub, genderHubMetadata } from "@/views/gender-hub/GenderHub";

export const dynamicParams = false;

export function generateStaticParams() {
  return cityParams();
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  return genderHubMetadata(city, "muzhchinam");
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  return <GenderHub city={city} gender="muzhchinam" />;
}
