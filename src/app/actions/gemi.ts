"use server";

const DEFAULT_DELETE_PASSWORD = "Asas15*";

export async function validateDeletePassword(password: string) {
  const confirmPassword = (
    process.env.DELETE_CONFIRM_PASSWORD ?? DEFAULT_DELETE_PASSWORD
  ).trim();

  if (password.trim() !== confirmPassword) {
    return { error: "Onay şifresi hatalı." };
  }

  return { success: true };
}
