import input from "../inputs/6.txt?raw"
import { Coord, Direction, GridMap, OPPPOSITE_DIRECTION } from "./GridMap"

export function part1(data = input) {
  const gridMap = generateGridMap(data)
  gridMap.moveUntilOutOfBounds()
  return Object.keys(gridMap.positionsVisited).length
}

const NEXT_DIRECTION = {
  N: "E" as Direction,
  E: "S" as Direction,
  S: "W" as Direction,
  W: "N" as Direction,
}

export function part2(data = input) {
  const gridMap = generateGridMap(data)
  const startingPosition = `${gridMap.startingPosition.x},${gridMap.startingPosition.y}`
  gridMap.moveUntilOutOfBounds()
  const originalRawObstacles = gridMap.rawObstacles.slice()
  const originalPositionsVisited = { ...gridMap.positionsVisited }
  let longestTime = 0
  const start = performance.now()

  const potentialNewObstacles = []
  const keys = Object.keys(originalPositionsVisited)
  for (let i = 0; i < keys.length; i++) {
    const rawCoord = keys[i]
    if (rawCoord === startingPosition) continue
    const start = performance.now()
    gridMap.rawObstacles = [...originalRawObstacles, rawCoord]
    const firstPassDir = originalPositionsVisited[rawCoord][0] as Direction
    const [oX, oY] = rawCoord.split(",").map(Number)
    const { x, y } = move1({ x: oX, y: oY }, OPPPOSITE_DIRECTION[firstPassDir])
    const result = gridMap.isLoop({ x, y, direction: firstPassDir })
    const elapsed = performance.now() - start

    if (elapsed > longestTime) {
      longestTime = elapsed
      console.log("Longest time: ", longestTime, rawCoord, result, i)
    } else if (elapsed > 20) {
      console.log("Long time: ", elapsed, rawCoord, result, i)
    }

    if (result) potentialNewObstacles.push(rawCoord)
  }

  console.log(
    "Avg time: ",
    (performance.now() - start) / potentialNewObstacles.length
  )

  return potentialNewObstacles.length
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
    startingDirection: Direction
    obstacles: Coord[]
  }) {
    super({
      width,
      height,
      startingPosition,
      startingDirection,
    })
    this.rawObstacles = obstacles.map(({ x, y }) => `${x},${y}`)
    this.movementValidations.push(
      ({ x, y }) => !this.rawObstacles.includes(`${x},${y}`)
    )
    this.onBlockedCallbacks.push(() => {
      this.direction = NEXT_DIRECTION[this.direction]
    })
  }

  moveUntilOutOfBounds() {
    let hasReachedOutOfBounds = false
    const outOfBoundsCallback = () => {
      hasReachedOutOfBounds = true
    }
    this.onOutOfBoundsCallbacks.push(outOfBoundsCallback)
    while (!hasReachedOutOfBounds) this.move()
    this.onOutOfBoundsCallbacks = this.onOutOfBoundsCallbacks.filter(
      (cb) => cb !== outOfBoundsCallback
    )
  }

  isLoop({
    x = this.startingPosition.x,
    y = this.startingPosition.y,
    direction = this.startingDirection,
  }: { x?: number; y?: number; direction?: Direction } = {}) {
    this.reset({ startingPosition: { x, y }, startingDirection: direction })
    let outOfBounds = false
    let inLoop = false
    const repeatedActionCallback = () => (inLoop = true)
    const outOfBoundsCallback = () => (outOfBounds = true)
    this.onRepeatedActionCallbacks.push(repeatedActionCallback)
    this.onOutOfBoundsCallbacks.push(outOfBoundsCallback)
    while (!outOfBounds && !inLoop) this.move()
    this.onRepeatedActionCallbacks = this.onRepeatedActionCallbacks.filter(
      (cb) => cb !== repeatedActionCallback
    )
    this.onOutOfBoundsCallbacks = this.onOutOfBoundsCallbacks.filter(
      (cb) => cb !== outOfBoundsCallback
    )
    return inLoop
  }
}

function generateGridMap(data: string) {
  const {
    data: gridData,
    height,
    width,
  } = buildGridMapData({
    data,
    outputData: { obstacles: [] as Coord[], startingPosition: { x: 0, y: 0 } },

    onChar: ({ char, x, y, data }) => {
      if (char === "#") data.obstacles.push({ x, y })
      else if (char === "^") data.startingPosition = { x, y }
    },
  })
  return new GridMapWithObstacles({
    width,
    height,
    startingPosition: gridData.startingPosition,
    startingDirection: "N",
    obstacles: gridData.obstacles,
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
  const height = points.length
  const width = points[0].length
  for (let y = 0; y < height; y++) {
    const line = points[y]
    for (let x = 0; x < width; x++) {
      onChar({ char: line[x], x, y, data: outputData })
    }
  }
  return { data: outputData, height, width }
}

function move1(coord: Coord, direction: Direction) {
  switch (direction) {
    case "N":
      return { x: coord.x, y: coord.y - 1 }
    case "S":
      return { x: coord.x, y: coord.y + 1 }
    case "E":
      return { x: coord.x + 1, y: coord.y }
    case "W":
      return { x: coord.x - 1, y: coord.y }
    default:
      return coord
  }
}
