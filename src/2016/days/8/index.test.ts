import { part1, part2 } from "."
import { describe, it, expect } from "vitest"

describe("test", async () => {
  it("runs part1", () => {
    expect(part1()).toEqual(119)
  })

  it("runs part2", async () => {
    expect(part2()).toEqual(
      `
####.####.#..#.####..###.####..##...##..###...##..
...#.#....#..#.#....#....#....#..#.#..#.#..#.#..#.
..#..###..####.###..#....###..#..#.#....#..#.#..#.
.#...#....#..#.#.....##..#....#..#.#.##.###..#..#.
#....#....#..#.#.......#.#....#..#.#..#.#....#..#.
####.#....#..#.#....###..#.....##...###.#.....##..
`.trim()
    )
  })
})