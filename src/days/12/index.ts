import input from "./input.txt?raw"
export { part2 } from "./part2"

export function part1(data = input) {
  const lines = data
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
  const width = lines[0].length
  const length = lines.length * width
  const offsets = [-width, 1, width, -1]
  const map = lines.join("")

  const usedIndexes = new Set<number>()

  let cost = 0

  for (let i = 0; i < length; i++) {
    if (usedIndexes.has(i)) continue
    const plot = [i]
    usedIndexes.add(i)

    for (let j = 0; j < plot.length; j++) {
      getNeighbors(plot[j]).forEach((neighbor) => {
        if (usedIndexes.has(neighbor)) return
        usedIndexes.add(neighbor)
        plot.push(neighbor)
      })
    }

    const area = plot.length
    const perimeter = plot.reduce((acc, index) => {
      const neighbors = getNeighborIndexes(index).filter((i) =>
        plot.includes(i)
      )
      const walls = 4 - neighbors.length
      return acc + walls
    }, 0)

    cost += area * perimeter
  }

  return cost

  function getNeighbors(index: number) {
    const value = map[index]
    return getNeighborIndexes(index).filter((i) => map[i] === value)
  }
  function getNeighborIndexes(index: number) {
    return offsets.map((offset) => {
      const i = index + offset
      if (
        offsets.indexOf(offset) % 2 === 1 &&
        Math.floor(i / width) !== Math.floor(index / width)
      )
        return -1
      return i
    })
  }
}
