
function results(gameWon){
  for (let index of winningList[gameWon.index]) {
    document.getElementById(index).style.backgroundColor = 
      gameWon.player === human ? "yellow" : 'rgb(248 62 160)';
      h1=document.querySelector('h1');
      h1.style.background=gameWon.player === human ? "yellow" : 'rgb(248 62 160)';      
  }
  for (let i=0; i < blocks.length; i++) {
    blocks[i].removeEventListener('click', squareClicked, false);
  }
  announceWinner(gameWon.player === human ? "You win!" : "You lose");
}

function announceWinner(who) {
  document.querySelector(".finishGame").style.display = "inline-block";
  document.querySelector(".finishGame .text").innerText = who;

}
