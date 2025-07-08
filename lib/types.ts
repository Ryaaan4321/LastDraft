export type PaymentType = "download" | "ai_bullets";
export type DbPaymentType = "DOWNLOAD" | "AI_BULLETS";

export function toDbPaymentType(type: PaymentType): DbPaymentType {
  return type.toUpperCase() as DbPaymentType;
}

export function fromDbPaymentType(type: DbPaymentType): PaymentType {
  return type.toLowerCase() as PaymentType;
}