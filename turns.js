//When square is clicked it check whether is is already filled or not. If not then fill
// position for human and then call turn for ai

function squareClicked(square) {
	if (typeof mainBoard[square.target.id] ==='number') {
    	turn(square.target.id, human);
	if (!checkingWin(mainBoard, human) && !checkingTie())  
      turn(bestPlace(), ai);
  }
}

// This function writes on mainBoard the value that is finalized in that turn 
function turn(squareId, player) {
   mainBoard[squareId] = player;
   document.getElementById(squareId).innerHTML = player;
   let gameWon = checkingWin(mainBoard, player);
   if (gameWon) results(gameWon);
   	  checkingTie();
}