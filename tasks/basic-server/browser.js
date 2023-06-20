console.log('Hello from the browser')

function increment() {
    console.log('incrementing')
    fetch('/increment')
        .then(res => res.text())
        .then(text => {
            document.getElementById('counter').innerHTML = text;
        });
}

function decrement() {
    console.log('decrementing')
    fetch('/decrement')
        .then(res => res.text())
        .then(text => {
            document.getElementById('counter').innerHTML = text;
        });
}