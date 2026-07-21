import {test} from "../src/fixtures/test.fixture"

import searchjson from "../src/test-data/search.json"

import { getMaskedLocators } from "../src/utils/mask"

test("Searching for product and applying filter", async ({ search, evidence, page }, testInfo) => {

    // evidence.inputs = {
    //     login: {
    //         email: login.validUser.email,
    //         password: login.validUser.password
    //     },
    //     journey: {
    //         from: search.validSearch.from,
    //         to: search.validSearch.to,
    //         date: search.validSearch.journeyDate
    //     },  
    //     // passenger: passenger.passenger,  payment: payment.card
    // };

    // evidence.expected = {  bookingStatus: "Confirmed"  };

    // await order.login(login.validUser.email, login.validUser.password
    // );

    // await testInfo.attach("After Login (Masked)", {
    //     body: await page.screenshot({
    //         mask: await getMaskedLocators(page)
    //     }),
    //     contentType: "image/png"
    // });


    await search.search(searchjson.validSearch.product)
    await search.resultsPage(searchjson.validSearch.product, 2)
    await search.applyFilter("4", searchjson.validSearch.filter.minPrice)
    await search.resultsPage(searchjson.validSearch.product, 1)
});















































// const prices = await page
//   .locator("//div[@class='Nx9bqj']")
//   .allTextContents();
 
// const actualPrices = prices.map(price =>
//   Number(price.replace(/[₹,]/g, ""))
// );
 
// const expectedPrices = [...actualPrices].sort((a, b) => a - b);
 
// expect(actualPrices).toEqual(expectedPrices);