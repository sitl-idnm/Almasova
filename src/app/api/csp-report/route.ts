/**
 * Приёмник отчётов Content-Security-Policy-Report-Only (см. next.config.ts).
 * Нарушения пишутся в лог сервера (Vercel → Logs), чтобы перед включением
 * строгой CSP увидеть, что она заблокировала бы. Тело обрезается.
 */
export async function POST(request: Request) {
  const body = (await request.text()).slice(0, 2000);
  console.warn("[csp-report]", body);
  return new Response(null, { status: 204 });
}
