import { Page } from '@playwright/test';
import { xp } from '../locators/xp';
import { guestDetails } from '../utils/test-data/guestDetails';
import { paymentData } from '../utils/test-data/payment';

export class CheckoutPage {
  constructor(public readonly page: Page) {}

  async openCheckout() {
    await xp.CheckoutButton(this.page).click();
  }

  async fillGuestDetails() {
    await xp.GuestNameInput(this.page).fill(guestDetails.name);
    await xp.GuestEmailInput(this.page).fill(guestDetails.email);
    await xp.GuestPhoneInput(this.page).fill(guestDetails.phone);
    await xp.ShippingStreetInput(this.page).fill(guestDetails.street);
    await xp.ShippingCityInput(this.page).fill(guestDetails.city);
    await xp.ShippingStateSelect(this.page).selectOption(guestDetails.state);
    await xp.ShippingZipInput(this.page).fill(guestDetails.zip);
    await xp.ShippingCountryInput(this.page).fill(guestDetails.country);
  }

  async continueToPayment() {
    await xp.ContinueToPaymentButton(this.page).click();
  }

  async fillPaymentDetails(cardNumber: string) {
    await xp.PaymentCardName(this.page).fill(paymentData.cardName);
    await xp.PaymentCardNumber(this.page).fill(cardNumber);
    await xp.PaymentExpiry(this.page).fill(paymentData.expiry);
    await xp.PaymentCvv(this.page).fill(paymentData.cvv);
  }

  async placeOrder() {
    await xp.PlaceOrderButton(this.page).click();
  }

  async expectPaymentGeneralError() {
    await xp.PaymentGeneralError(this.page).waitFor({ state: 'visible' });
  }
}
