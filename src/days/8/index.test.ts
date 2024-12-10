import { part1, part2 } from "."
import { describe, it, expect } from "vitest"

describe("test", async () => {
  describe("example", () => {
    const testInput = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`

    it("runs part1", () => {
      expect(part1(testInput)).toEqual(14)
    })

    it("runs part2", async () => {
      expect(part2(testInput)).toEqual(34)
    })
  })

  it("runs part1", () => {
    expect(part1()).toEqual(398)
  })

  it("runs part2", async () => {
    expect(part2()).toEqual(1333)
  })
})
