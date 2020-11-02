function checkingTie() {
  if (availableSquares().length === 0){
    for (square of blocks) {
      square.style.backgroundColor = '#3ef83e';
      square.removeEventListener('click',squareClicked, false);
    }
    announceWinner("Tie game");
    h1=document.querySelector('h1');
      h1.style.background='#3ef83e';
    return true;
  } 
  return false;
}