/*
 * Create a list that holds all of your cards
 */
const cards = document.getElementsByClassName('card')
const cardsArray = [].slice.call(document.querySelectorAll('li.card >i'));
let shuffleArray=[];
let upCardsList=[];

for(let i = 0; i < cardsArray.length; i++){
  //find classes of symbols and push to array to shuffle
  shuffleArray.push(document.querySelectorAll('li.card>i')[i].className);
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
function shuffleButton(){

  //shuffle class names
    shuffle(shuffleArray);

    for(let i = 0; i < shuffleArray.length; i++){
    // set class names to shuffled
      document.querySelectorAll('li.card>i')[i].className = shuffleArray[i];
      //flip cards
      document.querySelectorAll('li.card')[i].className ='card'
    }
    //resetcard count list
    upCardsList =[];
  }

function growList(classN){
  if(upCardsList.length < 2)
  {
    upCardsList.push(classN);
    console.log(upCardsList)
  }
  else if(upCardsList.length == 2)
  {
    if(upCardsList[0]== upCardsList[1])
    {

    }

  }
}

function showCard(e){
  //if so it doesn't change the class of the wrong node as make sure the card hasn't already been matched
  if( e.target.nodeName === "LI" && e.target.className != 'card match'){
    //change the clicked class to show card symbol
    e.target.className = "card open show";
    //call list function
    growList(e.target.children[0].className);
  }
  else if(e.target.nodeName === "I" && e.target.parentElement.className != 'card match')
  {
    //change the clicked class to show card symbol
    e.target.parentElement.className = "card open show";
    growList(e.target.className);
  }
}
for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', showCard);
}

//start after load with shuffled cards
shuffleButton();

//check if restart button clicked then call shuffle
document.querySelector('.restart').addEventListener('click', shuffleButton);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
