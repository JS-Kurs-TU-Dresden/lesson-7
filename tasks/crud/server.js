import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {

    if (req.url === '/' || req.url === '/index.html') {
        const file = fs.readFileSync('./index.html', 'utf8');

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(file);
        res.end();
    } else if (req.url === '/browser.js') {
        const browserJs = fs.readFileSync('./browser.js', 'utf8');

        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(browserJs);
        res.end();
    } else if (req.url === '/style.css') {
        const styleCss = fs.readFileSync('./style.css', 'utf8');

        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(styleCss);
        res.end();
    } else if (req.url === '/logo.png') {
        const logoPng = fs.readFileSync('./logo.png');

        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.write(logoPng);
        res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>404 Not Found</h1>');
        res.end();
    }
})

server.listen(3000, () => {
    console.log('Server started on port 3000');
});