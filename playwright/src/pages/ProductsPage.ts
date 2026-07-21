import { Locator, Page } from "@playwright/test";
import { expect } from "../fixtures/test.fixture";

export class ProductsPage {

    readonly results: Locator;
    readonly category: Locator
    readonly under25: Locator
    readonly productPrices: Locator
    readonly addToCart: Locator
    readonly cartCount: Locator

    constructor(private readonly page: Page) {
        this.results = page.getByTestId("search-results-heading")
        this.category = page.getByText("Category")
        this.under25 = page.getByText("Under $25")
        this.productPrices = page.locator("[data-testid^='product-price-']");
        this.addToCart = page.locator("[data-testid^='add-to-cart-']");
        this.cartCount = page.getByTestId("cart-count")
    }

    async verifyProductsPage(product: string, expectedCount: number): Promise<void> {
        await expect(this.page).toHaveURL(/search=/);
        if (expectedCount === 1) {
            await expect(this.results).toContainText(`1 result for "${product}"`)
        } else {
            await expect(this.results).toContainText(`${expectedCount} results for "${product}"`)
        }
        // await expect(this.results).toContainText(`${expectedCount} results for "${product}"`)
        await expect(this.category).toBeVisible()
    }

    async priceFilter(filter: string): Promise<void> {
    await this.page.getByTestId(`price-filter-${filter}`).click();
}

    async verifyFilter(min: number, max?: number): Promise<void> {
        const prices = await this.productPrices.allTextContents();
        const actualPrices = prices.map(price => Number(price.replace(/[$,]/g, "")));
        
        for (const price of actualPrices) {
            await expect(price).toBeGreaterThanOrEqual(min);
            if (max !== undefined) {
                await expect(price).toBeLessThanOrEqual(max);
            }
        }
    }

    async clickCart():Promise<void> {
        await this.addToCart.first().click()
        await this.cartCount.isVisible()
    }

    async clickCartIcon(): Promise<void> {
        await this.cartCount.click()
    }
}