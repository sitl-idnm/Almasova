import type { Metadata } from "next";
import { Inter_Tight, Arsenal } from "next/font/google";
import { ClickGoals } from "@/components/analytics/ClickGoals";
import { Metrika } from "@/components/analytics/Metrika";
import { CookieBanner } from "@/components/cookie/CookieBanner";
import "../shared/styles/global.scss";

const fontUi = Inter_Tight({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

// Arsenal — reserved for the logotype and the hero title only (as in Chaika).
const fontAccent = Arsenal({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-arsenal",
  display: "swap",
});

// Anti-FOUC: apply the gender theme from cookie before first paint so
// toggling gender never causes a flash and pages stay statically rendered.
const genderInit = `(function(){try{var m=document.cookie.match(/(?:^|; )gender=(male|female)/);document.documentElement.setAttribute('data-gender',m?m[1]:'male');}catch(e){document.documentElement.setAttribute('data-gender','male');}})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://almasova.com"),
  title: {
    default: "Алёна Алмасова — трихопигментация и камуфляж рубцов",
    template: "%s | Алёна Алмасова",
  },
  description:
    "Трихопигментация кожи головы и камуфляж рубцов у специалиста Алёны Алмасовой. Москва и Алматы.",
  openGraph: {
    title: "Алёна Алмасова — трихопигментация и камуфляж рубцов",
    description:
      "Трихопигментация кожи головы и камуфляж рубцов. Естественный результат, профессиональный подход. Москва и Алматы.",
    url: "https://almasova.com",
    siteName: "Алёна Алмасова",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Алёна Алмасова — трихопигментация и камуфляж рубцов",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Алёна Алмасова — трихопигментация и камуфляж рубцов",
    description: "Трихопигментация кожи головы и камуфляж рубцов. Москва и Алматы.",
    images: ["/twitter-image"],
  },
  icons: {
    icon: "/icon",
    apple: "/icon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      data-gender="male"
      suppressHydrationWarning
      className={`${fontUi.variable} ${fontAccent.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: genderInit }} />
        <Metrika />
        {children}
        <ClickGoals />
        <CookieBanner />
      </body>
    </html>
  );
}
