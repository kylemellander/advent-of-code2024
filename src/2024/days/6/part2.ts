import input from "./input.txt?raw"
import { findObstacle, part1Data } from "./shared"

export function part2(data = input) {
  const { positionsVisited, grid, width, offsets, startIndex } = part1Data(data)
  const potentials = Object.keys(positionsVisited)
    .map((n) => parseInt(n))
    .filter((index) => index !== startIndex)
  const potentialNewObstacles = potentials.filter((index) => {
    const startDir = positionsVisited[index][0]
    const startIndex = offsets[(startDir + 2) % 4] + index
    const newGrid = grid.substring(0, index) + "#" + grid.substring(index + 1)
    const result = hasInfiniteLoop({
      startIndex,
      startDir,
      grid: newGrid,
      width,
      offsets,
    })
    return result
  })
  return potentialNewObstacles.length
}

function hasInfiniteLoop({
  startIndex,
  startDir,
  grid,
  width,
  offsets,
}: {
  startIndex: number
  startDir: number
  grid: string
  width: number
  offsets: number[]
}) {
  const positionsVisited = {} as Record<string, number[]>
  let dir = startDir
  let index = startIndex

  while (index >= 0 && index < grid.length) {
    const offset = offsets[dir]
    const { obstacle, stopAt } = findObstacle(grid, index, offset, width)
    for (let i = index; i !== obstacle; i += offset) {
      if (positionsVisited[i]?.includes(dir)) return true
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

  return false
}
