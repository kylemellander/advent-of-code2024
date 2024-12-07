import { Coord, Direction } from "../GridMap"

export const NEXT_DIRECTION = {
  N: "E" as Direction,
  E: "S" as Direction,
  S: "W" as Direction,
  W: "N" as Direction,
}

export function part1DataPointsBitwise(data: string) {
  const lines = data
    .split("\n")
    .map((n) => n.trim())
    .filter(Boolean)
  // const height = lines.length
  const positionsVisited = {} as Record<string, number[]>
  const width = lines[0].length
  const offsets = [-width, 1, width, -1]
  const grid = lines.join("")
  const startIndex = grid.indexOf("^")
  let dir = 0
  let index = startIndex

  while (index >= 0 && index < grid.length) {
    const offset = offsets[dir]
    const { obstacle, stopAt } = findObstacleBitwise(grid, index, offset, width)
    for (let i = index; i !== stopAt; i += offset) {
      visitPosition(i, dir)
    }
    if (
      obstacle < 0 ||
      obstacle >= grid.length ||
      (dir % 2 === 1 &&
        Math.floor(obstacle / width) !== Math.floor(index / width))
    ) {
      visitPosition(stopAt, dir)
      break
    }
    dir = (dir + 1) % 4
    index = stopAt
  }

  function visitPosition(i: number, direction: number) {
    positionsVisited[i] ||= []
    positionsVisited[i].push(direction)
  }

  return { positionsVisited }
}
export function part1DataPoints(data: string) {
  const lines = data
    .split("\n")
    .map((n) => n.trim())
    .filter(Boolean)
  let position: Coord = { x: 0, y: 0 }
  let startingPosition = ""
  const positionsVisited = {} as Record<string, string[]>
  let dir: Direction = "N"
  const upperX = lines[0].length - 1
  const upperY = lines.length - 1

  const obstacles = lines.reduce((acc, line, y) => {
    return [
      ...acc,
      ...line.split("").reduce((ac, value, x) => {
        if (value === "#") return [...ac, { x, y }]
        if (value === "^") {
          position = { x, y }
          startingPosition = `${x},${y}`
          positionsVisited[`${x},${y}`] = ["N"]
        }
        return ac
      }, [] as Coord[]),
    ]
  }, [] as Coord[])

  while (true) {
    const moveTo = findObstacle(obstacles, position, dir)
    if (dir === "N") {
      const destination = moveTo === undefined ? 0 : moveTo + 1
      for (let i = position.y - 1; i >= destination; i--) {
        visitPosition(position.x, i, "N")
      }
      if (moveTo == undefined) break
      dir = NEXT_DIRECTION[dir]
      position.y = destination
    } else if (dir === "S") {
      const destination = moveTo === undefined ? upperY : moveTo - 1
      for (let i = position.y + 1; i <= destination; i++) {
        visitPosition(position.x, i, "S")
      }
      if (moveTo == undefined) break
      dir = NEXT_DIRECTION[dir]
      position.y = destination
    } else if (dir === "E") {
      const destination = moveTo === undefined ? upperX : moveTo - 1
      for (let i = position.x + 1; i <= destination; i++) {
        visitPosition(i, position.y, "E")
      }
      if (moveTo == undefined) break
      dir = NEXT_DIRECTION[dir]
      position.x = destination
    } else if (dir === "W") {
      const destination = moveTo === undefined ? 0 : moveTo + 1
      for (let i = position.x - 1; i >= destination; i--) {
        visitPosition(i, position.y, "W")
      }
      if (moveTo == undefined) break
      dir = NEXT_DIRECTION[dir]
      position.x = moveTo + 1
    }
  }

  function visitPosition(x: number, y: number, direction: string) {
    positionsVisited[`${x},${y}`] ||= []
    positionsVisited[`${x},${y}`].push(direction)
  }

  return { startingPosition, positionsVisited, upperX, upperY, obstacles }
}

function findObstacleBitwise(
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

function findObstacle(obstacles: Coord[], position: Coord, dir: Direction) {
  const compareFn = dir === "N" || dir === "W" ? Math.max : Math.min
  const key = dir === "N" || dir === "S" ? "y" : "x"
  const filterFn =
    dir === "N"
      ? ({ x, y }: Coord) => x === position.x && y < position.y
      : dir === "S"
      ? ({ x, y }: Coord) => x === position.x && y > position.y
      : dir === "E"
      ? ({ x, y }: Coord) => y === position.y && x > position.x
      : ({ x, y }: Coord) => y === position.y && x < position.x
  return _findObstacle(obstacles, key, filterFn, compareFn)
}

function _findObstacle(
  obstacles: Coord[],
  key: "x" | "y",
  filterFn: (o: Coord) => boolean,
  compareFn: (a: number, b: number) => number
): number | undefined {
  return obstacles
    .filter(filterFn)
    .reduce(
      (acc, o) => (acc === undefined ? o[key] : compareFn(acc, o[key])),
      undefined as number | undefined
    )
}
