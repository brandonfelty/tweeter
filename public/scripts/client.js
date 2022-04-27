/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Function takes in a tweet object and returns tweet <article> element in html

$( () => {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
  const renderTweets = function(tweets) {

    // loops through tweets
    for (const tweet of tweets) {

      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);

      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweet);
    }
  }

  const createTweetElement = function(tweet) {
  
    // get info for article
    const img = tweet.user.avatars;
    const username = tweet.user.name;
    const handle = tweet.user.handle;
    const text = tweet.content.text;
    const time = tweet.created_at;
    
    // put all together in html article
    const article = `
      <article class="tweets">
        <header>
          <div id="tweet-header-right">
            <img src="${img}"></img>
            <h3 class="tweet-name">${username}</h3>
          </div>
            <h3 class="tweet-handle">${handle}</h3>
        </header>
        <p>
          ${text}
        </p>
        <footer>
          <p><small>${time}</small></p>
          <div id="tweet-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `;
    
    // return tweet
    return article;
  };
  
  renderTweets(data);

  
  $("form").submit( function(event) {

    event.preventDefault();
  })
});
