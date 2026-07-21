import { ENV } from "./secrets";

export const config = {
    baseUrl: ENV.baseUrl,
    headless: ENV.headless,
    timeout: ENV.timeout,
    demoUserId: ENV.demoUserId
};