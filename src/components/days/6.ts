import input from "../inputs/6.txt?raw"
import { Coord, Direction, GridMap } from "./GridMap"

export function part1(data = input) {
  const gridMap = generateGridMap(data)
  gridMap.moveUntilOutOfBounds()
  return Object.keys(gridMap.positionsVisited).length
}

export function part2(data = input) {
  const gridMap = generateGridMap(data)
  const startingPosition = `${gridMap.startingPosition.x},${gridMap.startingPosition.y}`
  gridMap.moveUntilOutOfBounds()
  const originalRawObstacles = gridMap.rawObstacles.slice()
  const potentialNewObstacles = Object.keys(gridMap.positionsVisited).filter(
    (rawCoord) => {
      if (rawCoord === startingPosition) return false
      gridMap.rawObstacles = [...originalRawObstacles, rawCoord]
      return gridMap.isLoop()
    }
  )

  console.log(potentialNewObstacles)
  return potentialNewObstacles.length
}

const NEXT_DIRECTION = {
  N: "E" as Direction,
  E: "S" as Direction,
  S: "W" as Direction,
  W: "N" as Direction,
}

class GridMapWithObstacles extends GridMap {
  rawObstacles: string[]

  constructor({
    width,
    height,
    startingPosition,
    startingDirection,
    obstacles,
  }: {
    width: number
    height: number
    startingPosition: Coord
    startingDirection: "N" | "E" | "S" | "W"
    obstacles: Coord[]
  }) {
    super({ width, height, startingPosition, startingDirection })
    this.rawObstacles = obstacles.map(({ x, y }) => `${x},${y}`)
    this.movementValidations.push(
      ({ x, y }) => !this.rawObstacles.includes(`${x},${y}`)
    )
    this.onBlockedCallbacks.push(() => {
      this.direction = NEXT_DIRECTION[this.direction]
    })
  }

  duplicate() {
    return new GridMapWithObstacles({
      width: this.width,
      height: this.height,
      startingPosition: this.startingPosition,
      startingDirection: this.startingDirection,
      obstacles: this.rawObstacles.map((rawCoord) => {
        const [x, y] = rawCoord.split(",").map(Number)
        return { x, y }
      }),
    })
  }

  moveUntilOutOfBounds() {
    let hasReachedOutOfBounds = false
    this.onOutOfBoundsCallbacks.push(() => {
      hasReachedOutOfBounds = true
    })
    while (!hasReachedOutOfBounds) {
      this.move()
    }
  }

  isLoop() {
    this.reset()
    let outOfBounds = false
    let inLoop = false
    this.onRepeatedActionCallbacks.push(() => (inLoop = true))
    this.onOutOfBoundsCallbacks.push(() => (outOfBounds = true))
    while (!outOfBounds && !inLoop) this.move()

    return inLoop
  }
}

function generateGridMap(data: string) {
  const {
    data: { obstacles, startingPosition },
    height,
    width,
  } = buildGridMapData({
    data,
    outputData: { obstacles: [] as Coord[], startingPosition: { x: 0, y: 0 } },

    onChar: ({ char, x, y, data }) => {
      if (char === "#") data.obstacles.push({ x, y })
      if (char === "^") data.startingPosition = { x, y }
    },
  })
  return new GridMapWithObstacles({
    width,
    height,
    startingPosition,
    startingDirection: "N",
    obstacles,
  })
}

function buildGridMapData<D>({
  data,
  onChar,
  outputData,
}: {
  data: string
  outputData: D
  onChar: (data: { char: string; x: number; y: number; data: D }) => void
}) {
  const points = data
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
  points.forEach((line, y) => {
    line.split("").forEach((char, x) => {
      onChar({ char, x, y, data: outputData })
    })
  })
  return { data: outputData, height: points.length, width: points[0].length }
}
