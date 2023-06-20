import http from 'http';
import fs from 'fs';
import { resolve } from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

let id = 0;
const tweets = [];

function toDrunkenCase(str) {
    let result = '';

    for (let i = 0; i < str.length; i++) {
        if (Math.random() > 0.5) {
            result += str[i].toUpperCase();
        } else {
            result += str[i].toLowerCase();
        }
    }

    return result;
}

const server = http.createServer((req, res) => {

    if (req.url === '/tweets' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(tweets));
        res.end();
    } else if (req.url === '/tweets' && req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const tweet = JSON.parse(body);

            tweet.text = toDrunkenCase(tweet.text);
            tweet.id = id;
            id++;

            tweets.push(tweet);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(tweet));
            res.end();
        });
    } else if (req.url.startsWith('/tweets/') && req.method === 'PUT') {
        const parts = req.url.split('/');
        const id = Number(parts[2]);

        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const tweet = JSON.parse(body);

            tweet.text = toDrunkenCase(tweet.text);
            tweet.id = id;

            const tweetIndex = tweets.findIndex(t => t.id === id);

            tweets[tweetIndex] = tweet;

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(tweet));
            res.end();
        });
    } else if (req.url.startsWith('/tweets/') && req.method === 'DELETE') {

        const parts = req.url.split('/');
        const id = Number(parts[2]);

        const tweetIndex = tweets.findIndex(t => t.id === id);

        tweets.splice(tweetIndex, 1);

        res.writeHead(204);
        res.end();

    } else {
        handleFiles(req, res);
    }
})

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