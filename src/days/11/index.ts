import input from "./input.txt?raw"

export function part1(data = input, blinks = 25) {
  const stones = data
    .split(" ")
    .map((line) => line.trim())
    .filter(Boolean)

  let stoneState = stones.reduce((acc, stone) => {
    return { ...acc, [stone]: 1 }
  }, {} as Record<string, number>)

  for (let i = 0; i < blinks; i++) {
    const stones = Object.keys(stoneState)
    const newStoneState: Record<string, number> = {}
    for (let j = 0; j < stones.length; j++) {
      const stone = stones[j]
      if (stone === "0") {
        newStoneState["1"] ||= 0
        newStoneState["1"] += stoneState[stone]
      } else if (stone.length % 2 === 0) {
        const firstHalf = stone.slice(0, stone.length / 2)
        newStoneState[firstHalf] ||= 0
        newStoneState[firstHalf] += stoneState[stone]
        const secondHalf =
          stone.slice(stone.length / 2).replace(/^0*/, "") || "0"
        newStoneState[secondHalf] ||= 0
        newStoneState[secondHalf] += stoneState[stone]
      } else {
        const newStone = `${parseInt(stone) * 2024}`
        newStoneState[newStone] ||= 0
        newStoneState[newStone] += stoneState[stone]
      }
    }
    stoneState = newStoneState
  }

  return Object.values(stoneState).reduce((acc, stone) => acc + stone, 0)
}

export function part2(data = input) {
  return part1(data, 75)
}
