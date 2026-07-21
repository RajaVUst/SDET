import fs from "fs";
import path from "path";
import type { TestInfo } from "@playwright/test";

const logDir = path.resolve(process.cwd(), "test-results", "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFilePath = path.join(logDir, "framework.log");
const logStream = fs.createWriteStream(logFilePath, { flags: "a" });
logStream.on("error", (error) => {
  console.error("Logger stream error:", error);
});

const formatMessage = (level: string, message: string) => {
  const timestamp = new Date().toISOString();
  return `${timestamp} [${level.toUpperCase()}] ${message}`;
};

const writeLog = (level: string, message: string) => {
  const formattedMessage = formatMessage(level, message);
  logStream.write(`${formattedMessage}\n`);
  if (level === "error") {
    console.error(formattedMessage);
  } else if (level === "warn") {
    console.warn(formattedMessage);
  } else {
    console.log(formattedMessage);
  }
};

let currentTestInfo: TestInfo | undefined;

export const setLoggerTestInfo = (testInfo?: TestInfo) => {
  currentTestInfo = testInfo;
};

const attachToReport = async (
  level: "info" | "warn" | "error",
  message: string,
) => {
  if (!currentTestInfo) return;

  await currentTestInfo.attach(`${level.toUpperCase()} log`, {
    body: formatMessage(level, message),
    contentType: "text/plain",
  });
};

export const logger = {
  info: (message: string) => {
    writeLog("info", message);
    void attachToReport("info", message);
  },
  warn: (message: string) => {
    writeLog("warn", message);
    void attachToReport("warn", message);
  },
  error: (message: string) => {
    writeLog("error", message);
    void attachToReport("error", message);
  },
};
