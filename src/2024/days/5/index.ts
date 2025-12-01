import input from "./input.txt?raw"

export function part1(data = input) {
  const { afterRules, beforeRules, pageNumbersCollection } = setupData(data)

  const { valid } = validateCollection({
    collection: pageNumbersCollection,
    afterRules,
    beforeRules,
  })
  let result = 0
  valid.forEach((pageNumbers) => {
    result += pageNumbers[(pageNumbers.length - 1) / 2]
  })
  return result
}

export function part2(data = input) {
  const { afterRules, beforeRules, pageNumbersCollection } = setupData(data)

  const { invalid } = validateCollection({
    collection: pageNumbersCollection,
    afterRules,
    beforeRules,
  })

  const correctedPageNumbersCollection = invalid.map((pageNumbers) =>
    fixOrder(pageNumbers, afterRules, beforeRules)
  )

  let result = 0

  correctedPageNumbersCollection.forEach((pageNumbers) => {
    result += pageNumbers[(pageNumbers.length - 1) / 2]
  })

  return result
}

function setupData(data: string) {
  const [rawRules, rawPageNumbers] = data.split("\n\n")
  const unOptimizedRules = rawRules
    .split("\n")
    .map((rule) => rule.split("|").map((n) => parseInt(n)))
  const afterRules = unOptimizedRules.reduce((acc, [before, after]) => {
    acc[before] = acc[before] || []
    acc[before].push(after)
    return acc
  }, {} as Record<number, number[]>)
  const beforeRules = unOptimizedRules.reduce((acc, [before, after]) => {
    acc[after] = acc[after] || []
    acc[after].push(before)
    return acc
  }, {} as Record<number, number[]>)
  const pageNumbersCollection = rawPageNumbers
    .split("\n")
    .filter(Boolean)
    .map((pages) => pages.split(",").map((n) => parseInt(n)))
  return { afterRules, beforeRules, pageNumbersCollection }
}

function validateCollection({
  collection,
  afterRules,
  beforeRules,
}: {
  collection: number[][]
  afterRules: Record<number, number[]>
  beforeRules: Record<number, number[]>
}) {
  return collection.reduce(
    (acc, pageNumbers) => {
      const valid = pageNumbers.reduce((acc, pageNumber, i) => {
        if (acc === false) return false
        const pagesAfter = afterRules[pageNumber] || []
        const pagesBefore = beforeRules[pageNumber] || []

        return (
          pagesAfter.every((pageAfter) => {
            const after = pageNumbers.slice(i + 1)
            return (
              after.includes(pageAfter) ||
              !pageNumbers.slice(0, i).includes(pageAfter)
            )
          }) &&
          pagesBefore.every((pageBefore) => {
            const before = pageNumbers.slice(0, i)
            return (
              before.includes(pageBefore) ||
              !pageNumbers.slice(i + 1).includes(pageBefore)
            )
          })
        )
      }, true)

      if (valid) acc.valid.push(pageNumbers)
      else acc.invalid.push(pageNumbers)
      return acc
    },
    { valid: [] as number[][], invalid: [] as number[][] }
  )
}

function fixOrder(
  pageNumbers: number[],
  afterRules: Record<number, number[]>,
  beforeRules: Record<number, number[]>
) {
  const newOrder: number[] = []
  let remainingNumbers = [...pageNumbers]

  while (remainingNumbers.length > 0) {
    const [next, ...rest] = remainingNumbers

    let i = newOrder.length
    while (true) {
      const itemsBeforeIndex = newOrder.slice(0, i)
      const itemsAfterIndex = newOrder.slice(i)
      function beforeValid() {
        return (
          !afterRules[next] ||
          itemsAfterIndex.length === 0 ||
          itemsAfterIndex.every((n) => !afterRules[next].includes(n))
        )
      }
      function afterValid() {
        return (
          !beforeRules[next] ||
          itemsBeforeIndex.length === 0 ||
          itemsBeforeIndex.every((n) => !beforeRules[next].includes(n))
        )
      }

      if (beforeValid() && afterValid()) {
        newOrder.splice(i, 0, next)
        break
      }
      i--
    }
    remainingNumbers = rest
  }

  return newOrder
}
