import AxeBuilder from "@axe-core/playwright";
import { Page } from "@playwright/test";

export class AccessibilityUtils {

    static async scan(page: Page) {

    const results = await new AxeBuilder({ page }).analyze();

    if (results.violations.length > 0) {

        console.log("Accessibility Violations");

        results.violations.forEach(v => {
            console.log(v.id);
            console.log(v.description);
        });
    }

    return results;
}

        }
        
