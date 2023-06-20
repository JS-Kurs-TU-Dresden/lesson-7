// For more info: https://javascript.info/fetch

import fetch from 'node-fetch';

// Fetch the current weather for a given city

async function getWeatherIn(city) {
    const response = await fetch(
        `https://goweather.herokuapp.com/weather/${city}`
    );
    const weather = await response.json();
    return weather;
}















export { getWeatherIn }