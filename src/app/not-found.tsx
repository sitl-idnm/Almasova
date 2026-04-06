import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/marketing";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="container-shell flex flex-1 items-center py-24">
        <div className="surface-strong w-full rounded-[2rem] p-8 sm:p-12">
          <span className="eyebrow">404</span>
          <h1 className="section-title max-w-3xl">Такой страницы сейчас нет</h1>
          <p className="section-copy mt-6">
            Вернитесь на главную страницу или перейдите в один из городов, чтобы
            продолжить просмотр сайта.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="button-primary" href="/">
              На главную
            </Link>
            <Link className="button-secondary" href="/moskva">
              К странице Москвы
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
