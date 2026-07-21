import { Locator, Page, expect } from '@playwright/test';

export class CategoryPage {

    constructor(readonly page: Page) { }

    private categories = (category: string): Locator => this.page.getByRole('button', { name: `${category}` });
    private clearAllFilters = () : Locator => this.page.getByRole('button',{name:'✕ Clear all filters'});

    async verifyCategoryPageLoaded() {
        await expect(this.page.url()).toContain('/?category');
        await expect(this.clearAllFilters()).toBeVisible();
    }

    async selectCategory(category: string){
        await this.categories(category).click();
    }



}