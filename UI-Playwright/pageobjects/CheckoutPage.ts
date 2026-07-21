import { Locator, Page, expect } from '@playwright/test';

export class CheckoutPage {

    constructor(readonly page: Page) { }

    private checkoutPageHeaderText = (): Locator => this.page.getByRole('heading', { name: 'Checkout',exact: true });
    private guestFullName = (): Locator => this.page.locator("[data-testid='guest-name-input']");
    private guestEmailAddress = (): Locator => this.page.locator("[data-testid='guest-email-input']");
    private guestPhoneNumber = (): Locator => this.page.locator("[data-testid='guest-phone-input']");
    private guestStreetAddress = (): Locator => this.page.locator("[data-testid='shipping-street-input']");
    private guestCity = (): Locator => this.page.locator("[data-testid='shipping-city-input']");
    private guestState = (): Locator => this.page.locator("[data-testid='shipping-state-select']");
    private guestZipCode = (): Locator => this.page.locator("[data-testid='shipping-zip-input']");
    private guestCountry = (): Locator => this.page.locator("[data-testid='shipping-country-input']");
    private continueToPayment = (): Locator => this.page.getByRole('button',{name:'Continue to Payment →'});

    async verifyCheckoutPageLoaded() {
        await expect(this.page.url()).toContain('/checkout');
        await expect(this.checkoutPageHeaderText()).toBeVisible();
    }

    async fillContactInformation(fullname: string,email: string,phoneNumber: string){
        await this.guestFullName().fill(fullname);
        await this.guestEmailAddress().fill(email);
        await this.guestPhoneNumber().fill(phoneNumber);
    }

    async fillShippingAddress(address: string,city: string,state: string,zipCode: string, country: string){
        await this.guestStreetAddress().fill(address);
        await this.guestCity().fill(city);
        await this.guestState().selectOption(state);
        await this.guestZipCode().fill(zipCode);
        await this.guestCountry().fill(country);
    }

    async clickContinueToPayment(){
        await this.continueToPayment().click();
    }


}