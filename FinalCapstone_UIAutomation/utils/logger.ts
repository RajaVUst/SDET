import * as fs from 'fs';
import * as path from 'path';

export type LogEntry = {
  timestamp: string;
  message: string;
  meta?: Record<string, unknown>;
};

export class Logger {
  private readonly logDir: string;
  private readonly entries: LogEntry[] = [];

  constructor(logDir = 'test-results/logs') {
    this.logDir = logDir;
    fs.mkdirSync(this.logDir, { recursive: true });
  }

  info(message: string, meta?: Record<string, unknown>) {
    this.write('info', message, meta);
  }

  warn(message: string, meta?: Record<string, unknown>) {
    this.write('warn', message, meta);
  }

  error(message: string, meta?: Record<string, unknown>) {
    this.write('error', message, meta);
  }

  private write(level: string, message: string, meta?: Record<string, unknown>) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      message,
      meta,
    };
    this.entries.push(entry);
    const line = `[${level.toUpperCase()}] [${entry.timestamp}] ${message}${meta ? ` ${JSON.stringify(meta)}` : ''}\n`;
    fs.appendFileSync(path.join(this.logDir, 'test-log.log'), line, 'utf8');
  }

  getEntries() {
    return this.entries;
  }

  async attachToTest(testInfo: { attach: (name: string, options: { body: string | Buffer; contentType: string }) => Promise<void> }) {
    const logContent = this.entries
      .map((entry) => `[${entry.timestamp}] ${entry.message}${entry.meta ? ` ${JSON.stringify(entry.meta)}` : ''}`)
      .join('\n');

    if (logContent) {
      await testInfo.attach('test-log.txt', {
        body: Buffer.from(logContent, 'utf8'),
        contentType: 'text/plain',
      });
    }
  }
}
