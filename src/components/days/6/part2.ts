import { Coord, Direction } from "../GridMap"
import input from "./input.txt?raw"
import { NEXT_DIRECTION, part1DataPoints } from "./shared"

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
