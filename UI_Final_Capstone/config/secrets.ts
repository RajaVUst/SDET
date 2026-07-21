import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(process.cwd(), ".env"),
    quiet: true
});

const getNumber = (
    name: string,
    defaultValue: number
): number => {

    const value = Number(process.env[name] ?? defaultValue);

    if (Number.isNaN(value)) {
        throw new Error(`${name} must be a number.`);
    }

    return value;
};

export const ENV = {
    baseUrl:
        process.env.BASE_URL ??
        "https://chess-agent-83252463.figma.site/",

    demoUserId:
        process.env.DEMO_USER_ID ??
        "demo-login-user-003",

    headless:
        process.env.HEADLESS !== "false",

    timeout:
        getNumber("TIMEOUT", 90000)

} as const;