import { part1, part2 } from "."
import { describe, it, expect } from "vitest"

describe("test", async () => {
  describe("example", () => {
    const testInput = `125 17`

    it("runs part1", () => {
      expect(part1(testInput)).toEqual(55312)
    })
  })

  it("runs part1", () => {
    expect(part1()).toEqual(200446)
  })

  it("runs part2", async () => {
    expect(part2()).toEqual(238317474993392)
  })
})
