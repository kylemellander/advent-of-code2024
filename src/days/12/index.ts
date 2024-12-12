import input from "./input.txt?raw"
import { getNeighborIndexes, getNeighbors, setupMap } from "./shared"
export { part2 } from "./part2"

export function part1(data = input) {
  const { length, offsets, map, width } = setupMap(data)
  const usedIndexes = new Set<number>()
  let cost = 0

  for (let i = 0; i < length; i++) {
    if (usedIndexes.has(i)) continue
    const plot = [i]
    usedIndexes.add(i)

    for (let j = 0; j < plot.length; j++) {
      getNeighbors({ index: plot[j], map, width, offsets }).forEach(
        (neighbor) => {
          if (usedIndexes.has(neighbor)) return
          usedIndexes.add(neighbor)
          plot.push(neighbor)
        }
      )
    }

    const area = plot.length
    const perimeter = plot.reduce((acc, index) => {
      const neighbors = getNeighborIndexes({ index, offsets, width }).filter(
        (i) => plot.includes(i)
      )
      const walls = 4 - neighbors.length
      return acc + walls
    }, 0)

    cost += area * perimeter
  }

  return cost
}
