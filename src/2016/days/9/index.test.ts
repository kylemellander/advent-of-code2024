import { part1, part2 } from "."
import { describe, it, expect } from "vitest"

describe("test", async () => {
  describe("example", () => {
    it("runs part1", () => {
      expect(part1("ADVENT")).toEqual(6)
      expect(part1("A(1x5)BC")).toEqual(7)
      expect(part1("(3x3)XYZ")).toEqual(9)
      expect(part1("A(2x2)BCD(2x2)EFG")).toEqual(11)
      expect(part1("(6x1)(1x3)A")).toEqual(6)
      expect(part1("X(8x2)(3x3)ABCY")).toEqual(18)
    })

    it.skip("runs part2", () => {
      expect(part2("ADVENT")).toEqual(6)
      expect(part2("A(1x5)BC")).toEqual(7)
      expect(part2("(3x3)XYZ")).toEqual(9)
      expect(part2("A(2x2)BCD(2x2)EFG")).toEqual(11)
      expect(part2("(6x1)(1x3)A")).toEqual(3)
      expect(part2("X(8x2)(3x3)ABCY")).toEqual(20)
      // expect(part2("(27x12)(20x12)(13x14)(7x10)(1x12)A")).toEqual(241920)
      expect(
        part2("(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN")
      ).toEqual(445)
    })

    it("runs part2 with some ")
  })

  it("runs part1", () => {
    expect(part1()).toEqual(107035)
  })

  it.skip("runs part2", async () => {
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
