export function setupMap(data: string) {
  const lines = data
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
  const width = lines[0].length
  const height = lines.length
  const length = height * width
  const offsets = [-width, 1, width, -1]
  const map = lines.join("")

  return { length, offsets, map, width, height }
}

export function getNeighbors({
  index,
  map,
  width,
  offsets,
}: {
  index: number
  map: string
  width: number
  offsets: number[]
}) {
  const value = map[index]
  return getNeighborIndexes({ index, width, offsets }).filter(
    (i) => map[i] === value
  )
}

export function getNeighborIndexes({
  offsets,
  index,
  width,
}: {
  index: number
  offsets: number[]
  width: number
}) {
  return offsets.map((offset) => {
    const i = index + offset
    if (isHorizontal(offset) && !isInSameRow(index, i)) return -1
    return i
  })

  function isHorizontal(offset: number) {
    return offsets.indexOf(offset) % 2 === 1
  }

  function isInSameRow(index: number, i: number) {
    return Math.floor(i / width) === Math.floor(index / width)
  }
}
