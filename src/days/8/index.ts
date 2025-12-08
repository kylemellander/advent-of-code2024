import input from "./input.txt?raw"

export function part1(data: string = input, connections = 1000) {
  const lines = data
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(",").map((n) => parseInt(n)))

  let shortestConnections = []

  for (let i = 0; i < lines.length; i++) {
    const [x1, y1, z1] = lines[i]
    for (let j = i + 1; j < lines.length; j++) {
      const [x2, y2, z2] = lines[j]
      const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2)
      shortestConnections.push({ a: i, b: j, dist })
    }
  }
  if (shortestConnections.length > connections) {
    shortestConnections = shortestConnections
      .sort((a, b) => a.dist - b.dist)
      .slice(0, connections)
  }

  const circuits = findCircuits(shortestConnections, lines.length)
  return circuits
    .sort((a, b) => b.length - a.length)
    .slice(0, 3)
    .reduce((acc, c) => {
      return acc * c.length
    }, 1)
}

export function part2(data: string = input, connections: number = 1000) {
  const lines = data
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(",").map((n) => parseInt(n)))

  const shortestConnections = []

  for (let i = 0; i < lines.length; i++) {
    const [x1, y1, z1] = lines[i]
    for (let j = i + 1; j < lines.length; j++) {
      const [x2, y2, z2] = lines[j]
      const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2)
      shortestConnections.push({ a: i, b: j, dist })
    }
  }
  shortestConnections.sort((a, b) => a.dist - b.dist)

  let left = connections
  let right = shortestConnections.length - 1
  let result = -1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const circuits = findCircuits(
      shortestConnections.slice(0, mid + 1),
      lines.length
    )

    if (circuits.length === 1) {
      result = mid
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  const lastConnection = shortestConnections[result]
  return lines[lastConnection!.a][0] * lines[lastConnection!.b][0]
}

function findCircuits(
  connections: { a: number; b: number; dist: number }[],
  length: number
) {
  const circuits = []
  const visited = new Set<number>()

  for (let i = 0; i < length; i++) {
    if (visited.has(i)) continue

    const queue: number[] = [i]
    const junctionsInCircuit = [i]
    while (queue.length > 0) {
      const current = queue.shift()!
      const connectionsConnected = connections.filter(
        (c) => c.a === current || c.b === current
      )
      connectionsConnected.forEach((c) => {
        const otherJunction = c.a === current ? c.b : c.a
        if (!junctionsInCircuit.includes(otherJunction)) {
          junctionsInCircuit.push(otherJunction)
          queue.push(otherJunction)
        }
      })
    }

    circuits.push(junctionsInCircuit)
    junctionsInCircuit.forEach((j) => visited.add(j))
  }

  return circuits
}
