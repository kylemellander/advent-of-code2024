export function part1Data(data: string) {
  const lines = data
    .split("\n")
    .map((n) => n.trim())
    .filter(Boolean)
  const positionsVisited = {} as Record<string, number[]>
  const width = lines[0].length
  const offsets = [-width, 1, width, -1]
  const grid = lines.join("")
  const startIndex = grid.indexOf("^")
  let dir = 0
  let index = startIndex

  while (index >= 0 && index < grid.length) {
    const offset = offsets[dir]
    const { obstacle, stopAt } = findObstacle(grid, index, offset, width)
    for (let i = index; i !== obstacle; i += offset) {
      visitPosition(i, dir)
    }
    if (
      obstacle < 0 ||
      obstacle >= grid.length ||
      (dir % 2 === 1 &&
        Math.floor(obstacle / width) !== Math.floor(index / width))
    ) {
      break
    }
    dir = (dir + 1) % 4
    index = stopAt
  }

  function visitPosition(i: number, direction: number) {
    positionsVisited[i] ||= []
    positionsVisited[i].push(direction)
  }

  return { positionsVisited, grid, width, startIndex, offsets }
}

export function findObstacle(
  grid: string,
  index: number,
  offset: number,
  width: number
) {
  let obstacleIndex: number | undefined
  let moves = 1
  const horizontal = offset === 1 || offset === -1

  while (index + offset * moves >= 0 && index + offset * moves < grid.length) {
    if (grid[index + offset * moves] === "#") {
      obstacleIndex = index + offset * moves
      break
    }
    moves++
    if (
      horizontal &&
      Math.floor((index + offset * moves) / width) !== Math.floor(index / width)
    )
      break
  }

  const obstacle = obstacleIndex || index + offset * moves
  return { obstacle, stopAt: obstacle - offset }
}
