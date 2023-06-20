import { expect, test, describe, vi, beforeAll, afterAll } from 'vitest'
import { chromium, firefox, webkit } from "playwright";
import { spawn } from 'child_process';
import { resolve } from 'path';

const browserTypes = process.env.ALL_BROWSERS
    ? [chromium, firefox, webkit]
    : [chromium];


for (const browserType of browserTypes) {
    describe(`browser:${browserType.name()}`, () => {
        let browser;
        let server

        beforeAll(async () => {
            // start the server
            server = spawn('node', [resolve(__dirname, '../tasks/basic-server/server.js')]);

            // wait for the server to start
            await new Promise((resolve) => {
                server.stdout.on('data', (data) => {
                    console.log(data.toString());
                    if (data.toString().includes('Server started on port 3000')) {
                        resolve();
                    }
                });
            });

            browser = await browserType.launch({ headless: true });
        });

        afterAll(async () => {
            browser?.close();
            server?.kill();
        });

        test("index.html", async () => {
            const page = await browser.newPage();
            await page.goto(`http://localhost:3000/`);

            await page.waitForSelector("#counter");

            let counter = await page.evaluate(() => {
                return document.getElementById('counter').innerHTML;
            })

            expect(counter).toEqual('0');
        });

        test("increment", async () => {
            const page = await browser.newPage();
            await page.goto(`http://localhost:3000/`);

            await page.waitForSelector("#counter");

            await page.click('#increment');
            await page.waitForTimeout(100);

            const counter = await page.evaluate(() => {
                return document.getElementById('counter').innerHTML;
            })

            expect(counter).toEqual('1');
        });

        test("decrement", async () => {
            const page = await browser.newPage();
            await page.goto(`http://localhost:3000/`);

            await page.waitForSelector("#counter");

            await page.click('#decrement');
            await page.waitForTimeout(100);

            const counter = await page.evaluate(() => {
                return document.getElementById('counter').innerHTML;
            })

            expect(counter).toEqual('0');
        });
    });
}