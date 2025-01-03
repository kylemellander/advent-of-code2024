import { part1, part2 } from "."
import { describe, it, expect } from "vitest"

describe("test", async () => {
  it("runs part1", () => {
    expect(part1()).toEqual(20665830408335)
  })

  it("runs part2", async () => {
    expect(part2()).toEqual(354060705047464)
  })

  describe("unit tests", () => {
    it("works for a single concat", () => {
      expect(part2(`123: 12 3`)).toEqual(123)
    })
  })
})
