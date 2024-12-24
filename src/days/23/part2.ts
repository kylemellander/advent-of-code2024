import input from "./input.txt?raw"

export function part2(data: string = input) {
  const connections = data
    .trim()
    .split("\n")
    .reduce((acc, line) => {
      const [a, b] = line.split("-")
      if (!acc[a]) acc[a] = []
      if (!acc[b]) acc[b] = []
      acc[a].push(b)
      acc[b].push(a)
      acc[a] = acc[a].sort()
      acc[b] = acc[b].sort()
      return acc
    }, {} as Record<string, string[]>)

  return findBiggestNetwork(connections)
}

function findBiggestNetwork(connections: Record<string, string[]>) {
  const keysSortedByMostConnections = Object.keys(connections)
  const longest = connections[keysSortedByMostConnections[0]].length

  for (let n = 0; n < longest; n++) {
    const elementsToSelect = longest - n
    for (let i = 0; i < keysSortedByMostConnections.length; i++) {
      const key = keysSortedByMostConnections[i]
      const connected = connections[key]
      const groupsWithNMissing = getCombinations(connected, elementsToSelect)
      const group = [key, ...groupsWithNMissing[0]]
      let looped = true
      for (let j = 0; j < group.length; j++) {
        if (!looped) break
        for (let k = j + 1; k < group.length; k++) {
          if (!connections[group[j]].includes(group[k])) {
            looped = false
            break
          }
        }
      }
      if (looped) return group.sort().join(",")
    }
  }
  return ""
}

function getCombinations(array: string[], n: number): string[][] {
  const result: string[][] = []

  function combine(start: number, path: string[]) {
    if (path.length === n) {
      result.push([...path])
      return
    }

    for (let i = start; i < array.length; i++) {
      path.push(array[i])
      combine(i + 1, path)
      path.pop()
    }
  }

  combine(0, [])
  return result
}
