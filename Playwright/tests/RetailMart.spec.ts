import { test } from "../fixtures/pageFixture";
import { RemoveProductFlow } from "../flows/RemoveProductFlow";
import "../hooks/Hooks";

test("Remove Product Validation",async ({removeProductFlow}, testInfo) => {
    await removeProductFlow.removeProduct(testInfo);

});

test("Payment Validation", async ({buyProductFlow}, testInfo) => {
    await buyProductFlow.buyProduct(testInfo);
})

