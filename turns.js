function squareClicked(square) {
  if (typeof mainBoard[square.target.id] ==='number') {
    turn(square.target.id, human);
    if (!checkingWin(mainBoard, human) && !checkingTie())  
      turn(bestPlace(), ai);
  }
}

function turn(squareId, player) {
  mainBoard[squareId] = player;
  document.getElementById(squareId).innerHTML = player;
  let gameWon = checkingWin(mainBoard, player);
  if (gameWon) results(gameWon);
  checkingTie();
}