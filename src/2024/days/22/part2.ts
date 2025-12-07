import input from "./input.txt?raw"

export function part2(data: string = input) {
  const secretNumberToFind = 2000n
  const startingNumbers = data.trim().split("\n").map(BigInt)
  const histories = startingNumbers.map((start) => {
    return findSecretNumberHistory(start, secretNumberToFind)
  })
  // console.log(histories)
  const optimalPrice = findOptimalPrice(histories)

  return optimalPrice
}

function findOptimalPrice(histories: number[][]) {
  const expandedHistories = histories.map((history) => {
    return expandHistory(history)
  })
  const possibleKeys: Record<string, number> = {}

  for (let i = 0; i < expandedHistories.length; i++) {
    const usedKeys: Set<string> = new Set()
    const expandedHistory = expandedHistories[i]
    for (let j = 0; j < expandedHistory.length; j++) {
      const { key, cost } = expandedHistory[j]
      if (key === undefined) continue
      if (usedKeys.has(key)) continue
      usedKeys.add(key)
      if (cost) {
        possibleKeys[key] ||= 0
        possibleKeys[key] += cost
      }
    }
  }

  return Object.values(possibleKeys).reduce(
    (acc, cost) => Math.max(acc, cost),
    0
  )
}

function expandHistory(history: number[]) {
  const expanded = []
  for (let i = 0; i < history.length; i++) {
    const current = history[i]
    const prev = history[i - 1]
    const prev2 = history[i - 2]
    const prev3 = history[i - 3]
    const prev4 = history[i - 4]

    if (prev4 === undefined) {
      expanded.push({ cost: current })
    } else {
      const key = [
        prev3 - prev4,
        prev2 - prev3,
        prev - prev2,
        current - prev,
      ].join(",")
      expanded.push({ cost: current, key })
    }
  }

  return expanded
}

function findSecretNumberHistory(start: bigint, n: bigint) {
  let current = start
  const history = [Number(start % 10n)]
  for (let i = 0n; i < n; i++) {
    current = nextSecretNumber(current)
    history.push(Number(current % 10n))
  }

  return history
}

function nextSecretNumber(n: bigint) {
  const stepA = n * 64n
  const mixA = stepA ^ n
  const pruneA = mixA % 16777216n
  const stepB = pruneA / 32n
  const mixB = stepB ^ pruneA
  const pruneB = mixB % 16777216n
  const stepC = pruneB * 2048n
  const mixC = stepC ^ pruneB
  const pruneC = mixC % 16777216n
  return pruneC
}
