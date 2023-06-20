const tweets = []

/**
 * This function is called when the "tweet" button is clicked.
 * @param {string} newTweet The text of the new tweet. 
 */
async function onAdd(newTweet) {
    // Send the appropriate request to the server to add the new tweet.
    // Use the response from the server to add the new tweet to the tweets array.
}

/**
 * This function is called when the "save" button is clicked.
 * @param {number} id The id of the tweet to update.
 * @param {string} newTweet The new text of the tweet.
 */
async function onUpdate(id, newTweet) {
    // Send the appropriate request to the server to update the tweet with the given id.
    // Use the response from the server to update the tweet in the tweets array.
}

/**
 * This function is called when the "delete" button is clicked.
 * @param {number} id The id of the tweet to delete.
 */
async function onDelete(id) {
    // Send the appropriate request to the server to delete the tweet with the given id.
}

// To initialize the tweets array, fetch all tweets from the server using the appropriate request.























// The following Object takes care of rendering the tweets to the page.
// You don't need to change anything in this Object but feel free to explore it.
const twitter = {
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

                    await onUpdate(tweet.id, newTweet);

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
}

twitter.renderTweets()

document.getElementById('post-tweet').addEventListener('click', async () => {
    const newTweet = document.getElementById('new-tweet-text').value

    await onAdd(newTweet)
    twitter.renderTweets()
})