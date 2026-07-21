import { test, expect } from '../fixtures/retailFixtures';

test('Free shipping threshold validation - below threshold shows remaining amount', async ({ retailFlow, logger, evidence }) => {
  logger.info('Starting free shipping threshold validation test');
  await retailFlow.openShopAndAddProduct('prod-003');
  await retailFlow.cartPage.openCart();
  await retailFlow.cartPage.increaseQuantity('prod-003', 1);
  evidence.write('checkout', 'Added product and opened cart', 'free-shipping-below-threshold');
  await expect.soft(retailFlow.cartPage.page.getByText(/Add \$.* more for free shipping/i)).toBeVisible();
});

test('Free shipping threshold validation - shipping becomes FREE once threshold is reached', async ({ retailFlow, logger, evidence }) => {
  logger.info('Starting threshold reached validation test');
  await retailFlow.openShopAndAddProduct('prod-003');
  await retailFlow.cartPage.openCart();
  await retailFlow.cartPage.increaseQuantity('prod-003', 3);
  evidence.write('checkout', 'Increased quantity to reach shipping threshold', 'free-shipping-threshold-reached');
  await expect(retailFlow.cartPage.page.getByText(/You qualify for/)).toBeVisible();
});

test('Negative - free shipping message should not appear when cart is not near threshold', async ({ retailFlow, logger, evidence }) => {
  logger.info('Starting negative free shipping test');
  await retailFlow.openShopAndAddProduct('prod-003');
  await retailFlow.cartPage.openCart();
  evidence.write('checkout', 'Opened cart without increasing quantity', 'free-shipping-negative');
  await expect.soft(retailFlow.cartPage.page.getByText(/You qualify for/)).not.toBeVisible();
});