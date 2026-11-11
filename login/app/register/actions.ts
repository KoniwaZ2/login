"use server";

import { randomBytes, scryptSync } from "node:crypto";
import { redirect } from "next/navigation";
import { prisma } from "../../src/db";

export type RegisterState = {
  error?: string;
  values?: { name: string; email: string; phone: string };
};

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export async function registerUser(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmation = String(formData.get("password_confirmation") ?? "");
  const values = { name, email, phone };

  if (!name || !email || !phone || !password) {
    return { error: "Semua kolom wajib diisi.", values };
  }
  if (password.length < 8) {
    return { error: "Password minimal 8 karakter.", values };
  }
  if (password !== confirmation) {
    return { error: "Konfirmasi password tidak cocok.", values };
  }

  let id: number;
  try {
    const user = await prisma.user.create({
      data: { name, email, phone, password: hashPassword(password) },
    });
    id = user.id;
  } catch (e) {
    if ((e as { code?: string }).code === "P2002") {
      return { error: "Email sudah terdaftar.", values };
    }
    throw e;
  }

  redirect(`/result?id=${id}`);
}
