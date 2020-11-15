// This function enables us to choose Symbol that we want X or O for human.
function chooseSymbol(letter){
    human = letter;
    ai = letter==='O' ? 'X' :'O';
    mainBoard = Array.from(Array(9).keys());
    
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].addEventListener('click', squareClicked, false);
    }
    // if (ai === 'X') {
    //   turn(bestPlace(),ai);
    // }
    turn(bestPlace(),ai);
    document.querySelector('.chooseSymbol').style.display = "none";

}