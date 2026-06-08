"use server";

export async function validateDeletePassword(password: string) {
  const confirmPassword = process.env.DELETE_CONFIRM_PASSWORD;

  if (!confirmPassword || password !== confirmPassword) {
    return { error: "Onay şifresi hatalı." };
  }

  return { success: true };
}
