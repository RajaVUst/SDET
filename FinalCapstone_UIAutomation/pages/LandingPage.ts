import { Page } from "@playwright/test";
import { xp } from "../locators/xp";

export class LandingPage {
    constructor(public readonly page: Page) {}

    async openHomePage() {
        await this.page.goto('https://chess-agent-83252463.figma.site/');
    }

    async navigateToShop() {
        await this.openHomePage();
        await xp.ShopNowButton(this.page).click();
    }
}