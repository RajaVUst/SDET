import { test as base , expect} from "./diagnostic.fixture";
import { redactForLog } from "../utils/logger";

export interface Evidence {

    inputs?: Record<string, unknown>;
    expected?: Record<string, unknown>;
    actual?: Record<string, unknown>;
    page?: {
        url?: string;
        title?: string;
    };
    additional?: Record<string, unknown>;
}

export const test = base.extend<{
    evidence: Evidence;
}>({
    evidence: async ({}, use, testInfo) => {
        const evidence: Evidence = {};
        await use(evidence);
        await testInfo.attach("Evidence", {
            body: JSON.stringify(redactForLog(evidence), null, 2),
            contentType: "application/json"
        });
    }
});

export { expect };