import {test} from "../src/fixtures/test.fixture"
import {Details} from "../src/test-data/details.json"
import {Card} from "../src/test-data/card.json"
import { ENV } from "../src/config/env"

test("Payment error validation", async ({ search, payment, evidence, page }, testInfo) => {
    await search.search("Laptop")
    await search.resultsPage("Laptop", 2)
    await search.clickAddToCartBtn()
    await search.gotoCartPage()
    await payment.movingToCheckout()
    await payment.movingToPayment(Details.name, Details.email, Details.phone, Details.address, Details.city, Details.state, Details.code)
    await payment.paymentStatus(Card.name, ENV.cardNumber, ENV.cardExpiry, ENV.cardCvv)
})