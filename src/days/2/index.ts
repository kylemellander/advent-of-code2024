import input from "./input.txt?raw"

export function part1(data: string = input) {
  return findInvalidIdSum(data, isInvalidId)
}

export function part2(data: string = input) {
  return findInvalidIdSum(data, isInvalidId2)
}

function findInvalidIdSum(
  data: string,
  idChecker: (id: string) => boolean
): number {
  const line = data.split("\n").filter(Boolean)[0]
  const idRanges = line.split(",").map((cmd) => cmd.split("-"))

  let sum = 0
  for (const [start, end] of idRanges) {
    const startNum = Number(start)
    const endNum = Number(end)
    for (let i = startNum; i <= endNum; i++) {
      if (idChecker(i.toString())) {
        sum += i
      }
    }
  }
  return sum
}

function isInvalidId(id: string): boolean {
  const length = id.length
  if (length % 2 !== 0) return false

  const halfLength = length >> 1
  return id.slice(0, halfLength) === id.slice(halfLength)
}

function isInvalidId2(id: string): boolean {
  const length = id.length

  for (let i = 1; i <= length / 2; i++) {
    if (length % i !== 0) continue

    const section = id.slice(0, i)
    let matches = true

    for (let j = i; j < length; j += i) {
      if (id.slice(j, j + i) !== section) {
        matches = false
        break
      }
    }

    if (matches) return true
  }
  return false
}
