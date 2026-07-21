import {Page} from "@playwright/test"
import { BasePage } from "./BasePage"
import { config } from "../utils/env";
import { expect } from "@playwright/test"

export class ConfirmationPage extends BasePage{
    constructor(page: Page)
    {super(page)}


    orderItem = this.page.getByText("ProSound Wireless Headphones");
    orderNo = this.page.getByTestId("order-number");
    confirmation = this.page.getByTestId("confirmation-heading");
    





    
}