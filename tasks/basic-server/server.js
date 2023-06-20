import http from 'http';
import fs from 'fs';

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
                    <p>This is a simple server.</p>
                    <script src="/browser.js"></script>
                </body>
            </html>
        `);
        res.end();
    } else if (req.url === '/browser.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });

        const browserJs = fs.readFileSync('./browser.js', 'utf8');

        res.write(browserJs);
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Server started on port 3000');
});