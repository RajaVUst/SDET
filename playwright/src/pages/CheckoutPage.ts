import { Locator, Page } from "@playwright/test";
import { expect } from "../fixtures/test.fixture";

export class CheckoutPage {

    readonly checkoutHeading: Locator;
    readonly name: Locator
    readonly email: Locator
    readonly phone: Locator
    readonly address: Locator
    readonly city: Locator
    readonly state: Locator
    readonly zipCode: Locator
    readonly continueBtn: Locator

    constructor(private readonly page: Page) {
        this.checkoutHeading = page.getByRole("heading", {name: "Checkout", exact: true})
        this.name = page.getByTestId("guest-name-input");
        this.email = page.getByTestId("guest-email-input");
        this.address = page.getByTestId("shipping-street-input");
        this.city = page.getByTestId("shipping-city-input");
        this.state = page.getByTestId("shipping-state-select");
        this.zipCode = page.getByTestId("shipping-zip-input");
        this.phone = page.getByTestId("guest-phone-input");
        this.continueBtn = page.getByTestId("continue-to-payment-button")
    }

    async verifyCheckoutPage(): Promise<void> {
        await expect(this.checkoutHeading).toBeVisible();
        await expect(this.continueBtn).toBeVisible();
    }

    async fillDetails(name: string, email: string, phone: string, address: string, city: string, state: string, zipCode: string): Promise<void> {
        await this.name.fill(name)
        await this.email.fill(email)
        await this.phone.fill(phone)
        await this.address.fill(address)
        await this.city.fill(city)
        await this.state.selectOption(state)
        await this.zipCode.fill(zipCode)
    }

    async clickContinue(): Promise<void>{
        await this.continueBtn.click();
    }
}