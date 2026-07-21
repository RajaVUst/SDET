import fs from "fs";
import path from "path";

export class TestData {

    static get(fileName: string) {

        const filePath = path.resolve(
            process.cwd(),
            "test-data",
            `${fileName}.json`
        );

        return JSON.parse(
            fs.readFileSync(filePath, "utf-8")
        );
    }
}