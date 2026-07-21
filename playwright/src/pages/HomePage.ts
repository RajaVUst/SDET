import { Locator, Page } from "@playwright/test";
import { expect } from "../fixtures/test.fixture";

export class HomePage {

    readonly banner: Locator;
    readonly searchBox: Locator
    readonly searchBtn: Locator

    constructor(private readonly page: Page) {
        this.banner = page.getByTestId("hero-banner")
        this.searchBox = page.getByTestId("search-input")
        this.searchBtn = page.getByTestId("search-button")
    }

    async open(): Promise<void> {
        await this.page.goto("/");
    }

    async verifyHomePage(): Promise<void> {
        // await expect(this.page).toHaveURL("/");
        await expect(this.searchBox).toBeVisible();
        await expect(this.banner).toBeVisible();
        await expect(this.searchBtn).toBeVisible()
    }

    async searchProduct(product: string): Promise<void>{
        await this.searchBox.fill(product);
        await this.searchBtn.click();
    }
}