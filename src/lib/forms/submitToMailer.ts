export type MailerFormType = "contact" | "newsletter" | "quote" | "partnership";

export async function submitToMailer(
  payload: Record<string, unknown> & { formType: MailerFormType },
): Promise<{ success: boolean; message?: string }> {
  const response = await fetch("/api/submit.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const raw = await response.text();
  let data: { success?: boolean; message?: string; error?: string } = {};
  try {
    data = raw ? (JSON.parse(raw) as typeof data) : {};
  } catch {
    throw new Error("Mail server is not running. In another terminal run: yarn php:api");
  }
  if (!response.ok || !data.success) {
    throw new Error(data.error ?? data.message ?? "Unable to send message.");
  }
  return { success: true, message: data.message };
}
