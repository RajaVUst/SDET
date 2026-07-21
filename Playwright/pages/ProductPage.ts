
import {Page} from "@playwright/test"
import { BasePage } from "./BasePage"
import { config } from "../utils/env";

export class ProductPage extends BasePage{
    constructor(page: Page)
    {super(page)}

    private removeBtn = this.page.getByRole("button",{name:"Remove"});
    emptyCartHeader = this.page.getByRole("heading",{name:"Your cart is empty"});
    async remove(){
        await this.removeBtn.first().click();
    }

   
}