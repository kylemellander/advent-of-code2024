import input from "../inputs/6.txt?raw"

export function part1(data = input) {
  const { positionsVisited } = part1DataPoints(data)
  return Object.keys(positionsVisited).length
}

type Coord = { x: number; y: number }

function part1DataPoints(data: string) {
  let position: Coord = { x: 0, y: 0 }
  let startingPosition = ""
  const positionsVisited = {} as Record<string, string[]>
  let dir = "N"
  let upperX = 0
  let upperY = 0

  const obstacles = data
    .split("\n")
    .map((n) => n.trim())
    .filter(Boolean)
    .reduce((acc, line, y) => {
      upperY = Math.max(upperY, y)
      const obstacles = line.split("").reduce((ac, value, x) => {
        upperX = Math.max(upperX, x)
        if (value === "#") return [...ac, { x, y }]
        if (value === "^") {
          position = { x, y }
          startingPosition = `${x},${y}`
          positionsVisited[`${x},${y}`] = ["N"]
        }
        return ac
      }, [] as Coord[])
      return [...acc, ...obstacles]
    }, [] as Coord[])

  while (true) {
    if (dir === "N") {
      const moveTo = obstacles
        .filter(({ x, y }) => {
          return x === position.x && y < position.y
        })
        .reduce((acc, { y }) => {
          if (acc === undefined) return y
          if (acc < y) return y
          return acc
        }, undefined as number | undefined)
      const destination = moveTo === undefined ? 0 : moveTo + 1
      for (let i = position.y - 1; i >= destination; i--) {
        positionsVisited[`${position.x},${i}`] ||= []
        positionsVisited[`${position.x},${i}`].push("N")
      }
      if (moveTo == undefined) break
      dir = NEXT_DIRECTION[dir]
      position.y = destination
    } else if (dir === "S") {
      const moveTo = obstacles
        .filter(({ x, y }) => {
          return x === position.x && y > position.y
        })
        .reduce((acc, { y }) => {
          if (acc === undefined) return y
          if (acc > y) return y
          return acc
        }, undefined as number | undefined)
      const destination = moveTo === undefined ? upperY : moveTo - 1

      for (let i = position.y + 1; i <= destination; i++) {
        positionsVisited[`${position.x},${i}`] ||= []
        positionsVisited[`${position.x},${i}`].push("S")
      }
      if (moveTo == undefined) break
      dir = NEXT_DIRECTION[dir]
      position.y = destination
    } else if (dir === "E") {
      const moveTo = obstacles
        .filter(({ x, y }) => {
          return y === position.y && x > position.x
        })
        .reduce((acc, { x }) => {
          if (acc === undefined) return x
          if (acc > x) return x
          return acc
        }, undefined as number | undefined)
      const destination = moveTo === undefined ? upperX : moveTo - 1
      for (let i = position.x + 1; i <= destination; i++) {
        positionsVisited[`${i},${position.y}`] ||= []
        positionsVisited[`${i},${position.y}`].push("E")
      }
      if (moveTo == undefined) break
      dir = NEXT_DIRECTION[dir]
      position.x = destination
    } else if (dir === "W") {
      const moveTo = obstacles
        .filter(({ x, y }) => {
          return y === position.y && x < position.x
        })
        .reduce((acc, { x }) => {
          if (acc === undefined) return x
          if (acc < x) return x
          return acc
        }, undefined as number | undefined)
      const destination = moveTo === undefined ? 0 : moveTo + 1
      for (let i = position.x - 1; i >= destination; i--) {
        positionsVisited[`${i},${position.y}`] ||= []
        positionsVisited[`${i},${position.y}`].push("W")
      }
      if (moveTo == undefined) break
      dir = NEXT_DIRECTION[dir]
      position.x = moveTo + 1
    }
  }
  return { startingPosition, positionsVisited, upperX, upperY, obstacles }
}

const NEXT_DIRECTION = {
  N: "E",
  E: "S",
  S: "W",
  W: "N",
}

export function part2(data = input) {
  const { startingPosition, positionsVisited, upperX, upperY, obstacles } =
    part1DataPoints(data)

  const potentialNewObstacles = Object.keys(positionsVisited).filter(
    (rawCoord) => {
      const [x, y] = rawCoord.split(",").map(Number)
      return hasInfiniteLoop({
        startingPosition,
        obstacles: [...obstacles, { x, y }],
        upperX,
        upperY,
      })
    }
  )

  return potentialNewObstacles.length
}

function hasInfiniteLoop({
  startingPosition,
  obstacles,
  upperX,
  upperY,
}: {
  startingPosition: string
  obstacles: Coord[]
  upperX: number
  upperY: number
}) {
  const positionsVisited = {} as Record<string, string[]>
  let [positionX, positionY] = startingPosition.split(",").map(Number)
  let dir = "N"

  while (true) {
    if (dir === "N") {
      const moveTo = obstacles
        .filter(({ x, y }) => {
          return x === positionX && y < positionY
        })
        .reduce((acc, { y }) => {
          if (acc === undefined) return y
          if (acc < y) return y
          return acc
        }, undefined as number | undefined)
      const destination = moveTo === undefined ? 0 : moveTo + 1
      for (let i = positionY - 1; i >= destination; i--) {
        positionsVisited[`${positionX},${i}`] ||= []
        if (positionsVisited[`${positionX},${i}`].includes("N")) return true
        positionsVisited[`${positionX},${i}`].push("N")
      }
      if (moveTo == undefined) break
      dir = NEXT_DIRECTION[dir]
      positionY = destination
    } else if (dir === "S") {
      const moveTo = obstacles
        .filter(({ x, y }) => {
          return x === positionX && y > positionY
        })
        .reduce((acc, { y }) => {
          if (acc === undefined) return y
          if (acc > y) return y
          return acc
        }, undefined as number | undefined)
      const destination = moveTo === undefined ? upperY : moveTo - 1

      for (let i = positionY + 1; i <= destination; i++) {
        positionsVisited[`${positionX},${i}`] ||= []
        if (positionsVisited[`${positionX},${i}`].includes("S")) return true
        positionsVisited[`${positionX},${i}`].push("S")
      }
      if (moveTo == undefined) break
      dir = NEXT_DIRECTION[dir]
      positionY = destination
    } else if (dir === "E") {
      const moveTo = obstacles
        .filter(({ x, y }) => {
          return y === positionY && x > positionX
        })
        .reduce((acc, { x }) => {
          if (acc === undefined) return x
          if (acc > x) return x
          return acc
        }, undefined as number | undefined)
      const destination = moveTo === undefined ? upperX : moveTo - 1
      for (let i = positionX + 1; i <= destination; i++) {
        positionsVisited[`${i},${positionY}`] ||= []
        if (positionsVisited[`${i},${positionY}`].includes("E")) return true
        positionsVisited[`${i},${positionY}`].push("E")
      }
      if (moveTo == undefined) break
      dir = NEXT_DIRECTION[dir]
      positionX = destination
    } else if (dir === "W") {
      const moveTo = obstacles
        .filter(({ x, y }) => {
          return y === positionY && x < positionX
        })
        .reduce((acc, { x }) => {
          if (acc === undefined) return x
          if (acc < x) return x
          return acc
        }, undefined as number | undefined)
      const destination = moveTo === undefined ? 0 : moveTo + 1
      for (let i = positionX - 1; i >= destination; i--) {
        positionsVisited[`${i},${positionY}`] ||= []
        if (positionsVisited[`${i},${positionY}`].includes("W")) return true
        positionsVisited[`${i},${positionY}`].push("W")
      }
      if (moveTo == undefined) break
      dir = NEXT_DIRECTION[dir]
      positionX = moveTo + 1
    }
  }
}
