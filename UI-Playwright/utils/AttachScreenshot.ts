import { allure } from 'allure-playwright';
import { Page } from '@playwright/test';

export async function attachScreenshot(page:Page, name: string){
    await allure.attachment(name, await page.screenshot(), "image/png");
}