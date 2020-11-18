// We will include functions from other files
function include(file) { 
  
  var script  = document.createElement('script'); 
  script.src  = file; 
  script.type = 'text/javascript'; 
  script.defer = true; 
  
  document.getElementsByTagName('head').item(0).appendChild(script); 
  
} 

// Original Board
let mainBoard;
let player2 ='O';
let ai = 'X';

// Totalwin, Totallose , Totaltie when tu bot plays after deciding first position of second
// player

let totalwins=0,totallose=0,totaltie=0;

// winning Combinations thorough which win can be possible
const winningList =[
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [6, 4, 2],
  [2, 5, 8],
  [1, 4, 7],
  [0, 3, 6]
];

const blocks = document.querySelectorAll('.Squares');
const results = document.querySelectorAll('.results');
const rowOne = document.querySelectorAll('.row1');
const rowTwo = document.querySelectorAll('.row2');
const piechart = document.querySelector('.pie-chart');
const p1 = document.querySelectorAll('.p1');
let message= document.querySelector('#message');

startGame();

// we will setup intial things required for new game
function startGame() {
	  h1=document.querySelector('h1');
	  h1.style.background='#353232';
	  // document.querySelector('.finishGame').style.display = "none";
	  // document.querySelector('.finishGame .text').innerText ="";
	  // document.querySelector('.chooseSymbol').style.display = "inline-block";
	  for (let i = 0; i < results.length; i++) {
	    results[i].style.display = "none"; 
	  }

	  piechart.style.display = "none";
	  
}

// When input value is entered then taking input and converting it into NUM and calling 
// calculate function to show all results
function getInputValue(){
            // Selecting the input element and get its value 
            var inputVal = document.getElementById("myInput").value;
            let n=Number(inputVal); 
           message.innerText="";
           console.log(n);
            if(n>0)
            calculate(n);
            else{
            	console.log("Number of Rounds should be greater than 0");
            	message.innerText="Number of Rounds should be greater than 0 !";
            }
                
        }

// This function will calculate results for each place and show them in a table 
function calculate(n){
       totalwins=0,totallose=0,totaltie=0;
       let wins=[],loses=[],ties=[];
       for(let i = 1; i < 9; i++) {
          	for (let i = 0; i < results.length; i++) {
        	  results[i].style.display = "none"; 
      		}
      wins[i-1]=0,loses[i-1]=0,ties[i-1]=0;
      for(let j=0;j<n;j++){
         mainBoard = Array.from(Array(9).keys());
      
      

      mainBoard[0]='X';
      mainBoard[i]='O';

      let value =generate();
          if(value === 0){
            console.log("Tie");
            // console.log(mainBoard);
            totaltie+=1;
            ties[i-1]+=1;
          }else if(value === ai){
             console.log("Win");
            // console.log(mainBoard);
            totalwins+=1;
            wins[i-1]+=1;
          }else{
             console.log("Lose");
              // console.log(mainBoard);
            totallose+=1;
            loses[i-1]+=1;
          }
      
          // console.log(i + " " + win); 
      }


    // console.log("Total Wins for position" + i +" " + wins[i-1]);
    // console.log("Total Lose for position" + i +" " + loses[i-1]);
    // console.log("Total Tie for position" + i +" " + ties[i-1]);
      
    let winningPercent = (wins[i-1]*100)/(n);  
    rowOne[(i-1)*6+0].innerText='Player 1';
    rowOne[(i-1)*6+1].innerText=n;
    rowOne[(i-1)*6+2].innerText=wins[i-1];
    rowOne[(i-1)*6+3].innerText=loses[i-1];
    rowOne[(i-1)*6+4].innerText=ties[i-1];
    rowOne[(i-1)*6+5].innerText=winningPercent + " %";
   
    let winningPercent2 = (loses[i-1]*100)/(n);  
    rowTwo[(i-1)*6+0].innerText='Player 2';
    rowTwo[(i-1)*6+1].innerText=n;
    rowTwo[(i-1)*6+2].innerText=loses[i-1];
    rowTwo[(i-1)*6+3].innerText=wins[i-1];
    rowTwo[(i-1)*6+4].innerText=ties[i-1];
    rowTwo[(i-1)*6+5].innerText=winningPercent2 + " %";

    }

    console.log("Total Wins " + totalwins);
    console.log("Total Loses "+ totallose);
    console.log("Total Ties " + totaltie);



	    for (let i = 0; i < results.length; i++) {
	        results[i].style.display = "block";    
	    }

    piechart.style.display="block";
      

}


// This function checks the intial state and them call other functions according to state 
// and return result
function generate() {
    let player;
    let otherplayer;
    for(let i=2; i<10; i++){
        if(i%2 === 0){
            player = ai;
            otherplayer = player2; 
            // console.log('yes');   
        
        }else{
          // console.log('no');
          player = player2;
          otherplayer = ai;
        }

        if(checkingWin(mainBoard, otherplayer)){
                // console.log(checkingWin(mainBoard,otherplayer));
                return otherplayer;
            }else if(checkingTie()){
                return 0;
            }else{
              turn(bestPlace(player), player);
            } 
        
    }
}    

    // This function writes on mainBoard the value that is finalized in that turn 
function turn(squareId, player) {
 		 mainBoard[squareId] = player;
  // console.log(squareId + " " + mainBoard[squareId]);
  // let gameWon = checkingWin(mainBoard, player);
  // if (gameWon) results(gameWon);
  // checkingTie();
}  
    


// This is to return available squares in tic tac toe board  
function availableSquares() {
  return mainBoard.filter((element, value) => value===element);
}

// This check whether the game is tie or not
function checkingTie() {
	  if (availableSquares().length === 0){
	    return true;
	  } 
	  return false;
}

// This checks whether someone won the game or not
function checkingWin(board, player) {
	  let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
	  let gameWon = null;
	  for (let [index, winningRow] of winningList.entries()) {
	    if (winningRow.every(element => plays.indexOf(element) > -1)) {
	      gameWon = {index: index, player: player};
	      break;
	    }
	  }
	  return gameWon;
}


// bestPlace will search for the best place from availablePlaces using minimaxFxn for
 // that player

function bestPlace(player){
	  if(player === ai)
	  return minimaxFxnforAi(mainBoard, ai).index;
	  else
	  return minimaxFxnforPlayer2(mainBoard,player2).index;
}

 // This function applies uses minimax algorithm for First Player chances of winning and Second for losing.

  function minimaxFxnforAi(newBoard, player) {
	  var availablePlaces = availableSquares(newBoard);
	  
	  if (checkingWin(newBoard, player2)) {
	    return {points: -1};
	  } else if (checkingWin(newBoard, ai)) {
	    return {points: 1};
	  } else if (availablePlaces.length === 0) {
	    return {points: 0};
	  }
	  
	  var paths = [];
	  for (let i = 0; i < availablePlaces.length; i ++) {
	    var path = {};
	    path.index = newBoard[availablePlaces[i]];
	    newBoard[availablePlaces[i]] = player;
	    
	    if (player === ai)
	      path.points = minimaxFxnforAi(newBoard, player2).points;
	    else
	       path.points =  minimaxFxnforAi(newBoard, ai).points;
	    newBoard[availablePlaces[i]] = path.index;
	    if ((player === ai && path.points === 1) || (player === player2 && path.points === -1))
	      return path;
	    else 
	      paths.push(path);
	  }
	  let bestPath, bestPoints;
	  if (player === ai) {
	    bestPoints = -1000;
	    for(let i = 0; i < paths.length; i++) {
	      if (paths[i].points > bestPoints) {
	        bestPoints = paths[i].points;
	        bestPath = i;
	      }
	    }
	  } else {
	      bestPoints = 1000;
	      for(let i = 0; i < paths.length; i++) {
	      if (paths[i].points < bestPoints) {
	        bestPoints = paths[i].points;
	        bestPath = i;
	      }
	    }
	  }
	  
	  return paths[bestPath];
}

// This function applies uses minimax algorithm for player 2 chances of winning and player 1 for losing.

  function minimaxFxnforPlayer2(newBoard, player) {
	  var availablePlaces = availableSquares(newBoard);
	  
	  if (checkingWin(newBoard, ai)) {
	    return {points: -1};
	  } else if (checkingWin(newBoard, player2)) {
	    return {points: 1};
	  } else if (availablePlaces.length === 0) {
	    return {points: 0};
	  }
	  
	  var paths = [];
	  for (let i = 0; i < availablePlaces.length; i ++) {
	    var path = {};
	    path.index = newBoard[availablePlaces[i]];
	    newBoard[availablePlaces[i]] = player;
	    
	    if (player === ai)
	      path.points = minimaxFxnforPlayer2(newBoard, player2).points;
	    else
	       path.points =  minimaxFxnforPlayer2(newBoard, ai).points;
	    newBoard[availablePlaces[i]] = path.index;
	    if ((player === player2 && path.points === 1) || (player === ai && path.points === -1))
	      return path;
	    else 
	      paths.push(path);
	  }
	  let bestPath, bestPoints;
	  if (player === player2) {
	    bestPoints = -1000;
	    for(let i = 0; i < paths.length; i++) {
	      if (paths[i].points > bestPoints) {
	        bestPoints = paths[i].points;
	        bestPath = i;
	      }
	    }
	  } else {
	      bestPoints = 1000;
	      for(let i = 0; i < paths.length; i++) {
	      if (paths[i].points < bestPoints) {
	        bestPoints = paths[i].points;
	        bestPath = i;
	      }
	    }
	  }
	  
	  return paths[bestPath];
}





  















  

  


