import { createPriorityQueue } from "../16/shared"
import input from "./input.txt?raw"

export function part1(
  data: string = input,
  {
    height = 71,
    width = 71,
    bytes = 1024,
  }: { height?: number; width?: number; bytes?: number } = {}
) {
  const coords = data
    .trim()
    .split("\n")
    .filter(Boolean)
    .slice(0, bytes)
    .map((line) => line.split(",").map(Number))
    .map(([x, y]) => x + y * width)
  const coordSet = new Set(coords)

  // let result = ""
  // for (let i = 0; i < height * width; i++) {
  //   if (i % width === 0) result += "\n"
  //   if (coordSet.has(i)) result += "#"
  //   else result += "."
  // }
  // console.log(result)

  return findPaths(coordSet, width, height, 0, height * width - 1)
    .shortestPathScore
}

export function findPaths(
  coords: Set<number>,
  width: number,
  height: number,
  start: number,
  end: number
  // limit: number = Infinity
) {
  const offsets = [-width, 1, width, -1]
  const queue = createPriorityQueue<{ loc: number; score: number }>()
  queue.enqueue({ loc: start, score: 0 }, 0)

  let shortestPathScore = Infinity
  const visitedNodes: Record<number, number> = {}

  while (!queue.isEmpty()) {
    const { loc, score } = queue.dequeue()!
    // if (score > limit) continue
    // if (queue.length % 100 === 0)
    //   console.log(queue.length, loc, score, visitedNodes[loc])
    if (loc === end) {
      shortestPathScore = Math.min(shortestPathScore, score)
      continue
    }
    if (score > shortestPathScore) continue
    for (let o = 0; o < offsets.length; o++) {
      const next = loc + offsets[o]
      if (coords.has(next)) continue
      if (visitedNodes[next] && visitedNodes[next] <= score + 1) continue
      if (next < 0 || next >= width * height) continue
      if (o % 2 === 1 && Math.abs((loc % width) - (next % width)) > 1) continue

      visitedNodes[next] = score + 1
      queue.enqueue(
        { loc: next, score: visitedNodes[next] },
        (next % width) * Math.floor(next / width)
      )
    }
  }

  return { visitedNodes, shortestPathScore }
}
