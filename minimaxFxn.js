// This function applies uses minimax algorithm for AI chances of winning and human for losing.
 function minimaxFxn(newBoard, player) {

   	// first we check for availablePlaces	
    var availablePlaces = availableSquares(newBoard);
    
    // check whether before this step somebody already win or its already tie
    if (checkingWin(newBoard, human)) {
      return {points: -1};
    } else if (checkingWin(newBoard, ai)) {
      return {points: 1};
    } else if (availablePlaces.length === 0) {
      return {points: 0};
    }
    
    // In this paths array we will store different paths and calculate for invidual path score 
    // so that we get whether through this AI will win , lose or Tie.
    var paths = [];
    for (let i = 0; i < availablePlaces.length; i ++) {
      var path = {};
      path.index = newBoard[availablePlaces[i]];
      newBoard[availablePlaces[i]] = player;
      
      if (player === ai)
        path.points = minimaxFxn(newBoard, human).points;
      else
         path.points =  minimaxFxn(newBoard, ai).points;
      newBoard[availablePlaces[i]] = path.index;


      // Here Alpha Beta Proning is used , that means if we already win at this place we do not
      // go at more depth to check all other places, instead we will return win from here only
      if ((player === ai && path.points === 1) || (player === human && path.points === -1))
        return path;
      else 
        paths.push(path);
    }
    
    // bestPath will store the index of path that will lead AI to its maximum score
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
    
    // returning complete bestPath with its points and index of position
    return paths[bestPath];
}


// bestPlace will search for the best place from availablePlaces using minimaxFxn
function bestPlace(){
  return minimaxFxn(mainBoard, ai).index;
}
