import Image from "next/image";
import Link from "next/link";
import { ComponentType, ReactNode } from "react";
import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  ChatCircleIcon,
  ClockIcon,
  DropIcon,
  EyeIcon,
  GraduationCapIcon,
  ImagesIcon,
  MapPinIcon,
  PhoneIcon,
  ScissorsIcon,
  ShieldCheckIcon,
  SparkleIcon,
  TargetIcon,
  WalletIcon,
} from "@phosphor-icons/react/dist/ssr";

type IconCmp = ComponentType<{
  size?: number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
}>;

import { aboutCopy } from "@/content/about-copy";
import {
  ContactChannel,
  CityContent,
  FaqItem,
  PriceItem,
  ProofItem,
  ReviewItem,
  specialistName,
} from "@/lib/site-data";
import { nbsp } from "@/shared/lib/typography";
import { Hero } from "./sections/Hero/Hero";
import styles from "./marketing.module.scss";

export { SiteHeader } from "./layout/Header";
export { SiteFooter } from "./layout/Footer";

// Curated icon pools — variety without the old string-matching heuristic.
const FEATURE_ICONS: IconCmp[] = [CheckCircleIcon, SparkleIcon, ShieldCheckIcon, TargetIcon, EyeIcon, DropIcon];
const SERVICE_ICONS: IconCmp[] = [SparkleIcon, ScissorsIcon, WalletIcon, ImagesIcon, ShieldCheckIcon, GraduationCapIcon];
const ABOUT_ICONS: IconCmp[] = [GraduationCapIcon, TargetIcon, ShieldCheckIcon, SparkleIcon];

const pick = (pool: IconCmp[], i: number) => pool[i % pool.length];

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function ContactChannelBadge({ channel }: { channel: ContactChannel }) {
  if (channel.href) {
    return (
      <a href={channel.href} target="_blank" rel="noreferrer" className={styles.channel}>
        {channel.label}
      </a>
    );
  }
  return <span className={styles.channel}>{channel.label}</span>;
}

const HERO_TAGS: { icon: IconCmp; label: string }[] = [
  { icon: ShieldCheckIcon, label: "Врач, не тату-салон" },
  { icon: SparkleIcon, label: "Естественный результат" },
  { icon: DropIcon, label: "Без «синевы» и точек" },
  { icon: CheckCircleIcon, label: "Честная оценка" },
];

export function PageHero({
  eyebrow,
  title,
  subtitle,
  support,
  primaryHref,
  secondaryHref,
  secondaryLabel = "Посмотреть работы",
  cityCards,
  tags = HERO_TAGS,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  support?: string;
  primaryHref: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  cityCards?: { href: string; title: string; text: string }[];
  tags?: { icon: IconCmp; label: string }[];
}) {
  // Bridge: the monolith hero now delegates to the new de-neuralized Hero
  // section, so every page still importing PageHero gets the new look.
  return (
    <Hero
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      support={support}
      primaryHref={primaryHref}
      secondaryHref={secondaryHref}
      secondaryLabel={secondaryLabel}
      chips={tags}
      cityCards={cityCards}
    />
  );
}

export function Section({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className={`container ${styles.section}`}>
      {eyebrow ? <span className={styles.eyebrow}>{nbsp(eyebrow)}</span> : null}
      <h2 className={styles.sectionTitle}>{nbsp(title)}</h2>
      {description ? <p className={styles.sectionCopy}>{nbsp(description)}</p> : null}
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

export function TileGrid({ items }: { items: readonly string[] }) {
  return (
    <div className={styles.tileGrid}>
      {items.map((item, i) => {
        const Ic = pick(FEATURE_ICONS, i);
        return (
          <div key={item} className={styles.tile}>
            <span className={styles.iconBox}>
              <Ic size={20} />
            </span>
            <p>{nbsp(item)}</p>
          </div>
        );
      })}
    </div>
  );
}

export function InlineFeatureList({
  items,
  variant = "default",
}: {
  items: readonly string[];
  variant?: "default" | "compact" | "dense";
}) {
  return (
    <div className={styles.featureList} data-variant={variant}>
      {items.map((item, i) => {
        const Ic = pick(FEATURE_ICONS, i);
        return (
          <div key={item} className={styles.feature}>
            <span className={styles.iconBoxSm}>
              <Ic size={16} />
            </span>
            <span>{nbsp(item)}</span>
          </div>
        );
      })}
    </div>
  );
}

export function ProofGrid({ items }: { items: ProofItem[] }) {
  return (
    <div className={styles.proofGrid}>
      {items.map((item, i) => {
        const Ic = pick(SERVICE_ICONS, i);
        return (
          <article key={item.title} className={styles.proof}>
            <div className={styles.proofHead}>
              <span className={styles.proofIcon}>
                <Ic size={20} />
              </span>
              <p className={styles.proofTitle}>{nbsp(item.title)}</p>
            </div>
            <div className={styles.proofBody}>
              <p className={styles.proofText}>{nbsp(item.details)}</p>
              <p className={styles.proofSessions}>{nbsp(item.sessions)}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function ServiceGrid({
  services,
}: {
  services: { title: string; href: string; description: string }[];
}) {
  return (
    <div className={styles.serviceGrid}>
      {services.map((service, i) => {
        const Ic = pick(SERVICE_ICONS, i);
        return (
          <Link key={service.href} href={service.href} className={styles.service}>
            <span className={styles.iconBox}>
              <Ic size={20} />
            </span>
            <div className={styles.serviceRow}>
              <div>
                <h3 className={styles.serviceTitle}>{nbsp(service.title)}</h3>
                <p className={styles.serviceText}>{nbsp(service.description)}</p>
              </div>
              <span className={styles.serviceMore}>
                Подробнее <ArrowUpRightIcon size={16} />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function Steps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <div className={styles.steps}>
      {steps.map((step, index) => (
        <div key={step.title} className={styles.step}>
          <span className={styles.stepNum}>{index + 1}</span>
          <h3 className={styles.stepTitle}>{nbsp(step.title)}</h3>
          <p className={styles.stepText}>{nbsp(step.text)}</p>
        </div>
      ))}
    </div>
  );
}

export function PriceGrid({ items }: { items: PriceItem[] }) {
  return (
    <div className={styles.priceGrid}>
      {items.map((item) => (
        <div key={item.title} className={styles.price}>
          <span className={styles.iconBox}>
            <WalletIcon size={20} />
          </span>
          <p className={styles.priceTitle}>{nbsp(item.title)}</p>
          <p className={styles.priceValue}>{item.price}</p>
          <p className={styles.priceText}>{nbsp(item.description)}</p>
        </div>
      ))}
    </div>
  );
}

export function ReviewsGrid({ items }: { items: ReviewItem[] }) {
  const initials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? "")
      .join("");

  return (
    <div className={styles.reviewsGrid}>
      {items.map((item) => (
        <article key={`${item.name}-${item.label}`} className={styles.review}>
          <div className={styles.reviewHead}>
            <div className={styles.reviewAvatar}>
              {item.avatarSrc ? (
                <Image src={item.avatarSrc} alt={item.avatarAlt ?? item.name} fill sizes="56px" />
              ) : (
                <span>{initials(item.name)}</span>
              )}
            </div>
            <div>
              <p className={styles.reviewName}>{nbsp(item.name)}</p>
              <p className={styles.reviewLabel}>{nbsp(item.label)}</p>
            </div>
          </div>
          <p className={styles.reviewQuote}>«{nbsp(item.quote)}»</p>
        </article>
      ))}
    </div>
  );
}

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className={styles.faqList}>
      {items.map((item) => (
        <details key={item.question} className={styles.faq}>
          <summary className={styles.faqQ}>
            {nbsp(item.question)}
            <span className={styles.faqMark} aria-hidden="true" />
          </summary>
          <p className={styles.faqA}>{nbsp(item.answer)}</p>
        </details>
      ))}
    </div>
  );
}

export function ContactCard({ city }: { city: CityContent }) {
  const rows: { icon: IconCmp; label: string; value: ReactNode }[] = [
    { icon: PhoneIcon, label: "Телефон", value: nbsp(city.phoneDisplay) },
    {
      icon: ChatCircleIcon,
      label: "Каналы связи",
      value: (
        <div className={styles.contactChannels}>
          {city.contactChannels.map((channel) => (
            <ContactChannelBadge key={channel.label} channel={channel} />
          ))}
        </div>
      ),
    },
    { icon: MapPinIcon, label: "Адрес", value: nbsp(city.address) },
    { icon: ClockIcon, label: "График", value: nbsp(city.workingHours) },
  ];

  return (
    <div className={styles.contact}>
      <div className={styles.contactLeft}>
        <p className={styles.eyebrow}>{nbsp("Контакты")}</p>
        <h3 className={styles.contactTitle}>
          {nbsp("Основные каналы связи: телефон, Telegram и MAX")}
        </h3>
        <p className={styles.contactText}>
          {nbsp(
            "Быстрее всего понять, подойдёт ли процедура и сколько она может стоить, — по телефону. Дальше удобно продолжить в Telegram или MAX.",
          )}
        </p>
        <div className={styles.contactMap}>
          <iframe
            title={`Карта ${city.name}`}
            src={city.mapEmbedUrl}
            width="100%"
            height="100%"
            loading="lazy"
          />
        </div>
      </div>
      <div className={styles.contactRight}>
        <a className={styles.btnPrimary} href={`tel:${city.phoneHref}`}>
          <PhoneIcon size={18} weight="fill" />
          Позвонить
        </a>
        {rows.map((row) => {
          const Ic = row.icon;
          return (
            <div key={row.label} className={styles.contactRow}>
              <p className={styles.contactRowLabel}>{nbsp(row.label)}</p>
              <div className={styles.contactRowBody}>
                <span className={styles.iconBoxSm}>
                  <Ic size={18} />
                </span>
                <div className={styles.contactRowValue}>{row.value}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AboutSpecialist() {
  const [lead, ...rest] = aboutCopy.paragraphs;

  return (
    <div className={styles.about}>
      <div className={styles.aboutCard}>
        <div className={styles.aboutMain}>
          <span className={styles.aboutBadge}>{nbsp("Алёна Алмасова")}</span>
          <h3 className={styles.aboutTitle}>
            {nbsp("Врач и специалист по трихопигментации кожи головы")}
          </h3>
          <p className={styles.aboutLead}>{nbsp(lead)}</p>
          <div className={styles.aboutParas}>
            {rest.map((p) => (
              <p key={p}>{nbsp(p)}</p>
            ))}
          </div>
        </div>
        <div className={styles.aboutPhoto}>
          <Image
            src="/images/alena.png"
            alt={specialistName}
            width={760}
            height={1080}
            className={styles.aboutImg}
          />
        </div>
      </div>

      <div className={styles.aboutBullets}>
        {aboutCopy.bullets.map((item, i) => {
          const Ic = pick(ABOUT_ICONS, i);
          return (
            <div key={item} className={styles.aboutBullet}>
              <span className={styles.iconBox}>
                <Ic size={20} />
              </span>
              <p>{nbsp(item)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav className={`container ${styles.breadcrumbs}`} aria-label="Хлебные крошки">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.href ? (
              <Link href={item.href}>{nbsp(item.label)}</Link>
            ) : (
              <span>{nbsp(item.label)}</span>
            )}
            {index < items.length - 1 ? <span className={styles.crumbSep}>/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
