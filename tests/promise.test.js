import { expect, test, describe, vi } from 'vitest'
import { sleep, fail, printNumbers } from '../tasks/promise.js';

describe(`promise.js`, () => {

    test("sleep method", async () => {
        const start = Date.now();
        await sleep(1000);
        const end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(1000);
    })

    test("fail method", async () => {
        try {
            await fail();
        } catch (e) {
            expect(e).toBeUndefined();
        }
    })

    test("printNumbers method", async () => {
        const start = Date.now();
        await printNumbers();
        const end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(2500);
    })
});