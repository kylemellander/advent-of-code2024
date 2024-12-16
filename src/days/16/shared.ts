type QueueItem = { loc: number; path: number[]; dir: number; score: number }

const cache: Record<string, { path: number[]; score: number }[]> = {}

export function findPaths(data: string) {
  if (cache[data]) return cache[data]
  const lines = data
    .trim()
    .split("\n")
    .map((line) => line.trim())
  const width = lines[0].length
  const grid = lines.join("").split("")
  const end = grid.indexOf("E")
  const start = grid.indexOf("S")
  const offsets = [-width, 1, width, -1]
  const startingDir = 1
  const queue: QueueItem[] = [
    { loc: start, path: [start], dir: startingDir, score: 0 },
  ]
  const potentialPaths = []
  const visitedNodes: Record<number, number> = {}
  let lowestScore = Infinity

  while (queue.length > 0) {
    const { loc, path, dir, score } = queue.shift() as QueueItem
    if (score > lowestScore) continue
    if (loc === end) {
      potentialPaths.push({ path, score })
      lowestScore = Math.min(lowestScore, score)
      continue
    }
    for (let o = 0; o < offsets.length; o++) {
      if (o + (2 % 4) === dir) continue
      const next = loc + offsets[o]

      if (path.includes(next)) continue
      if (grid[next] === "#") continue
      const newScore = score + 1 + (o === dir ? 0 : 1000)
      if (visitedNodes[next] && visitedNodes[next] + 1000 < newScore) continue
      visitedNodes[next] = newScore
      queue.push({ loc: next, path: [...path, next], dir: o, score: newScore })
    }
  }
  cache[data] = potentialPaths
  return potentialPaths
}
