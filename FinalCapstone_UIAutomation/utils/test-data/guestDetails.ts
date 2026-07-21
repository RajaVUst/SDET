export const guestDetails = {
  name: process.env.GUEST_NAME || 'Jane',
  email: process.env.GUEST_EMAIL || 'jane@example.com',
  phone: process.env.GUEST_PHONE || '9812345678',
  street: process.env.GUEST_STREET || '123 main street',
  city: process.env.GUEST_CITY || 'SpringField',
  state: process.env.GUEST_STATE || 'IN',
  zip: process.env.GUEST_ZIP || '34578',
  country: process.env.GUEST_COUNTRY || 'India',
};
