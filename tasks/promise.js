// For more info: https://javascript.info/promise-api and https://javascript.info/async-await

// Create a promise that resolves after a given number of milliseconds
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Create a promise fails after 1 seconds

function fail() {
    return new Promise((_, reject) => setTimeout(reject, 1000));
}

// Write an async function that prints out all numbers from 1 to 10 with a delay of 250 milliseconds between each number

async function printNumbers() {
    for (let i = 1; i <= 10; i++) {
        console.log(i);
        await sleep(250);
    }
}












export {
    sleep,
    fail,
    printNumbers
}