import winston from "winston";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

interface LogOptions {
    page: string;
    step: string;
    message: string;
}

class Logger {

    private correlationId = "";
    private testId = "";

    private readonly logger: winston.Logger;

    constructor() {

        const logFile = path.resolve("test-results/logs/framework.log");
        fs.mkdirSync(path.dirname(logFile), { recursive: true });

        this.logger = winston.createLogger({

            level: "info",

            format: winston.format.combine(

                winston.format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss"
                }),

                winston.format.printf(
                    ({ timestamp, level, message }) => {

                        return `${timestamp} | ${level.toUpperCase()} | ${this.testId} | ${this.correlationId} | ${message}`;

                    }
                )

            ),

            transports: [

                new winston.transports.Console(),

                new winston.transports.File({
                    filename: logFile
                })

            ]

        });

    }

    public initialize(): void {

        this.correlationId = randomUUID()
            .substring(0, 8)
            .toUpperCase();

        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 900 + 100);

        this.testId = `TEST-${timestamp}-${random}`;

    }

    public info(options: LogOptions): void {

        this.logger.info(
            `[${options.page}] [${options.step}] ${options.message}`
        );

    }

    public warn(options: LogOptions): void {

        this.logger.warn(
            `[${options.page}] [${options.step}] ${options.message}`
        );

    }

    public error(options: LogOptions): void {

        this.logger.error(
            `[${options.page}] [${options.step}] ${options.message}`
        );

    }

    public debug(options: LogOptions): void {

        this.logger.debug(
            `[${options.page}] [${options.step}] ${options.message}`
        );

    }

    public getTestId(): string {

        return this.testId;

    }

    public getCorrelationId(): string {

        return this.correlationId;

    }

}

export const logger = new Logger();
