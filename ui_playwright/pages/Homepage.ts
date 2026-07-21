import { expect, Page } from "@playwright/test";
import { config } from "../config";

export class HomePage {
  constructor(private page: Page) {}

  async navigateToHomePage() {
    await this.page.goto(config.baseUrl);
  }

  async verifyHomePageLoaded() {
    await expect(this.page).toHaveURL(config.baseUrl);
  }

  async addProductToCart(productId: string) {
    await this.page.getByTestId(`add-to-cart-${productId}`).click();
  }

  async openCart() {
    await this.page.getByTestId("cart-link").click();
  }
}
