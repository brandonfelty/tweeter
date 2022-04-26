// Make sure the dom is loaded
$(document).ready( () => {

  // Set tweet-text id to variable and then check for changes to the value in the form
  const tweetText = document.getElementById("tweet-text");
  tweetText.addEventListener("input", function() {

    // Takes the form's input and subtracts the number of characters from the total length.
    const input = this.value;
    let lengthAvailable = 140;
    for (const char of input) {
      lengthAvailable--;
    }
    
    // Dynamically updates the counter 
    const $counter = $(this).parent().next().children()[1];
    console.log($counter.value)
    $counter.value = lengthAvailable;
    //$('.counter').val(lengthAvailable);
  });
});