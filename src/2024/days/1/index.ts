import input from "./input.txt?raw"

type Lists = [number[], number[]]

export function part1() {
  const lists = getLists()

  const listA = lists[0].sort()
  const listB = lists[1].sort()
  let result = 0
  for (let i = 0; i < listA.length; i++) {
    result += Math.abs(listA[i] - listB[i])
  }
  return result
}

export function part2() {
  const lists = getLists()

  let result = 0
  for (let i = 0; i < lists[0].length; i++) {
    const count = lists[1].filter((n) => n === lists[0][i]).length
    result += count * lists[0][i]
  }
  return result
}

function getLists() {
  const lines = input.split("\n").filter(Boolean)
  const lists = lines.reduce(
    ([lista, listb], line) => {
      const [a, b] = line.split("   ")
      lista.push(parseInt(a))
      listb.push(parseInt(b))
      return [lista, listb] as Lists
    },
    [[], []] as Lists
  )
  return lists
}
