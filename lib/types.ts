export type PaymentType = "download" | "ai_bullets";
export type DbPaymentType = "DOWNLOAD" | "AI_BULLETS";

export function toDbPaymentType(type: PaymentType): DbPaymentType {
  return type.toUpperCase() as DbPaymentType;
}

export function fromDbPaymentType(type: DbPaymentType): PaymentType {
  return type.toLowerCase() as PaymentType;
}
export function formatDate(dateString?: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
}
