import { joinGroupsOfN } from "../../../days/8"
import input from "./input.txt?raw"

export function part1(data = input) {
  return draw(data).state.filter((x) => x === "#").length
}

export function part2(data = input) {
  const { state, width } = draw(data)
  return joinGroupsOfN(state, width).join("\n")
}

function draw(data: string) {
  const width = 50
  const height = 6
  const length = width * height
  const commands = data
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split(" "))
  const state = Array(length).fill(".")

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i]
    if (command[0] === "rect") {
      const [w, h] = command[1].split("x").map(Number)
      for (let x = 0; x < Math.min(width, w); x++) {
        for (let y = 0; y < Math.min(height, h); y++) {
          state[getIndex(x, y)] = "#"
        }
      }
    } else {
      const [dir, n] = command[2]
        .split("=")
        .map((x, i) => (i === 0 ? x : Number(x))) as [string, number]
      const distance = parseInt(command[4])
      if (dir === "y") {
        const newValues = []
        for (let x = 0; x < width; x++) {
          const index = getIndex(x, n)
          const previousValueIndex = wrappingXMove({ width, index, distance })
          newValues.push(state[previousValueIndex])
        }
        for (let x = 0; x < newValues.length; x++) {
          state[getIndex(x, n)] = newValues[x]
        }
      }
      if (dir === "x") {
        const newValues = []

        for (let y = 0; y < height; y++) {
          const index = getIndex(n, y)
          const oldIndex = wrappingYMove({ index, width, height, distance })
          newValues.push(state[oldIndex])
        }
        for (let y = 0; y < newValues.length; y++) {
          state[getIndex(n, y)] = newValues[y]
        }
      }
    }
  }
  return { state, width }

  function getIndex(x: number, y: number) {
    return y * width + x
  }
}

function wrappingXMove({
  width,
  index,
  distance,
}: {
  width: number
  index: number
  distance: number
}) {
  const offset = index - (index % width)
  return offset + ((index + width - distance) % width)
}

function wrappingYMove({
  width,
  height,
  distance,
  index,
}: {
  width: number
  height: number
  distance: number
  index: number
}) {
  const xOffset = index % width
  const currentY = Math.floor(index / width)
  const newY = (height + currentY - distance) % height
  return newY * width + xOffset
}
