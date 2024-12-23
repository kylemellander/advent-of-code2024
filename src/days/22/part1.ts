import input from "./input.txt?raw"

export function part1(data: string = input) {
  const secretNumberToFind = 2000n
  const startingNumbers = data.trim().split("\n").map(BigInt)
  const endingSecretNumbers = startingNumbers.map((start) =>
    findNthSecretNumber(start, secretNumberToFind)
  )
  return endingSecretNumbers.reduce((acc, b) => acc + Number(b), 0)
}

function findNthSecretNumber(start: bigint, n: bigint) {
  let current = start
  for (let i = 0n; i < n; i++) {
    current = nextSecretNumber(current)
  }
  return current
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
