/*
* Create a list that holds all of your cards
*/
const cards = document.getElementsByClassName('card')
//array of cards elelements
const cardsArray = [].slice.call(document.querySelectorAll('li.card >i'));
//nodelist of card elements
const cardsNotArray= document.querySelectorAll('li.card>i');
let shuffleArray=[];
let upCardsList=[];
let starCount = 3;
let starHiddenCount = 0;
let showCardsNotArray;
//number of moves element
const movesNotArray = document.querySelectorAll('.moves');
//nodelist of stars symbols
let starsNotArray= document.querySelectorAll('.fa-star');


for(let i = 0; i < cardsNotArray.length; i++){
  //find classes of symbols and push to array to shuffle
  shuffleArray.push(cardsNotArray[i].className);
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
    cardsNotArray[i].className = shuffleArray[i];
    //flip cards
    document.querySelectorAll('li.card')[i].className ='card'
  }
  //resetcard count list
  resetStars();
  upCardsList =[];
}

function growList(classN){
  //check that grolist only has two cards
  if(upCardsList.length < 2)
  {
    //add class of click to list
    upCardsList.push(classN);
  }
}
function checkMatch(classN){
  //get cards that are currently showing
  showCardsNotArray= document.querySelectorAll('li.show');
  //get stars showing

  if(upCardsList.length ==2)
  {
    //check if click classes on list match
    if(upCardsList[0].className == upCardsList[1].className)
    {

      for(let i = 0; i < showCardsNotArray.length; i++){
        //set the cards to matches
        showCardsNotArray[i].className = 'card match'
      }

      //reset list of cardsArray
      upCardsList = [];
    }
    //check if click classes on list don't match
    else if(upCardsList[0].className != upCardsList[1].className){
        //added delay because it hid the second card to quickly to see symbol
      setTimeout(function () {
        for(let i = 0; i < showCardsNotArray.length; i++){
          //hide cards that aren't matches
          showCardsNotArray[i].className = 'card'
        }
      }, 300);
      //check number of moves
      stars();

      //reset list of cardsArray
      upCardsList = [];
    }
  }
}
function stars(){
  //reset count of stars hidden
  starHiddenCount=0;

    for(let i = 0; i < starsNotArray.length; i++){
      //check if star is hidden
      if(starsNotArray[i].style.visibility != "hidden")
      {
        //if not hidden then increment count
        starHiddenCount++;
      }

    }
    //hide one star
    starsNotArray[(starHiddenCount-1)].style.visibility = "hidden"
    //update number of moves text
    movesNotArray[0].innerText = (starHiddenCount-1).toString();

    //subtract starcount(number of available moves)
    starCount--;
}
function resetStars(){
  //reset count of stars hidden
    for(let i = 0; i < starsNotArray.length; i++){
        //reset stars visibility
        starsNotArray[i].style.visibility = "visible"
      }
    //reset number of moves
    movesNotArray[0].innerText = 3;

    //reset star count
    starCount = 3;
}

function showCard(e){
  if(starCount > 0){
    //if so it doesn't change the class of the wrong node as make sure the card hasn't already been matched
    if( e.target.nodeName === "LI" && e.target.className != 'card match' && upCardsList.length < 3){
      //change the clicked class to show card symbol
      e.target.className = "card open show";
      //call list function
      growList(e.target.children[0]);
      //check cards for match
      checkMatch(e.target.children[0]);
    }
    else if(e.target.nodeName === "I" && e.target.parentElement.className != 'card match' && upCardsList.length < 3)
    {
      //change the clicked class to show card symbol
      e.target.parentElement.className = "card open show";
      //call list function
      growList(e.target);
      //check cards for match
      checkMatch(e.target);
    }
  }
  else if(starCount <= 0){
    alert("Ran out of moves! Restart the game!");
  }
}
for (var i = 0; i < cards.length; i++) {
  //check if card clicked then show card
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
