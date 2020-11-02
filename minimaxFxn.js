 function minimaxFxn(newBoard, player) {
  var availablePlaces = availableSquares(newBoard);
  
  if (checkingWin(newBoard, human)) {
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
      path.points = minimaxFxn(newBoard, human).points;
    else
       path.points =  minimaxFxn(newBoard, ai).points;
    newBoard[availablePlaces[i]] = path.index;
    if ((player === ai && path.points === 10) || (player === human && path.points === -10))
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

function bestPlace(){
  return minimaxFxn(mainBoard, ai).index;
}
