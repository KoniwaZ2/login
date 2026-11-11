"use client";

import { useActionState } from "react";
import { registerUser, type RegisterState } from "./actions";

export default function RegisterPage() {
  const inputClass =
    "w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm outline-none transition focus:border-foreground dark:border-white/20";

  const [state, formAction, pending] = useActionState<RegisterState, FormData>(
    registerUser,
    {},
  );

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <form
        className="w-full max-w-sm space-y-5 rounded-2xl border border-black/10 p-6 shadow-sm dark:border-white/15"
        action={formAction}
      >
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Daftar</h1>
          <p className="text-sm opacity-60">Buat akun baru Anda.</p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            Nama
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            defaultValue={state.values?.name}
            placeholder="Nama lengkap"
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={state.values?.email}
            placeholder="nama@email.com"
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-sm font-medium">
            Nomor HP
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={state.values?.phone}
            placeholder="08123456789"
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="password_confirmation"
            className="text-sm font-medium"
          >
            Konfirmasi Password
          </label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            required
            className={inputClass}
          />
        </div>

        {state.error && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition hover:opacity-85 disabled:opacity-50"
        >
          {pending ? "Memproses..." : "Daftar"}
        </button>

        <a
          href="/login"
          className="block w-full rounded-lg border border-black/15 px-4 py-2.5 text-center text-sm font-medium transition hover:bg-black/[.04] dark:border-white/20 dark:hover:bg-white/[.06]"
        >
          Sudah punya akun? Masuk
        </a>
      </form>
    </main>
  );
}
