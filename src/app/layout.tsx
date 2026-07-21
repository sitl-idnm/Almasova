import type { Metadata } from "next";
import { Inter_Tight, Arsenal } from "next/font/google";
import Script from "next/script";
import { GenderOverlay } from "@/components/theme/GenderOverlay";
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
    default: "Алёна Алмасова — трихопигментация и медицинский камуфляж",
    template: "%s | Алёна Алмасова",
  },
  description:
    "Трихопигментация кожи головы и камуфляж рубцов у врача Алёны Алмасовой. Москва и Алматы.",
  openGraph: {
    title: "Алёна Алмасова — трихопигментация и медицинский камуфляж",
    description:
      "Трихопигментация кожи головы и камуфляж рубцов. Естественный результат, медицинский подход. Москва и Алматы.",
    url: "https://almasova.com",
    siteName: "Алёна Алмасова",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Алёна Алмасова — трихопигментация и медицинский камуфляж",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Алёна Алмасова — трихопигментация и медицинский камуфляж",
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
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108411536', 'ym');

            ym(108411536, 'init', {
              ssr: true,
              webvisor: true,
              clickmap: true,
              ecommerce: "dataLayer",
              referrer: document.referrer,
              url: location.href,
              accurateTrackBounce: true,
              trackLinks: true
            });
          `}
        </Script>
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://mc.yandex.ru/watch/108411536"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        {children}
        <GenderOverlay />
      </body>
    </html>
  );
}
