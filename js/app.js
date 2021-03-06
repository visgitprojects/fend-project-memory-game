
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
//score tracker
let score = 0;
//moves counter
let movesCounter = 0;

let startingTime = performance.now();
let endingTime = performance.now();

//add timer to page
let timer = document.createElement("P")
timer.className = 'timer'
document.getElementsByTagName("DIV")[0].appendChild(timer);
const timerNotArray = document.querySelectorAll('.timer');

for(let i = 0; i < cardsNotArray.length; i++){
  //find classes of symbols and push to array to shuffle
  shuffleArray.push(cardsNotArray[i].className);
}

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
  //reset start time
  startingTime = performance.now();
  //shuffle class names
  shuffle(shuffleArray);

  for(let i = 0; i < shuffleArray.length; i++){
    // set class names to shuffled
    cardsNotArray[i].className = shuffleArray[i];
    //flip cards
    document.querySelectorAll('li.card')[i].className ='card'
  }
  //reset moves counted
  movesCounter = 0;
  //reset stars showing
  resetStars();
  //resetcard count list
  upCardsList =[];
  score = 0;
}

function growList(classN){
  //check that growlist only has two cards
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
      score++;
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
      if(movesCounter>= 10 && movesCounter <=20 && starCount > 2){
        stars();
      }
      else if (movesCounter>= 20 && movesCounter <=30 && starCount == 2){
        stars();
      }


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
  movesNotArray[0].innerText = 0;

  //reset star count
  starCount = 3;
}

function moves(){
    movesCounter++;
  //update number of moves text
  movesNotArray[0].innerText = movesCounter.toString();
}
function showCard(e){
  //update number of moves

  //update display of moves
  moves();

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


  if (score == 8){
    //record ending time
    endingTime = performance.now();

    alert("You win with "+score+" matches!  With "+movesCounter+" moves. With " + starCount + " stars left. It took " +(((endingTime - startingTime)% 60000) / 1000).toFixed(0) + ' seconds.' );
  }
}
for (var i = 0; i < cards.length; i++) {
  //check if card clicked then show card
  cards[i].addEventListener('click', showCard);
}

//start after load with shuffled cards
movesNotArray[0].innerText = 0;
shuffleButton();

//check if restart button clicked then call shuffle
document.querySelector('.restart').addEventListener('click', shuffleButton);
//set timer update Interval
let timerInterval = setInterval(timerUpdate, 1000);

function timerUpdate()
{
  endingTime = performance.now();
  //update timer element
  timerNotArray[0].innerText = +(((endingTime - startingTime)% 60000) / 1000).toFixed(0) + ' seconds.';
}
