import { expect, test, describe, vi } from 'vitest'
import { getWeatherIn } from '../tasks/fetch.js';

describe(`fetch.js`, () => {

    test("getWeatherIn function", async () => {
        const weather = await getWeatherIn('London');
        console.log(weather);
        expect(weather).toEqual({
            temperature: expect.any(String),
            wind: expect.any(String),
            description: expect.any(String),
            forecast: expect.any(Array)
        });
    })
});