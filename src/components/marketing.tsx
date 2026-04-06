import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import {
  CheckCircle2,
  CircleDollarSign,
  CircleHelp,
  Clock3,
  Eye,
  Fingerprint,
  Globe,
  GraduationCap,
  ImageIcon,
  MapPin,
  MessageCircle,
  Palette,
  Phone,
  Ruler,
  Scissors,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";

import { aboutCopy } from "@/content/about-copy";
import {
  ContactChannel,
  CityContent,
  FaqItem,
  PriceItem,
  ProofItem,
  ReviewItem,
  brandName,
  defaultContactChannels,
  specialistName,
} from "@/lib/site-data";

const ICON_MAP = {
  result: Sparkles,
  price: CircleDollarSign,
  location: MapPin,
  globe: Globe,
  reviews: MessageCircle,
  faq: CircleHelp,
  phone: Phone,
  trust: ShieldCheck,
  expert: GraduationCap,
  gallery: ImageIcon,
  process: Search,
  time: Clock3,
  scars: Scissors,
  color: Palette,
  length: Ruler,
  target: Target,
  skin: Fingerprint,
  visibility: Eye,
  check: CheckCircle2,
} satisfies Record<string, LucideIcon>;

function preventHangingPrepositions(text: string): string {
  return text.replace(
    /(^|[\s(«"])([A-Za-zА-Яа-яЁё]{1,2})\s+(?=[A-Za-zА-Яа-яЁё0-9])/g,
    (_, prefix: string, word: string) => `${prefix}${word}\u00A0`,
  );
}

function getSemanticIconCandidates(text: string): LucideIcon[] {
  const value = text.toLowerCase();
  const candidates: LucideIcon[] = [];

  const push = (...icons: LucideIcon[]) => {
    icons.forEach((icon) => {
      if (!candidates.includes(icon)) {
        candidates.push(icon);
      }
    });
  };

  if (value.includes("степень облысения")) {
    push(ICON_MAP.target, ICON_MAP.result, ICON_MAP.check);
  }

  if (value.includes("цвет волос") || value.includes("цвет кожи")) {
    push(ICON_MAP.color, ICON_MAP.result, ICON_MAP.check);
  }

  if (value.includes("контраст между волосами и кожей")) {
    push(ICON_MAP.visibility, ICON_MAP.result, ICON_MAP.check);
  }

  if (value.includes("длина стрижки") || value.includes("площадь зоны")) {
    push(ICON_MAP.length, ICON_MAP.target, ICON_MAP.check);
  }

  if (value.includes("индивидуальные особенности кожи")) {
    push(ICON_MAP.skin, ICON_MAP.trust, ICON_MAP.check);
  }

  if (value.includes("тип рубца")) {
    push(ICON_MAP.scars, ICON_MAP.trust, ICON_MAP.check);
  }

  if (value.includes("размер и форма зоны")) {
    push(ICON_MAP.length, ICON_MAP.target, ICON_MAP.check);
  }

  if (value.includes("состояние окружающей области")) {
    push(ICON_MAP.visibility, ICON_MAP.process, ICON_MAP.check);
  }

  if (value.includes("особенности заживления")) {
    push(ICON_MAP.time, ICON_MAP.trust, ICON_MAP.check);
  }

  if (value.includes("какой результат нужен")) {
    push(ICON_MAP.target, ICON_MAP.result, ICON_MAP.check);
  }

  if (value.includes("высшее медицинское образование")) {
    push(ICON_MAP.expert, ICON_MAP.trust, ICON_MAP.check);
  }

  if (value.includes("профессиональная консультация")) {
    push(ICON_MAP.reviews, ICON_MAP.process, ICON_MAP.check);
  }

  if (value.includes("медицинский камуфляж")) {
    push(ICON_MAP.trust, ICON_MAP.scars, ICON_MAP.check);
  }

  if (value.includes("тип задачи")) {
    push(ICON_MAP.process, ICON_MAP.result, ICON_MAP.scars, ICON_MAP.check);
  }

  if (value.includes("количество этапов")) {
    push(ICON_MAP.time, ICON_MAP.process, ICON_MAP.check);
  }

  if (value.includes("сложность")) {
    push(ICON_MAP.skin, ICON_MAP.process, ICON_MAP.check);
  }

  if (value.includes("москва")) {
    push(ICON_MAP.location, ICON_MAP.globe, ICON_MAP.check);
  }

  if (value.includes("алматы")) {
    push(ICON_MAP.globe, ICON_MAP.location, ICON_MAP.check);
  }

  if (
    value.includes("цен") ||
    value.includes("стоим") ||
    value.includes("бюджет") ||
    value.includes("прайс")
  ) {
    push(ICON_MAP.price, ICON_MAP.check);
  }

  if (
    value.includes("до и после") ||
    value.includes("фото") ||
    value.includes("работ") ||
    value.includes("кейс")
  ) {
    push(ICON_MAP.gallery, ICON_MAP.check);
  }

  if (
    value.includes("контакт") ||
    value.includes("запись") ||
    value.includes("телефон") ||
    value.includes("связ")
  ) {
    push(ICON_MAP.phone, ICON_MAP.reviews, ICON_MAP.check);
  }

  if (
    value.includes("отзыв") ||
    value.includes("страх") ||
    value.includes("впечат")
  ) {
    push(ICON_MAP.reviews, ICON_MAP.check);
  }

  if (value.includes("faq") || value.includes("вопрос")) {
    push(ICON_MAP.faq, ICON_MAP.check);
  }

  if (
    value.includes("медицин") ||
    value.includes("стериль") ||
    value.includes("безопас") ||
    value.includes("противопоказ")
  ) {
    push(ICON_MAP.trust, ICON_MAP.check);
  }

  if (
    value.includes("образован") ||
    value.includes("специалист") ||
    value.includes("эксперт")
  ) {
    push(ICON_MAP.expert, ICON_MAP.trust, ICON_MAP.check);
  }

  if (
    value.includes("оценк") ||
    value.includes("процесс") ||
    value.includes("этап") ||
    value.includes("разбор")
  ) {
    push(ICON_MAP.process, ICON_MAP.check);
  }

  if (
    value.includes("график") ||
    value.includes("заживлен") ||
    value.includes("срок") ||
    value.includes("коррекц")
  ) {
    push(ICON_MAP.time, ICON_MAP.check);
  }

  if (value.includes("рубц") || value.includes("шрам")) {
    push(ICON_MAP.scars, ICON_MAP.trust, ICON_MAP.check);
  }

  if (
    value.includes("волос") ||
    value.includes("залыс") ||
    value.includes("макуш") ||
    value.includes("густот") ||
    value.includes("результ")
  ) {
    push(ICON_MAP.result, ICON_MAP.target, ICON_MAP.check);
  }

  if (value.includes("кожа")) {
    push(ICON_MAP.skin, ICON_MAP.visibility, ICON_MAP.check);
  }

  if (candidates.length === 0) {
    push(ICON_MAP.check);
  }

  return candidates;
}

function getDistinctIconsForTexts(texts: readonly string[]): LucideIcon[] {
  const used = new Set<LucideIcon>();

  return texts.map((text) => {
    const candidates = getSemanticIconCandidates(text);
    const available = candidates.find((icon) => !used.has(icon));
    const selected = available ?? candidates[0] ?? ICON_MAP.check;
    used.add(selected);
    return selected;
  });
}

function ContactChannelBadge({
  channel,
  dark = false,
}: {
  channel: ContactChannel;
  dark?: boolean;
}) {
  const className = dark
    ? "rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/62 transition hover:border-white/30 hover:text-white"
    : "rounded-full border border-[var(--line)] bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]";

  if (channel.href) {
    return (
      <a
        href={channel.href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {channel.label}
      </a>
    );
  }

  return <span className={className}>{channel.label}</span>;
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SiteHeader({ city }: { city?: CityContent | null }) {
  const links = city
    ? [
        { href: `/${city.slug}/trihopigmentaciya`, label: "Трихопигментация" },
        {
          href: `/${city.slug}/kamuflyazh-rubcov-na-golove`,
          label: "Камуфляж рубцов",
        },
        { href: `/${city.slug}/ceny`, label: "Цены" },
        { href: `/${city.slug}/do-posle`, label: "До / после" },
        { href: `/${city.slug}/otzyvy`, label: "Отзывы" },
        { href: `/${city.slug}/faq`, label: "FAQ" },
        { href: `/${city.slug}/kontakty`, label: "Контакты" },
      ]
    : [
        { href: "/moskva", label: "Москва" },
        { href: "/almaty", label: "Алматы" },
        { href: "/moskva/trihopigmentaciya", label: "Трихопигментация" },
      ];

  const phoneHref = city?.phoneHref ?? "+79859907601";
  const phoneDisplay = city?.phoneDisplay ?? "+7 985 990 7601";

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(247,242,234,0.82)] backdrop-blur-xl">
      <div className="container-shell flex min-h-20 items-center justify-between gap-4">
        <Link href="/" className="max-w-[210px] text-sm font-semibold leading-5">
          <span className="block font-[family-name:var(--font-display)] text-lg leading-none">
            {preventHangingPrepositions(brandName)}
          </span>
          <span className="mt-1 block text-[var(--muted)]">
            {preventHangingPrepositions("Трихопигментация и медицинский камуфляж")}
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-[var(--muted)] xl:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[var(--foreground)]">
              {preventHangingPrepositions(link.label)}
            </Link>
          ))}
        </nav>

        <a className="button-primary whitespace-nowrap" href={`tel:${phoneHref}`}>
          Позвонить
          <span className="hidden pl-2 text-white/70 md:inline">{phoneDisplay}</span>
        </a>
      </div>
    </header>
  );
}

export function SiteFooter({ city }: { city?: CityContent | null }) {
  const phoneHref = city?.phoneHref ?? "+79859907601";
  const phoneDisplay = city?.phoneDisplay ?? "+7 985 990 7601";
  const contactChannels = city?.contactChannels ?? defaultContactChannels;

  return (
    <footer className="mt-24 border-t border-[var(--line)] bg-[rgba(33,27,23,0.95)] text-white">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <h3 className="text-2xl">{preventHangingPrepositions(specialistName)}</h3>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/68">
            {preventHangingPrepositions(
              "Я работаю с трихопигментацией кожи головы и медицинским камуфляжем, когда нужно скрыть залысины, редкую макушку или рубцы без неестественного эффекта.",
            )}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
            Города
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/78">
            <Link href="/moskva">{preventHangingPrepositions("Москва")}</Link>
            <Link href="/almaty">{preventHangingPrepositions("Алматы")}</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
            Связь
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/78">
            <a href={`tel:${phoneHref}`}>{phoneDisplay}</a>
            <p>{preventHangingPrepositions("Телефон, Telegram и онлайн-консультация")}</p>
            <Link href={city ? `/${city.slug}/kontakty` : "/moskva/kontakty"}>
              {preventHangingPrepositions("Контакты")}
            </Link>
            <Link href={city ? `/${city.slug}/faq` : "/moskva/faq"}>
              {preventHangingPrepositions("FAQ")}
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {contactChannels.map((channel) => (
              <ContactChannelBadge
                key={channel.label}
                channel={channel}
                dark
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  support,
  primaryHref,
  secondaryHref,
  secondaryLabel = "Посмотреть работы",
  cityCards,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  support?: string;
  primaryHref: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  cityCards?: { href: string; title: string; text: string }[];
}) {
  return (
    <section className="container-shell pt-12 sm:pt-16 lg:pt-20">
      <div className="surface-strong rich-gradient fine-grid relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-18">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow">{preventHangingPrepositions(eyebrow)}</span>
            <h1 className="max-w-4xl text-4xl leading-[1.02] sm:text-5xl lg:text-7xl">
              {preventHangingPrepositions(title)}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg">
              {preventHangingPrepositions(subtitle)}
            </p>
            {support ? (
              <p className="mt-5 max-w-2xl text-sm font-medium text-[var(--accent)] sm:text-base">
                {preventHangingPrepositions(support)}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="button-primary" href={primaryHref}>
                Позвонить
              </a>
              {secondaryHref ? (
                <Link className="button-secondary" href={secondaryHref}>
                  {preventHangingPrepositions(secondaryLabel)}
                </Link>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4">
            {cityCards?.length ? (
              cityCards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="surface rounded-[1.6rem] p-6 hover:-translate-y-0.5"
                >
                  <p className="text-2xl">{preventHangingPrepositions(card.title)}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    {preventHangingPrepositions(card.text)}
                  </p>
                </Link>
              ))
            ) : (
              <div className="surface rounded-[1.8rem] p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                  {preventHangingPrepositions("Что важно")}
                </p>
                <div className="mt-6">
                  <InlineFeatureList
                    variant="compact"
                    items={[
                      "Естественный результат без эффекта татуировки",
                      "Честная консультация перед процедурой",
                      "Залысины, макушка, рубцы",
                      "Запись по телефону",
                    ]}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
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
    <section className="container-shell mt-18 sm:mt-22">
      {eyebrow ? <span className="eyebrow">{preventHangingPrepositions(eyebrow)}</span> : null}
      <h2 className="section-title max-w-4xl">{preventHangingPrepositions(title)}</h2>
      {description ? (
        <p className="section-copy mt-5">{preventHangingPrepositions(description)}</p>
      ) : null}
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function TileGrid({ items }: { items: string[] }) {
  const icons = getDistinctIconsForTexts(items);

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={item}
          className="surface rounded-[1.4rem] px-5 py-5 text-sm leading-7 text-[var(--foreground)] sm:text-base"
        >
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
            {(() => {
              const Icon = icons[index];
              return <Icon className="h-5 w-5" strokeWidth={1.8} />;
            })()}
          </div>
          {preventHangingPrepositions(item)}
        </div>
      ))}
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
  const isCompact = variant === "compact";
  const isDense = variant === "dense";
  const icons = getDistinctIconsForTexts(items);

  return (
    <div
      className={
        isCompact
          ? "grid gap-2.5"
          : isDense
            ? "grid gap-3 sm:grid-cols-2"
            : "grid gap-3"
      }
    >
      {items.map((item, index) => (
        <div
          key={item}
          className={
            isCompact
              ? "flex items-start gap-3 rounded-[1.4rem] border border-[var(--line)] bg-white/65 px-3 py-3 text-[15px] leading-6 text-[var(--foreground)]"
              : isDense
                ? "flex items-center gap-3 rounded-[1.25rem] border border-[var(--line)] bg-white/65 px-3.5 py-3 text-sm leading-6 text-[var(--foreground)]"
                : "flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-white/65 px-4 py-3 text-sm leading-6 text-[var(--foreground)] sm:text-base"
          }
        >
          <div
            className={
              isCompact
                ? "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]"
                : isDense
                  ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]"
            }
          >
            {(() => {
              const Icon = icons[index];
              return <Icon className="h-4 w-4" strokeWidth={1.8} />;
            })()}
          </div>
          <span className={isCompact ? "max-w-[18rem]" : undefined}>
            {preventHangingPrepositions(item)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ProofGrid({ items }: { items: ProofItem[] }) {
  const icons = getDistinctIconsForTexts(items.map((item) => `${item.title} ${item.details}`));

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => (
        <article
          key={item.title}
          className="surface overflow-hidden rounded-[1.8rem]"
        >
          <div className="min-h-40 bg-[linear-gradient(135deg,rgba(90,54,33,0.96),rgba(142,94,59,0.78))] p-6 text-white">
            <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
              {(() => {
                const Icon = icons[index];
                return <Icon className="h-5 w-5" strokeWidth={1.8} />;
              })()}
            </div>
            <p className="text-2xl leading-tight">{preventHangingPrepositions(item.title)}</p>
          </div>
          <div className="p-6">
            <p className="text-sm leading-7 text-[var(--muted)]">
              {preventHangingPrepositions(item.details)}
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              {preventHangingPrepositions(item.sessions)}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ServiceGrid({
  services,
}: {
  services: { title: string; href: string; description: string }[];
}) {
  const icons = getDistinctIconsForTexts(
    services.map((service) => `${service.title} ${service.description}`),
  );

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {services.map((service, index) => (
        <Link
          key={service.href}
          href={service.href}
          className="surface rounded-[1.8rem] p-6 hover:-translate-y-0.5"
        >
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
            {(() => {
              const Icon = icons[index];
              return <Icon className="h-5 w-5" strokeWidth={1.8} />;
            })()}
          </div>
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3 className="text-3xl leading-tight">
                {preventHangingPrepositions(service.title)}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
                {preventHangingPrepositions(service.description)}
              </p>
            </div>
            <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              {preventHangingPrepositions("Подробнее")}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function Steps({
  steps,
}: {
  steps: { title: string; text: string }[];
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-4">
      {steps.map((step, index) => (
        <div key={step.title} className="surface rounded-[1.8rem] p-6">
          <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-semibold text-[var(--accent)]">
            {index + 1}
          </div>
          <h3 className="text-2xl leading-tight">{preventHangingPrepositions(step.title)}</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            {preventHangingPrepositions(step.text)}
          </p>
        </div>
      ))}
    </div>
  );
}

export function PriceGrid({ items }: { items: PriceItem[] }) {
  const icons = getDistinctIconsForTexts(items.map((item) => `${item.title} ${item.description}`));

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {items.map((item, index) => (
        <div key={item.title} className="surface rounded-[1.8rem] p-6">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
            {(() => {
              const Icon = icons[index];
              return <Icon className="h-5 w-5" strokeWidth={1.8} />;
            })()}
          </div>
          <p className="text-xl">{preventHangingPrepositions(item.title)}</p>
          <p className="mt-4 text-3xl font-semibold text-[var(--accent-strong)]">
            {item.price}
          </p>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            {preventHangingPrepositions(item.description)}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ReviewsGrid({ items }: { items: ReviewItem[] }) {
  const getInitials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={`${item.name}-${item.label}`}
          className="surface rounded-[1.8rem] p-6"
        >
          <div className="flex items-center gap-4">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--line)] bg-[linear-gradient(135deg,rgba(250,244,238,1),rgba(238,226,214,1))] text-sm font-semibold uppercase text-[var(--accent-strong)]">
              {item.avatarSrc ? (
                <Image
                  src={item.avatarSrc}
                  alt={item.avatarAlt ?? item.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              ) : (
                <span>{getInitials(item.name)}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-base font-semibold text-[var(--foreground)]">
                {preventHangingPrepositions(item.name)}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                {preventHangingPrepositions(item.label)}
              </p>
            </div>
          </div>
          <p className="mt-5 text-base leading-8 text-[var(--foreground)]">
            “{preventHangingPrepositions(item.quote)}”
          </p>
        </article>
      ))}
    </div>
  );
}

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <article key={item.question} className="surface rounded-[1.6rem] p-6">
          <h3 className="text-2xl leading-tight">
            {preventHangingPrepositions(item.question)}
          </h3>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--muted)]">
            {preventHangingPrepositions(item.answer)}
          </p>
        </article>
      ))}
    </div>
  );
}

export function ContactCard({ city }: { city: CityContent }) {
  return (
    <div className="surface rounded-[2rem] p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
        <div className="flex flex-col">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            {preventHangingPrepositions("Контакты")}
          </p>
          <h3 className="mt-4 text-3xl sm:text-4xl">
            {preventHangingPrepositions("Основные каналы связи: телефон, Telegram и MAX")}
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
            {preventHangingPrepositions(
              "Если хотите быстро понять, подойдет ли процедура, сколько она может стоить и чего ждать по результату, лучше всего начать с телефонного звонка. Дальше при необходимости удобно продолжить общение через Telegram или MAX.",
            )}
          </p>
          <div className="mt-6 flex-1 overflow-hidden rounded-[1.8rem] border border-[var(--line)] bg-white/65">
            <iframe
              title={`Карта ${city.name}`}
              src={city.mapEmbedUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              loading="lazy"
              className="block min-h-[260px] w-full lg:min-h-full"
            />
          </div>
        </div>
        <div className="grid gap-4">
          <a className="button-primary" href={`tel:${city.phoneHref}`}>
            Позвонить
          </a>
          <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/65 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              {preventHangingPrepositions("Телефон")}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Phone className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <p className="text-xl">{preventHangingPrepositions(city.phoneDisplay)}</p>
            </div>
          </div>
          <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/65 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              {preventHangingPrepositions("Каналы связи")}
            </p>
            <div className="mt-4 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <MessageCircle className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <div className="flex flex-wrap gap-2">
                {city.contactChannels.map((channel) => (
                  <ContactChannelBadge key={channel.label} channel={channel} />
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/65 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              {preventHangingPrepositions("Адрес")}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <MapPin className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <p className="text-sm leading-7 text-[var(--muted)]">
                {preventHangingPrepositions(city.address)}
              </p>
            </div>
          </div>
          <div className="rounded-[1.4rem] border border-[var(--line)] bg-white/65 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              {preventHangingPrepositions("График")}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Clock3 className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <p className="text-sm leading-7 text-[var(--muted)]">
                {preventHangingPrepositions(city.workingHours)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutSpecialist() {
  const icons = getDistinctIconsForTexts(aboutCopy.bullets);
  const [leadParagraph, ...detailParagraphs] = aboutCopy.paragraphs;

  return (
    <div className="space-y-3">
      <div className="surface overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-end lg:gap-10">
          <div className="max-w-[44rem]">
            <div className="inline-flex rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              {preventHangingPrepositions("Алёна Алмасова")}
            </div>
            <h3 className="mt-5 max-w-[32rem] text-3xl leading-tight sm:text-[2.3rem]">
              {preventHangingPrepositions("Врач и специалист по трихопигментации кожи головы")}
            </h3>
            <p className="mt-5 max-w-[41rem] text-base leading-8 text-[var(--foreground)] sm:text-[1.06rem]">
              {preventHangingPrepositions(leadParagraph)}
            </p>
            <div className="mt-6 space-y-4">
              {detailParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[42rem] text-sm leading-7 text-[var(--muted)] sm:text-[0.98rem]"
                >
                  {preventHangingPrepositions(paragraph)}
                </p>
              ))}
            </div>
          </div>

          <div className="relative flex min-h-[360px] items-end justify-center rounded-[1.8rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(250,244,238,0.95))] px-3 pt-8 sm:min-h-[420px] sm:px-4 lg:min-h-[520px] lg:justify-end lg:pr-0 lg:pl-8">
            <Image
              src="/images/alena.png"
              alt={specialistName}
              width={760}
              height={1080}
              className="h-auto w-[90%] max-w-[440px] object-contain sm:w-[86%] lg:w-[500px] lg:max-w-none"
              priority={false}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {aboutCopy.bullets.map((item, index) => {
          const Icon = icons[index];

          return (
            <div
              key={item}
              className="rounded-[1.5rem] border border-[var(--line)] bg-white/80 px-5 py-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <p className="pt-1 text-sm leading-6 text-[var(--foreground)] sm:text-[0.95rem]">
                  {preventHangingPrepositions(item)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { href?: string; label: string }[];
}) {
  return (
    <nav className="container-shell mt-8" aria-label="Breadcrumbs">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href}>{preventHangingPrepositions(item.label)}</Link>
            ) : (
              <span>{preventHangingPrepositions(item.label)}</span>
            )}
            {index < items.length - 1 ? <span>/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
