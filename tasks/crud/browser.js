const tweets = []

async function onAdd(newTweet) {

    const response = await fetch('/tweets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: newTweet
        })
    })

    const resultTweet = await response.json()

    tweets.push(resultTweet)
}

async function onUpdate(id, newTweet) {
    const response = await fetch(`/tweets/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: newTweet
        })
    })

    const resultTweet = await response.json()

    const tweetIndex = tweets.findIndex(t => t.id === id)
    tweets[tweetIndex] = resultTweet
}

async function onDelete(id) {
    const response = await fetch(`/tweets/${id}`, {
        method: 'DELETE'
    })

    if (response.status === 204) {
        const tweetIndex = tweets.findIndex(t => t.id === id)
        tweets.splice(tweetIndex, 1)
    }
}

const response = await fetch('/tweets')
const resultTweets = await response.json()

for (const tweet of resultTweets) {
    tweets.push(tweet)
}

const twitter = createTwitter(tweets, onUpdate, onDelete)

twitter.renderTweets()

document.getElementById('post-tweet').addEventListener('click', async () => {
    const newTweet = document.getElementById('new-tweet-text').value

    await onAdd(newTweet)
    twitter.renderTweets()
})






























function createTwitter(tweets, onSave, onDelete) {
    return {
        editing: null,
        renderTweets() {
            document.getElementById('tweets').innerHTML = '';

            for (const tweet of tweets) {
                const article = document.createElement('article');
                article.id = tweet.id;

                const img = document.createElement('img');
                img.src = 'http://localhost:3000/logo.png';

                const h3 = document.createElement('h3');
                h3.textContent = 'John Doe';

                article.appendChild(img);
                article.appendChild(h3);

                const buttons = document.createElement('div');
                buttons.classList.add('buttons');

                if (this.editing === tweet.id) {
                    const textarea = document.createElement('textarea');
                    textarea.value = tweet.text;

                    const button = document.createElement('button');
                    button.textContent = 'Save';
                    button.classList.add('save');

                    button.addEventListener('click', async () => {
                        const newTweet = textarea.value;

                        let tweetIndex = tweets.findIndex(t => t.id === tweet.id);
                        tweets[tweetIndex].text = newTweet;

                        await onSave(tweet.id, newTweet);

                        this.editing = null;
                        this.renderTweets();
                    });

                    article.appendChild(textarea);
                    buttons.appendChild(button);
                } else {
                    const p = document.createElement('p');
                    p.textContent = tweet.text;

                    const button = document.createElement('button');
                    button.textContent = 'Edit';
                    button.classList.add('edit');

                    button.addEventListener('click', () => {
                        this.editing = tweet.id;
                        this.renderTweets();
                    });

                    article.appendChild(p);
                    buttons.appendChild(button);
                }

                const button = document.createElement('button');
                button.textContent = 'Delete';
                button.classList.add('delete');

                button.addEventListener('click', async () => {
                    const tweetIndex = tweets.findIndex(t => t.id === tweet.id);
                    tweets.splice(tweetIndex, 1);

                    await onDelete(tweet.id);

                    this.renderTweets();
                });

                buttons.appendChild(button);

                article.appendChild(buttons);

                document.getElementById('tweets').appendChild(article);
            }
        }
    };
}