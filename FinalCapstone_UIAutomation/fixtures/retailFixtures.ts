import { test as base, expect } from '@playwright/test';
import { retailFlow } from '../flows/retailFlow';
import { LandingPage } from '../pages/LandingPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { Logger } from '../utils/logger';
import { EvidenceManager } from '../utils/evidence';

type RetailFixtures = {
  retailFlow: retailFlow;
  landingPage: LandingPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  logger: Logger;
  evidence: EvidenceManager;
};

export const test = base.extend<RetailFixtures>({
  retailFlow: async ({ page }, use) => {
    await use(new retailFlow(page));
  },
  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  logger: async ({}, use, testInfo) => {
    const logger = new Logger();
    logger.info('Test started', { title: testInfo.title });
    await use(logger);
    logger.info('Test finished', { status: testInfo.status });
    await logger.attachToTest(testInfo);
  },
  evidence: async ({}, use, testInfo) => {
    const evidence = new EvidenceManager();
    await use(evidence);
    await evidence.attachToTest(testInfo);
  },
});

export { expect };
