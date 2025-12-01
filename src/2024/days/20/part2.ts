import input from "./input.txt?raw"
import { cacheSecondsToGetToEachLocation } from "./part1"

export function part2(data: string = input, timeToSave = 100) {
  const cache: Record<string, number> = {}
  const { width } = cacheSecondsToGetToEachLocation(data, cache)
  const cacheKeys: number[] = Object.keys(cache).map(Number)
  let count = 0

  for (let i = 0; i < cacheKeys.length; i++) {
    for (let j = 0; j < cacheKeys.length; j++) {
      const current = cacheKeys[i]
      const next = cacheKeys[j]
      if (current === next) continue
      const distance = findDistance(current, next, width)
      if (distance > 20) continue
      const timeSaved = cache[next] - cache[current] - distance
      if (timeSaved < timeToSave) continue

      count++
    }
  }

  return count
}

function findDistance(a: number, b: number, width: number) {
  const aX = a % width
  const aY = Math.floor(a / width)
  const bX = b % width
  const bY = Math.floor(b / width)
  return Math.abs(aX - bX) + Math.abs(aY - bY)
}
