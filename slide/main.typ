#import "./theme.typ": *

// --- Colors ---
#let jsYellow = rgb("f7df1e")
#let jsBlack = rgb("#222")
#let jsWhite = rgb("#ffffff")
#let subdued = jsWhite.darken(40%)


#set page(
    fill: jsBlack,
)

#set text(
    font: "Montserrat",
    fill: jsWhite,
)

#show: slides.with(
    author: "Nils Twelker",
    title: "Introcution to JavaScript",
    short-title: "JavaScript Lesson 7",
    date: "March 2023",
    color: jsYellow,
)

#show raw: it => [
    #box(it, fill: jsBlack.lighten(10%), outset: (x: 4pt, y:6pt), radius: 5pt)
]

#let colored = (it, color) => [
    #box(text(raw(it), fill: color), fill: jsBlack.lighten(10%), outset: (x: 4pt, y:6pt), radius: 5pt)
]

#let hint = (it, full: false) => [
    #if full [
        #block([#text("tipp", fill: jsBlack)], fill: jsYellow.lighten(10%), outset: (x: 8pt, y:8pt), radius: (top:5pt))
        #v(-14pt)
        #block(it, fill: jsBlack.lighten(10%), outset: (x: 8pt, y:8pt), radius: (bottom: 5pt, top-right: 5pt))
    ] else [
        #text([Tipp: ], fill: jsYellow.lighten(10%))
        #it
    ]
]

== What learned we last Week?

- Common Events `click`, `dblclick`, `mouseover`, `keydown`
- `on<event>` Attribute
- Event Bubbling
- Dispatching Events (Custom Events)
- Displaying Lists #raw("<ul><li>Item A</li></ul>", lang: "html")
- Displaying Tables #raw("<table><tr><th>Name</th></tr></table>", lang: "html")
- Displaying Forms #raw("<form><input type='text'></form>", lang: "html")

== Goals of this week

- Server Client Communication
    - HTTP (Hypertext Transfer Protocol)
    - CRUD (Create, Read, Update, Delete)
- JSON (JavaScript Object Notation)
- AJAX (Asynchronous JavaScript and XML)
- Fetch API
- Promises
- Async/Await

== Server Client Communication

#align(center, [
    #image("./request.png", width: 90%)
])

== HTTP (Hypertext Transfer Protocol)

Protocol for communication between a Web Client and a Web Server.

1. Web Client sends HTTP Request to Web Server.
2. Web Server processes Request.
3. Web Server sends HTTP Response to Web Client.

== HTTP Request & Response

#grid(
    columns: (1fr, 1fr),
    [
        ```http
        GET /index.html HTTP/2
        Host: www.example.com
        ```
    ], [
#text([
    ```http
HTTP/2 200 OK
Content-Type: text/html
Content-Length: 1234

<html>
    <head>
        <title>Example</title>
    </head>
    <body>
        <h1>Hello World</h1>
    </body>
</html>
```
], size: 0.8em)
    ]
)

== CRUD (Create, Read, Update, Delete)

Operations for persistent data.

- Create: `POST`
- Read: `GET`
- Update: `PUT` or `PATCH`
- Delete: `DELETE`

== CRUD (Create)

#grid(
    columns: (1fr, 1fr),
    [
Request \
```http
POST /users HTTP/2
Host: www.example.com
Content-Type: application/json

{
    "name": "John Doe",
    "age": 42
}
```
    ], [
Response \
#text([
    ```http
HTTP/2 201 Created
Content-Type: application/json
Content-Length: 123

{
    "id": 123,
    "name": "John Doe",
    "age": 42
}
```
], size: 0.8em)
    ]
)

== CRUD (Read)

#grid(
    columns: (1fr, 1fr),
    [
Request \
```http
GET /users/123 HTTP/2
Host: www.example.com
```
    ], [
Response \
#text([
    ```http
HTTP/2 200 OK
Content-Type: application/json
Content-Length: 123

{
    "id": 123,
    "name": "John Doe",
    "age": 42
}
```
], size: 0.8em)
    ]
)

== CRUD (Update)

#grid(
    columns: (1fr, 1fr),
    [
Request \
```http
PATCH /users/123 HTTP/2
Host: www.example.com
Content-Type: application/json

{
    "age": 43
}
```
    ], [
Response \
#text([
    ```http
HTTP/2 200 OK
Content-Type: application/json
Content-Length: 123

{
    "id": 123,
    "name": "John Doe",
    "age": 43
}
```
], size: 0.8em)
    ]
)

== CRUD (Delete)

#grid(
    columns: (1fr, 1fr),
    [
Request \
```http
DELETE /users/123 HTTP/2
Host: www.example.com
```
    ], [
Response \
#text([
    ```http
HTTP/2 204 No Content
```
], size: 0.8em)
    ]
)

== HTTP Status Codes

#grid(
    columns: (1fr, 1fr),
    [
        - 1xx: Informational
        - 2xx: Success
        - 3xx: Redirection
        - 4xx: Client Error
        - 5xx: Server Error
    ], [
        #text([
            Some common Status Codes:
            - 200 OK
            - 201 Created
            - 204 No Content
            - 400 Bad Request
            - 401 Unauthorized
            - 403 Forbidden
            - 404 Not Found
            - 500 Internal Server Error
            - 503 Service Unavailable
        ], size: 0.8em)
    ]
)

== JSON (JavaScript Object Notation)

Lightweight data-interchange format.

```json
{
    "name": "John Doe",
    "age": 42,
}
```

== JSON Data Types

#text([
    ```json
{
    "string": "Hello World",
    "number": 42,
    "boolean": true,
    "null": null,
    "array": [1, 2, 3],
    "object": {
        "name": "John Doe",
        "age": 42
    }
}
```
], size: 0.9em)

== AJAX (Asynchronous JavaScript and XML)

Technique for asynchronous communication between a Web Client and a Web Server.

- Asynchronous: No page reload.
- JavaScript: Client side scripting language.
- XML: Data format. (JSON is more common today)

== Fetch API

API for making HTTP Requests.

```js
fetch("https://example.com/users/123")
    .then(response => response.json())
    .then(data => console.log(data))
```

== Fetch API (POST)

#text([
    ```js
fetch("https://example.com/users", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "John Doe",
        age: 42
    })
}).then(response => response.json())
  .then(data => console.log(data))
```], size: 0.9em)

== Promises

Object that represents the eventual completion (or failure) of an asynchronous operation.

```js
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Hello World")
    }, 1000)
})

promise.then(data => console.log(data))
```

== Async/Await

```js
async function getData() {
    const response = await fetch("https://example.com/users/123")
    const data = await response.json()
    return data
}

const myData = await getData()
console.log(myData)
```

== Tasks and Points
Goal is to get 100 Points.
#columns(2, [
- `custom-events` (20 Points)
- `lists` (30 Points)
- `form` (30 Points)
- `tables` (40 Points)
- `more-events` (40 Points)
- `event-bubbling` (40 Points)
- `friend-list` (80 Points)
])