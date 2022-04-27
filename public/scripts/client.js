/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Function takes in a tweet object and returns tweet <article> element in html

$(() => {

  const renderTweets = function (tweets) {
    const container = $('#tweets-container');
    container.empty();

    // loops through tweets
    for (const tweet of tweets) {

      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);

      // takes return value and appends it to the tweets container
      container.prepend($tweet);
    }
  };

  const createTweetElement = function (tweet) {


    // get info for article
    const img = tweet.user.avatars;
    const username = tweet.user.name;
    const handle = tweet.user.handle;
    const text = tweet.content.text;
    const time = timeago.format(tweet.created_at);

    // Function to escape text 
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const safeHTML = `<p>${escape(text)}</p>`;


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
        ${safeHTML}
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

  // Event listener.. Checks for form click and then posts the serialized form data to the server
  $("form").submit(function (event) {
    $('.error').slideUp("slow");
    event.preventDefault();
    const serializedFormData = $(this).serialize();
    const textLength = serializedFormData.length;
    const url = $(this).attr("action");

    // Check if input is empty (input is empty when serializedFormData = 'text=')
    if (textLength === 5) {
      $('.error').slideUp("slow");
      $('.error').slideDown("slow");
      //$('.error').css('display', 'block');
      return $('.error').html('If you tweet, tweet something!');
      // return alert('If you tweet, tweet something!');
    }

    // Check if input is greater than max
    if (textLength >= 145) {
      //$('.error').css('display', 'block');
      $('.error').slideUp("slow");
      $('.validation').slideDown("slow");
      return $('.validation').html('Please shorten your tweet');
      // return alert('Please shorten your tweet');
    }

    $.post(url, serializedFormData, () => {
      loadTweets();
    });
  });

  // function that retrieves an array of tweets from the database and renders them in the app
  const loadTweets = function () {
    $.get("/tweets")
      .then((data) => {
        renderTweets(data);
      }
      );
  };

  loadTweets();
});
