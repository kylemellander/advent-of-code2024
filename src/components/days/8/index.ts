import input from "./input.txt?raw"

export function part1(data = input) {
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

  uniqueChars.forEach((char: string) => {
    const indices = allIndicies(gridString, char)
    for (let a = 0; a < indices.length; a++) {
      for (let b = a + 1; b < indices.length; b++) {
        const indexA = indices[a]
        const indexB = indices[b]
        const distance = indexB - indexA
        const indexAVert = Math.floor(indexA / width)
        const indexBVert = Math.floor(indexB / width)
        const lowerAntinode = indexA - distance
        const upperAntinode = indexB + distance
        const lowerAntinodeVert = Math.floor(lowerAntinode / width)
        const upperAntinodeVert = Math.floor(upperAntinode / width)

        if (
          grid[lowerAntinode] !== undefined &&
          grid[lowerAntinode] !== "#" &&
          indexBVert - indexAVert === indexAVert - lowerAntinodeVert
        ) {
          grid[lowerAntinode] = "#"
        }
        if (
          grid[upperAntinode] !== undefined &&
          grid[upperAntinode] !== "#" &&
          indexBVert - indexAVert === upperAntinodeVert - indexBVert
        ) {
          grid[upperAntinode] = "#"
        }
      }
    }
  })

  // console.log(joinGroupsOfN(grid, width).join("\n"))
  let count = 0
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] === "#") count++
  }
  return count
}

export function part2(data = input) {
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
        const indexAVert = Math.floor(indexA / width)
        const indexBVert = Math.floor(indexB / width)
        const vertSteps = indexBVert - indexAVert
        let lastLowerAntinode = indexA
        let lastLowerAntinodeVert = indexAVert
        while (true) {
          const lowerAntinode = lastLowerAntinode - distance
          const lowerAntinodeVert = Math.floor(lowerAntinode / width)
          if (
            grid[lowerAntinode] === undefined ||
            vertSteps !== lastLowerAntinodeVert - lowerAntinodeVert
          ) {
            break
          }
          if (grid[lowerAntinode] !== "#") grid[lowerAntinode] = "#"
          lastLowerAntinode = lowerAntinode
          lastLowerAntinodeVert = lowerAntinodeVert
        }
        let lastUpperAntinode = indexB
        let lastUpperAntinodeVert = indexBVert
        while (true) {
          const upperAntinode = lastUpperAntinode + distance
          const upperAntinodeVert = Math.floor(upperAntinode / width)
          if (
            grid[upperAntinode] === undefined ||
            vertSteps !== upperAntinodeVert - lastUpperAntinodeVert
          ) {
            break
          }
          if (grid[upperAntinode] !== "#") grid[upperAntinode] = "#"
          lastUpperAntinode = upperAntinode
          lastUpperAntinodeVert = upperAntinodeVert
        }
      }
    }
  })

  // console.log(joinGroupsOfN(grid, width).join("\n"))
  let count = 0
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] === "#") count++
  }
  return count
}

function allIndicies(str: string, char: string): number[] {
  const indices = []
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) indices.push(i)
  }
  return indices
}

export function joinGroupsOfN(arr: string[], n: number): string[] {
  const result: string[] = []
  for (let i = 0; i < arr.length; i += n) {
    const group = arr.slice(i, i + n)
    result.push(group.join(""))
  }
  return result
}
