import input from "./input.txt?raw"

export function part1(data: string = input) {
  const lines = data.split("\n").filter(Boolean)
  const highests = lines.map((line) => {
    const nums = line.split("").map(Number)

    const highest = Math.max(...nums.slice(0, -1))
    const highestIndex = line.indexOf(highest.toString())
    const remaining = nums.slice(highestIndex + 1)
    const secondHighest = Math.max(...remaining)
    return 10 * highest + secondHighest
  })
  return highests.reduce((a, b) => a + b, 0)
}

export function part2(data: string = input) {
  const lines = data.split("\n").filter(Boolean)
  return lines.reduce((acc, line) => {
    return acc + parseInt(findLongJoltage(line))
  }, 0)
}

function findLongJoltage(line: string, length = 12): string {
  const nums = line.split("").map(Number)

  let voltage = ""
  let lastHighestIndex = 0
  while (voltage.length < length) {
    const range =
      voltage.length === length - 1
        ? nums.slice(lastHighestIndex)
        : nums.slice(lastHighestIndex, -(length - voltage.length - 1))
    const highest = Math.max(...range)
    const highestIndex = range.indexOf(highest)
    voltage = `${voltage}${highest}`
    lastHighestIndex += highestIndex + 1
    if (lastHighestIndex >= nums.length) break
  }

  return voltage
}
