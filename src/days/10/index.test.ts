import { part1, part2 } from "."
import { describe, it, expect } from "vitest"

describe("test", async () => {
  describe("example", () => {
    const testInput = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`

    it("runs part1", () => {
      expect(part1(testInput)).toEqual(36)
    })

    it("runs part2", async () => {
      expect(part2(testInput)).toEqual(81)
    })
  })

  it("runs part1", () => {
    expect(part1()).toEqual(841)
  })

  it("runs part2", async () => {
    expect(part2()).toEqual(1875)
  })
})
