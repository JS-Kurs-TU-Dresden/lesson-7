import http from 'http';
import fs from 'fs';
import { resolve } from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

let counter = 0;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.write(`
            <html>
                <head>
                    <title>Basic Server</title>
                </head>
                <body>
                    <h1>Basic Server</h1>
                    <p><b>My Counter: </b><span id="counter">${counter}</span></p>
                    <button id="increment" onclick="increment()">Increment</button>
                    <button id="decrement" onclick="decrement()">Decrement</button>
                    <script src="/browser.js"></script>
                </body>
            </html>
        `);
        res.end();
    } else if (req.url === '/browser.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });

        const browserJs = fs.readFileSync(resolve(__dirname, './browser.js'), 'utf8');

        res.write(browserJs);
        res.end();
    } else if (req.url === '/increment') {
        counter++;
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(`${counter}`);
        res.end();
    } else if (req.url === '/decrement') {
        counter--;
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(`${counter}`);
        res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Not Found');
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Server started on port 3000');
});