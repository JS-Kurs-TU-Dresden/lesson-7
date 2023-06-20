import http from 'http';
import fs from 'fs';
import { resolve } from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

let id = 0;
const tweets = [];

/**
 * This function turns a string into drunken case.
 * @example toDrunkenCase('Hello World') // 'hElLo wOrLd'
 * @param {string} str The string to turn into drunken case.
 */
function toDrunkenCase(str) {
    // Write your code here so that the case of each letter is randomly upper or lower case.
}


// Fore info on the http module: https://www.w3schools.com/nodejs/nodejs_http.asp
//                               https://www.tutorialsteacher.com/nodejs/create-nodejs-web-server

// In the case that you feel lost, you can always ask for a hint!



// Write your code here so that the server handles the following requests:
//      GET /tweets
//          Respond with all tweets as JSON.
//      POST /tweets
//          Add a new tweet to the tweets array and respond with the new tweet as JSON.
//      PUT /tweets/:id
//          Update the tweet with the given id and respond with the updated tweet as JSON.
//      DELETE /tweets/:id
//          Delete the tweet with the given id and respond with status code 204.

const server = http.createServer((req, res) => {

    if (req.url === '/tweets' && req.method === ___) {

        // Code goes here

    } else if (req.url === '/tweets' && req.method === ___) {

        // Code goes here

    } else if (req.url.startsWith('/tweets/') && req.method === ___) {

        // Code goes here

    } else if (req.url.startsWith('/tweets/') && req.method === ___) {

        // Code goes here

    } else {
        handleFiles(req, res);
    }
})

/**
 * This function handles all requests for files.
 */
function handleFiles(req, res) {
    if (req.url === '/' || req.url === '/index.html') {
        const file = fs.readFileSync(resolve(__dirname, './index.html'), 'utf8');

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(file);
        res.end();
    } else if (req.url === '/browser.js') {
        const browserJs = fs.readFileSync(resolve(__dirname, './browser.js'), 'utf8');

        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(browserJs);
        res.end();
    } else if (req.url === '/style.css') {
        const styleCss = fs.readFileSync(resolve(__dirname, './style.css'), 'utf8');

        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(styleCss);
        res.end();
    } else if (req.url === '/logo.png') {
        const logoPng = fs.readFileSync(resolve(__dirname, './logo.png'));

        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.write(logoPng);
        res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>404 Not Found</h1>');
        res.end();
    }
}

server.listen(3000, () => {
    console.log('Server started on port 3000');
});