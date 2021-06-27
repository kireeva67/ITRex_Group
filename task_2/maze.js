var maze = [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', '+', '+', '+', '#', '+', '+', '+', '#'],
  ['#', '+', '#', '+', '#', '+', '#', '+', '#'],
  ['+', '+', '#', '+', '0', '+', '#', '+', '#'],
  ['#', '#', '#', '+', '#', '#', '#', '#', '#'],
  ['#', '#', '+', '+', '#', '#', '#', '#', '#'],
  ['#', '#', '+', '#', '#', '#', '#', '#', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
];

var startPosition = [0, 0];
var way = [];

function findStartPosition(maze) {
  let row = [];
  for (let chY = 0; chY < maze.length; chY++) {
    row = maze[chY];
    for (chX = 0; chX < row.length; chX++) {
      if (row[chX] === '0') {
        startPosition[0] = chX;
        startPosition[1] = chY;
        return startPosition;
      }
    }
  }
}
findStartPosition(maze);

function isExit(maze, startPosition) {
  if (startPosition[1] === 0 || startPosition[1] === maze.length - 1) {
    return true;
  }
  if (startPosition[0] === 0 || startPosition[0] === maze[0].length - 1) {
    return true;
  }
  return false;
}
isExit(maze, startPosition);

function isDeadEnd(maze, startPosition, way) {
  let Ox = startPosition[0];
  let Oy = startPosition[1];
  if (
    (maze[Oy - 1][Ox] === '#' || way.slice(-1)[0] === 'down') &&
    (maze[Oy + 1][Ox] === '#' || way.slice(-1)[0] === 'up') &&
    (maze[Oy][Ox - 1] === '#' || way.slice(-1)[0] === 'right') &&
    (maze[Oy][Ox + 1] === '#' || way.slice(-1)[0] === 'left')
  ) {
    return true;
  }
  return false;
}
isDeadEnd(maze, startPosition, way);

function findWayOut(maze, startPosition, way) {
  let Ox = startPosition[0];
  let Oy = startPosition[1];
  if (isExit(maze, startPosition)) {
    return way;
  }

  if (isDeadEnd(maze, startPosition, way)) {
    maze[Oy][Ox] = '#';
    if (way.slice(-1)[0] === 'up') {
      Oy++;
      startPosition[1] = Oy;
      way.pop();
    } else if (way.slice(-1)[0] === 'down') {
      Oy--;
      startPosition[1] = Oy;
      way.pop();
    } else if (way.slice(-1)[0] === 'left') {
      Ox++;
      startPosition[0] = Ox;
      way.pop();
    } else if (way.slice(-1)[0] === 'right') {
      Ox--;
      startPosition[0] = Ox;
      way.pop();
    }
  }

  //up
  if (maze[Oy - 1][Ox] === '+' && way.slice(-1)[0] !== 'down') {
    Oy--;
    startPosition[1] = Oy;
    way.push('up');
    return findWayOut(maze, startPosition, way);
  }
  //down
  else if (maze[Oy + 1][Ox] === '+' && way.slice(-1)[0] !== 'up') {
    Oy++;
    startPosition[1] = Oy;
    way.push('down');

    return findWayOut(maze, startPosition, way);
  }
  //left
  else if (maze[Oy][Ox - 1] === '+' && way.slice(-1)[0] !== 'right') {
    Ox--;
    startPosition[0] = Ox;
    way.push('left');

    return findWayOut(maze, startPosition, way);
  }
  //right
  else if (maze[Oy][Ox + 1] === '+' && way.slice(-1)[0] !== 'left') {
    Ox++;
    startPosition[0] = Ox;
    way.push('right');

    return findWayOut(maze, startPosition, way);
  }
  return findWayOut(maze, startPosition, way);
}
console.log(findWayOut(maze, startPosition, way));
