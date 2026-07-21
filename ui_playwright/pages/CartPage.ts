import { expect, Page } from "@playwright/test";
import { config } from "../config";

export class CartPage {
  constructor(private page: Page) {}

  async navigateToCartPage() {
    await this.page.goto(config.baseUrl + "cart");
  }

  async expectCartPageLoaded() {
    await expect(this.page).toHaveURL(/\/cart$/);
  }

  async expectProductQuantity(expectedQuantity: number) {
    await expect(
      this.page.getByTestId("cart-qty-value-prod-001"),
    ).toContainText(String(expectedQuantity));
  }

  async clickCheckoutButton() {
    await this.page.getByTestId("checkout-button").click();
  }
}
