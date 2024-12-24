import input from "./input.txt?raw"

export function part1(data: string = input) {
  const connections = data
    .trim()
    .split("\n")
    .reduce((acc, line) => {
      const [a, b] = line.split("-")
      if (!acc[a]) acc[a] = []
      if (!acc[b]) acc[b] = []
      acc[a].push(b)
      acc[b].push(a)
      return acc
    }, {} as Record<string, string[]>)

  const triads: string[] = []
  const keys = Object.keys(connections)

  for (let i = 0; i < keys.length; i++) {
    const checkedComputer = keys[i]
    if (!checkedComputer.startsWith("t")) continue

    const connectedComputers = connections[checkedComputer]

    for (let j = 0; j < connectedComputers.length; j++) {
      for (let k = j + 1; k < connectedComputers.length; k++) {
        if (
          connections[connectedComputers[j]].includes(connectedComputers[k])
        ) {
          const key = [
            checkedComputer,
            connectedComputers[j],
            connectedComputers[k],
          ]
            .sort()
            .join("-")
          if (triads.includes(key)) continue

          triads.push(key)
        }
      }
    }
  }

  return triads.length
}
