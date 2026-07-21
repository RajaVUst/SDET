import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL || "https://chess-agent-83252463.figma.site/",
  email: process.env.EMAIL || "john.doe@example.com",
  phone: process.env.PHONE || "555-123-4567",
  cardNumber: process.env.CARD_NUMBER || "4111 1111 1111 1111",
  expiryDate: process.env.EXPIRY_DATE || "12/26",
  cvv: process.env.CVV || "123",
};
