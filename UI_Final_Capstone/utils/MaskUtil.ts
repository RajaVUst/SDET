import { Locator, Page } from "@playwright/test";

export class MaskUtil {

    public static async getMaskedLocators(
        page: Page,
        additionalLocators: Locator[] = []
    ): Promise<Locator[]> {

        const defaultLocators: Locator[] = [

            page.locator("input[type='password']"),
            page.locator("[data-sensitive]"),
            page.locator("[data-mask]")

        ];

        return [...defaultLocators, ...additionalLocators];

    }

    public static sanitize(message: string): string {

        return message
            .replace(/Bearer\\s+\\S+/gi, "Bearer ******")
            .replace(/password=\\S+/gi, "password=******");

    }

    public static maskText(value: string): string {

        if (value.length <= 4) {
            return "****";
        }

        return `${value.substring(0, 2)}****${value.substring(value.length - 2)}`;

    }

}