import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChatCircleDots,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";

import { aboutCopy } from "@/content/about-copy";
import {
  type CityContent,
  type ContactChannel,
  type ProofItem,
  specialistName,
} from "@/lib/site-data";
import styles from "./Misc.module.scss";

/** InlineFeatureList — de-neuralized: check + text rows, no shadow/gradient. */
export function InlineFeatureList({
  items,
}: {
  items: readonly string[];
  variant?: "default" | "compact" | "dense";
}) {
  return (
    <div className={styles.featureList}>
      {items.map((item) => (
        <div key={item} className={styles.feature}>
          <CheckCircle size={18} weight="fill" className={styles.featureIcon} />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

/** ProofGrid — proof cards (title / details / sessions). */
export function ProofGrid({ items }: { items: readonly ProofItem[] }) {
  return (
    <div className={styles.proofGrid}>
      {items.map((item) => (
        <article key={item.title} className={styles.proof}>
          <p className={styles.proofTitle}>{item.title}</p>
          <p className={styles.proofText}>{item.details}</p>
          <p className={styles.proofSessions}>{item.sessions}</p>
        </article>
      ))}
    </div>
  );
}

function ChannelBadge({ channel }: { channel: ContactChannel }) {
  if (channel.href) {
    return (
      <a href={channel.href} target="_blank" rel="noreferrer" className={styles.channel}>
        {channel.label}
      </a>
    );
  }
  return <span className={styles.channel}>{channel.label}</span>;
}

/** ContactCard — map panel + contact rows + phone CTA. Reserved lead slot. */
export function ContactCard({ city }: { city: CityContent }) {
  const rows = [
    { icon: Phone, label: "Телефон", value: city.phoneDisplay },
    { icon: MapPin, label: "Адрес", value: city.address },
    { icon: Clock, label: "График", value: city.workingHours },
  ];

  return (
    <div className={styles.contact}>
      <div className={styles.contactLeft}>
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

      <div className={styles.contactRight} data-slot="contacts-lead">
        {/* TODO(РКН): заменить блок на <LeadForm variant="lead" /> после регистрации. */}
        <a className={styles.contactCta} href={`tel:${city.phoneHref}`}>
          <Phone size={18} weight="fill" />
          Позвонить
        </a>

        {rows.map((row) => {
          const Ic = row.icon;
          return (
            <div key={row.label} className={styles.contactRow}>
              <span className={styles.contactIcon}>
                <Ic size={18} />
              </span>
              <div>
                <p className={styles.contactLabel}>{row.label}</p>
                <p className={styles.contactValue}>{row.value}</p>
              </div>
            </div>
          );
        })}

        <div className={styles.contactRow}>
          <span className={styles.contactIcon}>
            <ChatCircleDots size={18} />
          </span>
          <div>
            <p className={styles.contactLabel}>Каналы связи</p>
            <div className={styles.channels}>
              {city.contactChannels.map((channel) => (
                <ChannelBadge key={channel.label} channel={channel} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** AboutSpecialist — bio panel + photo + bullet list. */
export function AboutSpecialist() {
  const [lead, ...rest] = aboutCopy.paragraphs;

  return (
    <div className={styles.about}>
      <div className={styles.aboutCard}>
        <div className={styles.aboutMain}>
          <span className={styles.aboutBadge}>{specialistName}</span>
          <h3 className={styles.aboutTitle}>
            Врач и специалист по трихопигментации кожи головы
          </h3>
          <p className={styles.aboutLead}>{lead}</p>
          <div className={styles.aboutParas}>
            {rest.map((p) => (
              <p key={p}>{p}</p>
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
        {aboutCopy.bullets.map((item) => (
          <div key={item} className={styles.aboutBullet}>
            <CheckCircle size={20} weight="fill" className={styles.aboutBulletIcon} />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Breadcrumbs — semantic trail. */
export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav className={`container ${styles.breadcrumbs}`} aria-label="Хлебные крошки">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
            {index < items.length - 1 && <ArrowUpRight size={13} className={styles.crumbSep} />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
