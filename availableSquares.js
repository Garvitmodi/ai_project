// This is to return available squares in tic tac toe board
function availableSquares() {
  return mainBoard.filter((element, value) => value===element);
}