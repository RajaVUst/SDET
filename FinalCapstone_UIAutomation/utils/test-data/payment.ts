export const paymentData = {
  cardName: process.env.PAYMENT_CARD_NAME || 'Jane',
  cardNumber: process.env.PAYMENT_CARD_NUMBER || '4000 0000 0002',
  expiry: process.env.PAYMENT_EXPIRY || '12/30',
  cvv: process.env.PAYMENT_CVV || '432',
  declinedCardNumber: process.env.PAYMENT_DECLINED_CARD_NUMBER || '4000 0000 0000 0002',
};
