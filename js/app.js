/*
 * Create a list that holds all of your cards
 */
const cards = document.getElementsByClassName('card')
const cardsArray = [].slice.call(document.querySelectorAll('li.card >i'));
const cardsNotArray= document.querySelectorAll('li.card>i');
let shuffleArray=[];
let upCardsList=[];
let showCardsNotArray;


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
    upCardsList =[];
  }

function growList(classN){
  //check that grolist only has two cards
  if(upCardsList.length < 2)
  {
    //add class of click to list
    upCardsList.push(classN);
    //console.log(classN.parentElement.className)
  }
  }
function checkMatch(classN){
  showCardsNotArray= document.querySelectorAll('li.show');
  if(upCardsList.length ==2)
  {
    //upCardsList.push(classN);
    //check if click classes on list match
    if(upCardsList[0].className == upCardsList[1].className)
    {

      for(let i = 0; i < showCardsNotArray.length; i++){
        //set the cards to matches
        //for(let i = 0; i < shuffleArray.length; i++){
        showCardsNotArray[i].className = 'card match'
      }

      //reset list of cardsArray
        upCardsList = [];
    }
    else if(upCardsList[0].className != upCardsList[1].className){

        //console.log(showCardsNotArray.length);
        for(let i = 0; i < showCardsNotArray.length; i++){
          console.log('not match');
          //console.log(cards);
          showCardsNotArray[i].className = 'card'
        }
        //cards.className = 'card';
        //reset list of cardsArray
          upCardsList = [];
      }
    }
}

function showCard(e){
  //if so it doesn't change the class of the wrong node as make sure the card hasn't already been matched
  if( e.target.nodeName === "LI" && e.target.className != 'card match' && upCardsList.length < 3){
    //change the clicked class to show card symbol
    e.target.className = "card open show";
    //call list function
    growList(e.target.children[0]);
    checkMatch(e.target.children[0]);
  }
  else if(e.target.nodeName === "I" && e.target.parentElement.className != 'card match' && upCardsList.length < 3)
  {
    //change the clicked class to show card symbol
    e.target.parentElement.className = "card open show";
    growList(e.target);
    checkMatch(e.target);
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
