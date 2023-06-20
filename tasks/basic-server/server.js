import http from 'http';
import fs from 'fs';
import { resolve } from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

let counter = 0;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        // The Website should show:
        //      an element with the id "counter" that displays the current value of the counter.
        //      a button with the id "increment" that calls the increment function when clicked.
        //      a button with the id "decrement" that calls the decrement function when clicked.
        //      a script tag that loads the browser.js file.

        res.write(`
            Write your HTML here.
        `);
        res.end();
    } else if (req.url === '/browser.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });

        const browserJs = fs.readFileSync(resolve(__dirname, './browser.js'), 'utf8');

        res.write(browserJs);
        res.end();
    } else if (req.url === '/increment') {
        // Increment the counter and send the new value back to the client as text.
    } else if (req.url === '/decrement') {
        // Decrement the counter and send the new value back to the client as text.
    } else {
        // Enter the correct status code and message for a resource that is not found.
        res.writeHead(___, { 'Content-Type': 'text/plain' });
        res.write(___);
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Server started on port 3000');
});