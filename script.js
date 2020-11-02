function include(file) { 
  
  var script  = document.createElement('script'); 
  script.src  = file; 
  script.type = 'text/javascript'; 
  script.defer = true; 
  
  document.getElementsByTagName('head').item(0).appendChild(script); 
  
} 
  
/* Include Many js files */
include('./chooseSymbol.js');
include('./turns.js');
include('./minimaxFxn.js');
include('./availableSquares.js');
include('./checkingWin.js');
include('./checkingTie.js');
include('./results.js');

let mainBoard;
let human ='O';
let ai = 'X';
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

startGame();


function startGame() {
  h1=document.querySelector('h1');
  h1.style.background="steelblue";
  document.querySelector('.finishGame').style.display = "none";
  document.querySelector('.finishGame .text').innerText ="";
  document.querySelector('.chooseSymbol').style.display = "inline-block";
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].innerText = '';
    blocks[i].style.removeProperty('background-color');
  }
}






  

  


