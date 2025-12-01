import { part1, part2 } from "."
import { describe, it, expect } from "vitest"

describe("test", async () => {
  describe("example", () => {
    const testInput = "2333133121414131402"

    it("runs part1", () => {
      expect(part1(testInput)).toEqual(1928)
    })

    it("runs part2", async () => {
      expect(part2(testInput)).toEqual(2858)
    })
  })

  it("runs part1", () => {
    expect(part1()).toEqual(6349606724455)
  })

  it("runs part2", async () => {
    expect(part2()).toEqual(6376648986651)
  })
})
