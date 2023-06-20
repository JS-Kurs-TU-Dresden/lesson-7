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
            server = spawn('node', [resolve(__dirname, '../tasks/crud/server.js')]);

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

            await page.waitForSelector("main");

            let childCount = await page.evaluate(() => {
                return document.getElementById('tweets').children.length;
            })

            expect(childCount).toEqual(0);
        });

        test("add tweet", async () => {
            const page = await browser.newPage();
            await page.goto(`http://localhost:3000/`);

            await page.waitForSelector("main");

            await page.fill('#new-tweet-text', 'Hello World');
            await page.click('#post-tweet');

            await page.waitForTimeout(100);

            let childCount = await page.evaluate(() => {
                return document.getElementById('tweets').children.length;
            })

            expect(childCount).toEqual(1);

            let tweetText = await page.evaluate(() => {
                return document.getElementById('tweets').children[0].querySelector('p').innerHTML;
            })

            expect(tweetText).not.toEqual('Hello World');
            expect(tweetText.toLowerCase()).toEqual('hello world');
        })

        test("persist tweets", async () => {
            const page = await browser.newPage();
            await page.goto(`http://localhost:3000/`);

            await page.waitForSelector("main");

            let childCount = await page.evaluate(() => {
                return document.getElementById('tweets').children.length;
            })

            expect(childCount).toEqual(1);

            let tweetText = await page.evaluate(() => {
                return document.getElementById('tweets').children[0].querySelector('p').innerHTML;
            })

            expect(tweetText).not.toEqual('Hello World');
            expect(tweetText.toLowerCase()).toEqual('hello world');
        });

        test("edit tweet", async () => {
            const page = await browser.newPage();
            await page.goto(`http://localhost:3000/`);

            await page.waitForSelector("main");

            await page.locator('#tweets article:nth-child(1) button.edit').click();

            await page.waitForTimeout(100);

            await page.locator('#tweets article:nth-child(1) textarea').fill('Hello World 2');
            await page.locator('#tweets article:nth-child(1) button.save').click();

            await page.waitForTimeout(100);


            let tweetText = await page.evaluate(() => {
                return document.getElementById('tweets').children[0].querySelector('p').innerHTML;
            })

            expect(tweetText).not.toEqual('Hello World 2');
            expect(tweetText.toLowerCase()).toEqual('hello world 2');

        });

        test("persist edited tweet", async () => {
            const page = await browser.newPage();
            await page.goto(`http://localhost:3000/`);

            await page.waitForSelector("main");

            let tweetText = await page.evaluate(() => {
                return document.getElementById('tweets').children[0].querySelector('p').innerHTML;
            })

            expect(tweetText).not.toEqual('Hello World 2');
            expect(tweetText.toLowerCase()).toEqual('hello world 2');
        });

        test("delete tweet", async () => {
            const page = await browser.newPage();
            await page.goto(`http://localhost:3000/`);

            await page.waitForSelector("main");

            await page.locator('#tweets article:nth-child(1) button.delete').click();

            await page.waitForTimeout(100);

            let childCount = await page.evaluate(() => {
                return document.getElementById('tweets').children.length;
            })

            expect(childCount).toEqual(0);
        });

        test("persist deleted tweet", async () => {
            const page = await browser.newPage();
            await page.goto(`http://localhost:3000/`);

            await page.waitForSelector("main");

            let childCount = await page.evaluate(() => {
                return document.getElementById('tweets').children.length;
            })

            expect(childCount).toEqual(0);
        });
    });
}