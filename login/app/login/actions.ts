"use server";

import { scryptSync, timingSafeEqual } from "node:crypto";
import { redirect } from "next/navigation";
import { prisma } from "../../src/db";

export type LoginState = {
  error?: string;
  email?: string;
};

// Hash palsu agar waktu respons sama saat email tidak ditemukan.
const DUMMY = `${"0".repeat(32)}:${"0".repeat(128)}`;

function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(password, salt, expected.length);
  return timingSafeEqual(actual, expected);
}

export async function loginUser(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi.", email };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  const valid = verifyPassword(password, user?.password ?? DUMMY);

  if (!user || !valid) {
    return { error: "Email atau password salah.", email };
  }

  redirect(`/result?id=${user.id}`);
}
