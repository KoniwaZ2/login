import { Suspense } from "react";
import { notFound } from "next/navigation";
import { prisma } from "../../src/db";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

async function ResultCard({ searchParams }: { searchParams: SearchParams }) {
  const { id } = await searchParams;
  const userId = Number(Array.isArray(id) ? id[0] : id);
  if (!Number.isInteger(userId)) notFound();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true, phone: true, createdAt: true },
  });
  if (!user) notFound();

  const rows = [
    { label: "Nama", value: user.name },
    { label: "Email", value: user.email },
    { label: "Nomor HP", value: user.phone },
    {
      label: "Terdaftar",
      value: user.createdAt.toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    },
  ];

  return (
    <dl className="divide-y divide-black/10 dark:divide-white/15">
      {rows.map(({ label, value }) => (
        <div key={label} className="flex justify-between gap-4 py-3 text-sm">
          <dt className="opacity-60">{label}</dt>
          <dd className="break-all text-right font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function ResultPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-sm space-y-4 rounded-2xl border border-black/10 p-6 shadow-sm dark:border-white/15">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Data Pendaftaran</h1>
          <p className="text-sm opacity-60">Data yang Anda daftarkan.</p>
        </div>

        <Suspense
          fallback={<p className="py-3 text-sm opacity-60">Memuat...</p>}
        >
          <ResultCard searchParams={searchParams} />
        </Suspense>

        <a
          href="/register"
          className="block w-full rounded-lg border border-black/15 px-4 py-2.5 text-center text-sm font-medium transition hover:bg-black/[.04] dark:border-white/20 dark:hover:bg-white/[.06]"
        >
          Kembali ke pendaftaran
        </a>
      </section>
    </main>
  );
}
