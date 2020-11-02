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