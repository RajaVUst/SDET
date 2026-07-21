import {Page} from "@playwright/test";
import {HomePage} from "../pages/HomePage";
import { AppLogger } from "../utils/logger";
import { ProductsPage } from "../pages/ProductsPage";

export class SearchFlow {
    private readonly homePage: HomePage;
    private readonly productsPage: ProductsPage

    constructor(private readonly page: Page, private readonly log:AppLogger) {
        this.homePage = new HomePage(page);
        this.productsPage = new ProductsPage(page)
    }

    async search(product: string): Promise<void> {
        this.log.info("Navigating to home page");
        await this.homePage.open();
        this.log.info("Verifying home page");
        await this.homePage.verifyHomePage()
        this.log.info(`Searching for ${product}`)
        await this.homePage.searchProduct(product)
    }

    async resultsPage(product: string, expectedCount: number): Promise<void> {
        this.log.info("Opening Products page")
        await this.productsPage.verifyProductsPage(product, expectedCount)
        this.log.info("verified products page")
    }

    async applyFilter(filter: string, min: number, max?: number): Promise<void> {
        this.log.info("Applying filters")
        await this.productsPage.priceFilter(filter)
        this.log.info("Verifying filters")
        await this.productsPage.verifyFilter(min, max)
    }

    async clickAddToCartBtn(): Promise<void> {
        this.log.info("Adding product to cart")
        await this.productsPage.clickCart()
    }

    async gotoCartPage(): Promise<void> {
        this.log.info("Moving to cart Page")
        await this.productsPage.clickCartIcon()
    }
}