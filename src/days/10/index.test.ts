import { part1, part2 } from "."
import { describe, it, expect } from "vitest"

describe("test", async () => {
  describe("example", () => {
    const testInput = ``

    it("runs part1", () => {
      expect(part1(testInput)).toEqual(undefined)
    })

    it("runs part2", async () => {
      expect(part2(testInput)).toEqual(undefined)
    })
  })

  it.skip("runs part1", () => {
    expect(part1()).toEqual(undefined)
  })

  it.skip("runs part2", async () => {
    expect(part2()).toEqual(undefined)
  })
})
