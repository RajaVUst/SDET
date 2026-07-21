import { Locator, Page } from "@playwright/test";

export class xp {
    private constructor() {}
    static ShopNowButton(page: Page): Locator {
        return page.getByRole('link', { name: 'Shop Now' });
    }
    static AddToCartButton(page: Page, productId: string): Locator {
        return page.getByTestId(`add-to-cart-${productId}`);
    }
    static CartLink(page: Page): Locator {
        return page.getByTestId('cart-link');
    }
    static CheckoutButton(page: Page): Locator {
        return page.getByTestId('checkout-button');
    }
    static GuestNameInput(page: Page): Locator {
        return page.getByTestId('guest-name-input');
    }
    static GuestEmailInput(page: Page): Locator {
        return page.getByTestId('guest-email-input');
    }
    static GuestPhoneInput(page: Page): Locator {
        return page.getByTestId('guest-phone-input');
    }
    static ShippingStreetInput(page: Page): Locator {
        return page.getByTestId('shipping-street-input');
    }
    static ShippingCityInput(page: Page): Locator {
        return page.getByTestId('shipping-city-input');
    }
    static ShippingStateSelect(page: Page): Locator {
        return page.getByTestId('shipping-state-select');
    }
    static ShippingZipInput(page: Page): Locator {
        return page.getByTestId('shipping-zip-input');
    }
    static ShippingCountryInput(page: Page): Locator {
        return page.getByTestId('shipping-country-input');
    }
    static ContinueToPaymentButton(page: Page): Locator {
        return page.getByTestId('continue-to-payment-button');
    }
    static PaymentCardName(page: Page): Locator {
        return page.getByTestId('payment-card-name');
    }
    static PaymentCardNumber(page: Page): Locator {
        return page.getByTestId('payment-card-number');
    }
    static PaymentExpiry(page: Page): Locator {
        return page.getByTestId('payment-expiry');
    }
    static PaymentCvv(page: Page): Locator {
        return page.getByTestId('payment-cvv');
    }
    static PlaceOrderButton(page: Page): Locator {
        return page.getByTestId('place-order-button');
    }
    static PaymentGeneralError(page: Page): Locator {
        return page.getByTestId('payment-general-error');
    }
}