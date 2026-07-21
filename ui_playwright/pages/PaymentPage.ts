import { expect, Page } from "@playwright/test";

export class PaymentPage {
  constructor(private page: Page) {}

  async expectPaymentPageLoaded() {
    await expect(this.page).toHaveURL(/\/payment$/);
  }

  async fillPaymentDetails(details: {
    name: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
  }) {
    await this.page.getByTestId("payment-card-name").fill(details.name);
    await this.page.getByTestId("payment-card-number").fill(details.cardNumber);
    await this.page.getByTestId("payment-expiry").fill(details.expiry);
    await this.page.getByTestId("payment-cvv").fill(details.cvv);
  }

  async placeOrder() {
    await this.page.getByTestId("place-order-button").click();
  }

  async expectGeneralErrorVisible() {
    await expect(this.page.getByTestId("payment-general-error")).toBeVisible();
  }
}
