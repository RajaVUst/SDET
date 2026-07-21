import { test as base, expect } from "@playwright/test";

export type Evidence = Record<string, unknown>;

export const test = base.extend<{
  evidence: Evidence;
}>({
  evidence: async ({}, use, testInfo) => {
    const evidence: Evidence = {};

    await use(evidence);

    for (const [name, value] of Object.entries(evidence)) {
      if (value == null) continue;

      if (Buffer.isBuffer(value)) {
        await testInfo.attach(name, {
          body: value,
          contentType: "image/png",
        });
        continue;
      }

      if (typeof value === "string") {
        await testInfo.attach(`${name}.txt`, {
          body: value,
          contentType: "text/plain",
        });
        continue;
      }

      await testInfo.attach(`${name}.json`, {
        body: JSON.stringify(value, null, 2),
        contentType: "application/json",
      });
    }
  },
});

export { expect };