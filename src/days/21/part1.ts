import input from "./input.txt?raw"

const cache: Record<string, number> = {}
export function part1(data: string = input) {
  const targets = data.trim().split("\n")

  const robotsControlling = 2

  let score = 0
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i]

    const keyPresses = findKeyPresses(target, robotsControlling)
    const numeric = parseInt(target.replace(/[^\d]/g, ""))

    score += keyPresses * numeric
  }

  return score
}

const POSITIONS: {
  NUMERIC: Record<string, number[]>
  DIRECTIONAL: Record<string, number[]>
} = {
  NUMERIC: {
    7: [0, 0],
    8: [1, 0],
    9: [2, 0],
    4: [0, 1],
    5: [1, 1],
    6: [2, 1],
    1: [0, 2],
    2: [1, 2],
    3: [2, 2],
    0: [1, 3],
    A: [2, 3],
  },
  DIRECTIONAL: {
    "^": [1, 0],
    A: [2, 0],
    "<": [0, 1],
    v: [1, 1],
    ">": [2, 1],
  },
}

const OFFSETS: Record<string, number[]> = {
  "^": [0, -1],
  ">": [1, 0],
  v: [0, 1],
  "<": [-1, 0],
}

const COORDS = {
  NUMERIC: Object.values(POSITIONS.NUMERIC).map((v) => v.join(",")),
  DIRECTIONAL: Object.values(POSITIONS.DIRECTIONAL).map((v) => v.join(",")),
}

export function findKeyPresses(
  goal: string,
  robotDepth: number,
  inputKey: "NUMERIC" | "DIRECTIONAL" = "NUMERIC"
) {
  const cacheKey = `${goal}-${robotDepth}`
  if (cache[cacheKey]) return cache[cacheKey]
  const actionButton = "A"
  let position = actionButton
  let presses = 0

  for (let i = 0; i < goal.length; i++) {
    const c = goal[i]
    const pathsToChar = getAllPathsToChar(position, c, inputKey)

    if (robotDepth === 0) {
      presses += pathsToChar[0].length
    } else {
      presses += Math.min(
        ...pathsToChar.map(
          (path) => findKeyPresses(path, robotDepth - 1, "DIRECTIONAL"),
          robotDepth === 1 ? "A" : "B"
        )
      )
    }
    position = c
  }
  cache[cacheKey] = presses

  return presses
}

export function getAllPathsToChar(
  start: string,
  end: string,
  inputKey: "NUMERIC" | "DIRECTIONAL"
) {
  if (start === end) return ["A"]
  const map = POSITIONS[inputKey]

  const queue = [{ path: "", position: map[start] }]
  const endCoord = map[end]
  const pathCache: Record<string, number> = {}
  const allPaths: string[] = []
  const currentXY = map[start]
  const nextXY = map[end]
  const offsetX = nextXY[0] - currentXY[0]
  const offsetY = nextXY[1] - currentXY[1]
  const possibleMoves = [
    ...(offsetX > 0 ? [">"] : offsetX < 0 ? ["<"] : []),
    ...(offsetY > 0 ? ["v"] : offsetY < 0 ? ["^"] : []),
  ]

  while (queue.length > 0) {
    const current = queue.shift()!
    if (
      current.position[0] === endCoord[0] &&
      current.position[1] === endCoord[1]
    ) {
      allPaths.push(current.path + "A")
      continue
    }
    const cacheKey = current.position.join(",")

    if (pathCache[cacheKey] && pathCache[cacheKey] < current.path.length)
      continue

    for (let i = 0; i < possibleMoves.length; i++) {
      const move = possibleMoves[i]
      const offset = OFFSETS[move]
      const coord = [
        current.position[0] + offset[0],
        current.position[1] + offset[1],
      ]

      if (!coord) continue
      if (!COORDS[inputKey].includes(coord.join(","))) continue

      const newPath = current.path + move

      pathCache[cacheKey] = newPath.length
      queue.push({ path: newPath, position: coord })
    }
  }

  return allPaths //.sort((a, b) => a.length - b.length)
}
