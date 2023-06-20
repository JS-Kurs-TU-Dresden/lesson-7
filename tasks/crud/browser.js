const tweets = [
    {
        id: 1,
        text: 'I am learning JS',
    },
    {
        id: 2,
        text: 'I am learning JSa',
    },
]

function onAdd(newTweet) {

}

function onUpdate(id, newTweet) {

}

function onDelete(id) {

}

const twitter = createTwitter(tweets, onUpdate, onDelete)

twitter.renderTweets()





























function createTwitter(tweets, onSave, onDelete) {
    return {
        editing: null,
        renderTweets() {
            document.getElementById('tweets').innerHTML = '';

            for (const tweet of tweets) {
                const article = document.createElement('article');
                article.id = tweet.id;

                const header = document.createElement('header');

                const img = document.createElement('img');
                img.src = 'https://thispersondoesnotexist.com/';

                const h3 = document.createElement('h3');
                h3.textContent = 'John Doe';

                header.appendChild(img);
                header.appendChild(h3);

                article.appendChild(header);

                if (this.editing === tweet.id) {
                    const textarea = document.createElement('textarea');
                    textarea.value = tweet.text;

                    const button = document.createElement('button');
                    button.textContent = 'Save';

                    button.addEventListener('click', () => {
                        const newTweet = textarea.value;

                        tweetIndex = tweets.findIndex(t => t.id === tweet.id);
                        tweets[tweetIndex].text = newTweet;

                        this.editing = null;
                        this.renderTweets();

                        onSave(tweet.id, newTweet);
                    });

                    article.appendChild(textarea);
                    article.appendChild(button);
                } else {
                    const p = document.createElement('p');
                    p.textContent = tweet.text;

                    const button = document.createElement('button');
                    button.textContent = 'Edit';

                    button.addEventListener('click', () => {
                        this.editing = tweet.id;
                        this.renderTweets();
                    });

                    article.appendChild(p);
                    article.appendChild(button);
                }

                const button = document.createElement('button');
                button.textContent = 'Delete';

                button.addEventListener('click', () => {
                    const tweetIndex = tweets.findIndex(t => t.id === tweet.id);
                    tweets.splice(tweetIndex, 1);
                    this.renderTweets();

                    onDelete(tweet.id);
                });

                article.appendChild(button);

                document.getElementById('tweets').appendChild(article);
            }
        }
    };
}