import * as fs from 'fs';
import * as path from 'path';

export type EvidenceEntry = {
  name: string;
  value: unknown;
};

export class EvidenceManager {
  private readonly evidenceDir: string;
  private readonly entries: EvidenceEntry[] = [];

  constructor(baseDir = 'test-results/evidence') {
    this.evidenceDir = baseDir;
    fs.mkdirSync(this.evidenceDir, { recursive: true });
  }

  add(name: string, value: unknown) {
    this.entries.push({ name, value });
  }

  async attachToTest(testInfo: { attach: (name: string, options: { body: string | Buffer; contentType: string }) => Promise<void> }) {
    for (const entry of this.entries) {
      const value = entry.value;
      if (value === undefined || value === null) {
        continue;
      }

      if (Buffer.isBuffer(value)) {
        await testInfo.attach(`${entry.name}.png`, {
          body: value,
          contentType: 'image/png',
        });
        continue;
      }

      await testInfo.attach(`${entry.name}.json`, {
        body: typeof value === 'string' ? JSON.stringify(value) : JSON.stringify(value, null, 2),
        contentType: 'application/json',
      });
    }
  }

  write(step: string, details: string, testName: string) {
    const fileName = `${testName.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.log`;
    const filePath = path.join(this.evidenceDir, fileName);
    const content = `[${new Date().toISOString()}] ${step}: ${details}\n`;
    fs.appendFileSync(filePath, content, 'utf8');
  }
}
