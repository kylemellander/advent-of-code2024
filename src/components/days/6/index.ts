import input from "./input.txt?raw"
import { Direction } from "../GridMap"

export function part1(data = input) {
  const { positionsVisited } = part1DataPoints(data)
  return Object.keys(positionsVisited).length
}

type Coord = { x: number; y: number }

function part1DataPoints(data: string) {
  let position: Coord = { x: 0, y: 0 }
  let startingPosition = ""
  const positionsVisited = {} as Record<string, string[]>
  let dir: Direction = "N"
  const lines = data
    .split("\n")
    .map((n) => n.trim())
    .filter(Boolean)
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

const NEXT_DIRECTION = {
  N: "E" as Direction,
  E: "S" as Direction,
  S: "W" as Direction,
  W: "N" as Direction,
}

export function part2(data = input) {
  const { positionsVisited, upperX, upperY, obstacles } = part1DataPoints(data)

  const potentialNewObstacles = Object.keys(positionsVisited).filter(
    (rawCoord) => {
      const firstPassDir = positionsVisited[rawCoord][0] as Direction
      const [oX, oY] = rawCoord.split(",").map(Number)
      const { x, y } =
        firstPassDir === "N"
          ? { x: oX, y: oY + 1 }
          : firstPassDir === "S"
          ? { x: oX, y: oY - 1 }
          : firstPassDir === "E"
          ? { x: oX - 1, y: oY }
          : { x: oX + 1, y: oY }
      const result = hasInfiniteLoop({
        startingPosition: `${x},${y}`,
        startingDirection: firstPassDir,
        obstacles: [...obstacles, { x: oX, y: oY }],
        upperX,
        upperY,
      })
      return result
    }
  )

  return potentialNewObstacles.length
}

function hasInfiniteLoop({
  startingPosition,
  startingDirection,
  obstacles,
  upperX,
  upperY,
}: {
  startingPosition: string
  startingDirection: Direction
  obstacles: Coord[]
  upperX: number
  upperY: number
}) {
  const positionsVisited = {} as Record<string, string[]>
  let [positionX, positionY] = startingPosition.split(",").map(Number)
  let dir: Direction = startingDirection

  function move(x: number, y: number, direction: Direction) {
    const key = `${x},${y}`
    positionsVisited[key] ||= []
    if (positionsVisited[key].includes(direction)) return true
    positionsVisited[key].push(direction)
    return false
  }

  function findMoveTo(
    filterFn: (coord: Coord) => boolean,
    compareFn: (a: number, b: number) => boolean
  ) {
    return obstacles.filter(filterFn).reduce((acc, { x, y }) => {
      const value = dir === "N" || dir === "S" ? y : x
      if (acc === undefined) return value
      return compareFn(acc, value) ? value : acc
    }, undefined as number | undefined)
  }

  while (true) {
    let moveTo: number | undefined
    let destination: number

    if (dir === "N") {
      moveTo = findMoveTo(
        ({ x, y }) => x === positionX && y < positionY,
        (a, b) => a < b
      )
      const destination = moveTo === undefined ? 0 : moveTo + 1
      for (let i = positionY - 1; i >= destination; i--) {
        if (move(positionX, i, "N")) return true
      }
      if (moveTo === undefined) break
      dir = NEXT_DIRECTION[dir]
      positionY = destination
    } else if (dir === "S") {
      moveTo = findMoveTo(
        ({ x, y }) => x === positionX && y > positionY,
        (a, b) => a > b
      )
      destination = moveTo === undefined ? upperY : moveTo - 1
      for (let i = positionY + 1; i <= destination; i++) {
        if (move(positionX, i, "S")) return true
      }
      if (moveTo === undefined) break
      dir = NEXT_DIRECTION[dir]
      positionY = destination
    } else if (dir === "E") {
      moveTo = findMoveTo(
        ({ x, y }) => y === positionY && x > positionX,
        (a, b) => a > b
      )
      destination = moveTo === undefined ? upperX : moveTo - 1
      for (let i = positionX + 1; i <= destination; i++) {
        if (move(i, positionY, "E")) return true
      }
      if (moveTo === undefined) break
      dir = NEXT_DIRECTION[dir]
      positionX = destination
    } else if (dir === "W") {
      moveTo = findMoveTo(
        ({ x, y }) => y === positionY && x < positionX,
        (a, b) => a < b
      )
      destination = moveTo === undefined ? 0 : moveTo + 1
      for (let i = positionX - 1; i >= destination; i--) {
        if (move(i, positionY, "W")) return true
      }
      if (moveTo === undefined) break
      dir = NEXT_DIRECTION[dir]
      positionX = destination
    }
  }
}
