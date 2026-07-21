import { test, expect } from '../fixtures/retailFixtures';

test('Payment failure validation - declined card shows error and keeps user on payment page', async ({ retailFlow, logger, evidence }) => {
  logger.info('Starting payment failure validation test');
  await retailFlow.payWithInvalidCard('prod-001');
  evidence.write('payment', 'Attempted checkout with declined card', 'payment-failure-validation');
  await expect(retailFlow.checkoutPage.page.getByTestId('payment-general-error')).toBeVisible();
  await expect(retailFlow.checkoutPage.page).toHaveURL(/payment/i);
});

test('Negative - payment should not succeed with invalid card number', async ({ retailFlow, logger, evidence }) => {
  logger.info('Starting negative payment test');
  await retailFlow.payWithInvalidCard('prod-001');
  evidence.write('payment', 'Verified invalid card does not complete order', 'payment-failure-negative');
  await expect(retailFlow.checkoutPage.page.getByTestId('payment-general-error')).toBeVisible();
  await expect(retailFlow.checkoutPage.page.getByTestId('place-order-button')).toBeVisible();
});