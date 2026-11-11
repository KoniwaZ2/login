"use client";

import { useActionState } from "react";
import { loginUser, type LoginState } from "./actions";

export default function LoginPage() {
  const inputClass =
    "w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm outline-none transition focus:border-foreground dark:border-white/20";

  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    loginUser,
    {},
  );

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <form
        className="w-full max-w-sm space-y-5 rounded-2xl border border-black/10 p-6 shadow-sm dark:border-white/15"
        action={formAction}
      >
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Masuk</h1>
          <p className="text-sm opacity-60">Masuk ke akun Anda.</p>
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
            placeholder="nama@email.com"
            defaultValue={state.email}
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
            autoComplete="current-password"
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
          {pending ? "Memproses..." : "Masuk"}
        </button>

        <p className="text-center text-sm opacity-60">
          Belum punya akun?{" "}
          <a href="/register" className="font-medium underline">
            Daftar
          </a>
        </p>
      </form>
    </main>
  );
}
