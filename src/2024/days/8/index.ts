import input from "./input.txt?raw"

export function part1(data = input) {
  const { charMap, grid, width } = setupData(data)

  Object.keys(charMap).forEach((char) => {
    const indices = charMap[char]
    for (let a = 0; a < indices.length; a++) {
      for (let b = a + 1; b < indices.length; b++) {
        const indexA = indices[a]
        const indexB = indices[b]
        const distance = indexB - indexA
        const indexAY = findY(indexA, width)
        const indexBY = findY(indexB, width)
        const yChange = indexBY - indexAY
        // travel upward
        travelOut({
          index: indexA,
          distance: -distance,
          width,
          isValid: ({ index, y }) => !!grid[index] && yChange === indexAY - y,
          onReached: (index) => {
            if (grid[index] !== "#") grid[index] = "#"
          },
        })
        // travel downward
        travelOut({
          index: indexB,
          distance,
          width,
          isValid: ({ index, y }) => !!grid[index] && yChange === y - indexBY,
          onReached: (index) => {
            if (grid[index] !== "#") grid[index] = "#"
          },
        })
      }
    }
  })

  // console.log(joinGroupsOfN(grid, width).join("\n"))
  return countGrid(grid)
}

export function part2(data = input) {
  const { charMap, grid, width } = setupData(data)

  Object.keys(charMap).forEach((char) => {
    const indices = charMap[char]
    if (indices.length > 1) {
      indices.forEach((i) => grid[i] !== "#" && (grid[i] = "#"))
    }
    for (let a = 0; a < indices.length; a++) {
      for (let b = a + 1; b < indices.length; b++) {
        const indexA = indices[a]
        const indexB = indices[b]
        const distance = indexB - indexA
        const indexAY = findY(indexA, width)
        const indexBY = findY(indexB, width)
        const yChange = indexBY - indexAY

        // travel upward
        let lastUpIndex = indexA
        let lastUpIndexY = indexAY
        while (true) {
          const result = travelOut({
            index: lastUpIndex,
            distance: -distance,
            width,
            isValid: ({ index, y }) =>
              !!grid[index] && yChange === lastUpIndexY - y,
            onReached: (index) => {
              if (grid[index] !== "#") grid[index] = "#"
            },
          })
          if (!result) break
          lastUpIndex = result.index
          lastUpIndexY = result.y
        }

        // travel downward
        let lastDownIndex = indexA
        let lastDownIndexY = indexAY
        while (true) {
          const result = travelOut({
            index: lastDownIndex,
            distance,
            width,
            isValid: ({ index, y }) =>
              !!grid[index] && yChange === y - lastDownIndexY,
            onReached: (index) => {
              if (grid[index] !== "#") grid[index] = "#"
            },
          })
          if (!result) break
          lastDownIndex = result.index
          lastDownIndexY = result.y
        }
      }
    }
  })

  // console.log(joinGroupsOfN(grid, width).join("\n"))
  return countGrid(grid)
}

function setupData(data: string) {
  const lines = data
    .split("\n")
    .map((n) => n.trim())
    .filter(Boolean)
  const width = lines[0].length
  const gridString = lines.join("")
  const grid = gridString.split("")

  const uniqueChars = new Set<string>()
  grid.forEach((char) => {
    if (char !== ".") uniqueChars.add(char)
  })

  const charMap: Record<string, number[]> = {}
  uniqueChars.forEach((char: string) => {
    charMap[char] = allIndicies(gridString, char)
  })

  return { charMap, grid, width }
}

function allIndicies(str: string, char: string): number[] {
  const indices = []
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) indices.push(i)
  }
  return indices
}

function findY(index: number, width: number) {
  return Math.floor(index / width)
}

function travelOut({
  index,
  distance,
  width,
  isValid,
  onReached,
}: {
  index: number
  distance: number
  width: number
  isValid(args: { index: number; y: number }): boolean
  onReached: (index: number) => void
}): false | { index: number; y: number } {
  const i = index + distance
  const y = findY(i, width)
  if (!isValid({ index: i, y })) return false
  onReached(i)
  return { index: i, y }
}

function countGrid(grid: string[]) {
  let count = 0
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] === "#") count++
  }
  return count
}

export function joinGroupsOfN(arr: string[], n: number): string[] {
  const result: string[] = []
  for (let i = 0; i < arr.length; i += n) {
    const group = arr.slice(i, i + n)
    result.push(group.join(""))
  }
  return result
}
