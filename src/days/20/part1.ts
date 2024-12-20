import { createPriorityQueue } from "../16/shared"
import input from "./input.txt?raw"

export function part1(data: string = input, timeToSave = 100) {
  const cache: Record<number, number> = {}
  const { grid, offsets } = cacheSecondsToGetToEachLocation(data, cache)

  let countOfCheatsForTargetTimeToSave = 0

  const cacheKeys: number[] = Object.keys(cache).map(Number)
  for (let i = 0; i < cacheKeys.length; i++) {
    const current = cacheKeys[i]
    for (let o = 0; o < offsets.length; o++) {
      const next = current + 2 * offsets[o]

      if (grid[next] === "#") continue
      if (cache[next] === undefined) continue
      const differenceIfAvoided = cache[next] - cache[current] - 2
      if (differenceIfAvoided >= timeToSave) countOfCheatsForTargetTimeToSave++
    }
  }

  return countOfCheatsForTargetTimeToSave
}

export function cacheSecondsToGetToEachLocation(
  data: string,
  cache: Record<number, number>
) {
  const lines = data
    .trim()
    .split("\n")
    .map((line) => line.trim())
  const width = lines[0].length
  const grid = lines.join("").split("")
  const end = grid.indexOf("E")
  const start = grid.indexOf("S")
  const offsets = [-width, 1, width, -1]
  const queue = createPriorityQueue<{ i: number; score: number }>()
  queue.enqueue({ i: start, score: 0 }, 0)

  while (!queue.isEmpty()) {
    const { i, score } = queue.dequeue()!
    cache[i] = score
    if (i === end) continue

    for (let o = 0; o < offsets.length; o++) {
      const next = i + offsets[o]
      if (grid[next] === "#") continue
      if (cache[next] !== undefined) continue

      const newScore = score + 1
      queue.enqueue({ i: next, score: newScore }, newScore)
    }
  }

  return { grid, offsets, width }
}
