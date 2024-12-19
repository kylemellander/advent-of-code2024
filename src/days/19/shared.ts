export function designIterations(
  design: string,
  towels: string[],
  cache: Record<string, number> = {}
) {
  if (design === "") return 1 // it's built!
  if (cache[design] !== undefined) return cache[design]

  let currentCount = 0
  for (let i = 0; i < towels.length; i++) {
    const towel = towels[i]
    if (design.startsWith(towel)) {
      currentCount += designIterations(
        design.slice(towel.length),
        towels,
        cache
      )
    }
  }

  cache[design] = currentCount
  return currentCount
}
