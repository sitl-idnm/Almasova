import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/marketing";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="container-shell not-found">
        <div className="panel">
          <span className="eyebrow">404</span>
          <h1 className="section-title">Такой страницы сейчас нет</h1>
          <p className="section-copy">
            Вернитесь на главную страницу или перейдите в один из городов, чтобы
            продолжить просмотр сайта.
          </p>
          <div className="not-found__actions">
            <Link className="button-primary" href="/">
              На главную
            </Link>
            <Link className="button-secondary" href="/moskva/muzhchinam">
              К странице Москвы
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
