
import {Page} from "@playwright/test"
import { BasePage } from "./BasePage"
import { config } from "../utils/env";

export class CheckoutPage extends BasePage{
    constructor(page: Page)
    {super(page)}

    contactForm = this.page.getByTestId("guest-info-form");
    addressForm = this.page.getByTestId("shipping-address-form");
    private nameInput = this.page.getByTestId("guest-name-input");
    private emailInput = this.page.getByTestId("guest-email-input");
    private phoneInput = this.page.getByTestId("guest-phone-input");
    private streetInput = this.page.getByTestId("shipping-street-input");
    private cityInput = this.page.getByTestId("shipping-city-input");
    private stateSelect = this.page.getByTestId("shipping-state-select");
    private zipInput = this.page.getByTestId("shipping-zip-input");
    private countryInput = this.page.getByTestId("shipping-country-input");
    private paymentBtn = this.page.getByRole("button", {name:"Continue to Payment →"});

    async fillContactInfo(name: string, email: string, phone: string){
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.phoneInput.fill(phone);
    }

    async fillAddressInfo(street: string, city: string, state: string, zip: string, country: string){
        await this.streetInput.fill(street);
        await this.cityInput.fill(city);
        await this.stateSelect.selectOption(state);
        await this.zipInput.fill(zip);
        await this.countryInput.fill(country);
    }

    async continueToPayment(){
        await this.paymentBtn.click();
    }
    


}