type QueueItem = { loc: number; path: number[]; dir: number; score: number }

type PriorityQueue<T> = {
  enqueue(item: T, priority: number): void
  dequeue(): T | undefined
  isEmpty(): boolean
  length: number
  elements: T[]
}

export function createPriorityQueue<T>(): PriorityQueue<T> {
  const elements: { item: T; priority: number }[] = []

  function swap(i: number, j: number) {
    ;[elements[i], elements[j]] = [elements[j], elements[i]]
  }

  function bubbleUp(index: number) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2)
      if (elements[index].priority >= elements[parent].priority) break
      swap(index, parent)
      index = parent
    }
  }

  function bubbleDown(index: number) {
    const length = elements.length
    while (true) {
      const left = 2 * index + 1
      const right = 2 * index + 2
      let smallest = index

      if (
        left < length &&
        elements[left].priority < elements[smallest].priority
      ) {
        smallest = left
      }
      if (
        right < length &&
        elements[right].priority < elements[smallest].priority
      ) {
        smallest = right
      }
      if (smallest === index) break

      swap(index, smallest)
      index = smallest
    }
  }

  return {
    enqueue(item, priority) {
      elements.push({ item, priority })
      bubbleUp(elements.length - 1)
    },
    dequeue() {
      if (elements.length === 0) return undefined
      const top = elements[0].item
      const last = elements.pop()
      if (elements.length > 0 && last) {
        elements[0] = last
        bubbleDown(0)
      }
      return top
    },
    isEmpty() {
      return elements.length === 0
    },
    get length() {
      return elements.length
    },
    get elements() {
      return elements.map(({ item }) => item)
    },
  }
}

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
  const queue = createPriorityQueue<QueueItem>()
  queue.enqueue({ loc: start, path: [start], dir: startingDir, score: 0 }, 0)
  const potentialPaths = []
  const visitedNodes: Record<number, number> = {}
  let lowestScore = Infinity

  while (!queue.isEmpty()) {
    const { loc, path, dir, score } = queue.dequeue()!
    if (loc === end) {
      potentialPaths.push({ path, score })
      lowestScore = Math.min(lowestScore, score)
      continue
    }
    if (score > lowestScore) continue
    for (let o = 0; o < offsets.length; o++) {
      if ((dir + 2) % 4 === o) continue
      const next = loc + offsets[o]

      if (grid[next] === "#" || path.includes(next)) continue
      const turnPenalty = o === dir ? 0 : 1000
      const newScore = score + 1 + turnPenalty
      if (visitedNodes[next] && visitedNodes[next] + 1000 < newScore) continue
      visitedNodes[next] = newScore
      queue.enqueue(
        { loc: next, path: [...path, next], dir: o, score: newScore },
        newScore
      )
    }
  }
  cache[data] = potentialPaths
  return potentialPaths
}
