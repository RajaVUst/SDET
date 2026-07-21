
import {Page} from "@playwright/test"
import { BasePage } from "./BasePage"
import { config } from "../utils/env";

export class ProductPage extends BasePage{
    constructor(page: Page)
    {super(page)}

    private addToCartBtn = this.page.getByTestId("add-to-cart-detail");
    private buyBtn = this.page.getByTestId("buy-now-button")

   
}