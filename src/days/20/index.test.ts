import { part1, part2 } from "."
import { describe, it, expect } from "vitest"
import example from "./example.txt?raw"

describe("test", async () => {
  describe("example", () => {
    it.skip("runs part1", () => {
      expect(part1(example)).toEqual(0)
    })

    it("runs part1 with timeToSave", () => {
      expect(part1(example, 50)).toEqual(1)
      expect(part1(example, 25)).toEqual(4)
      expect(part1(example, 12)).toEqual(8)
    })

    it("runs part2", async () => {
      expect(part2(example)).toEqual(0)
      expect(part2(example, 75)).toEqual(3)
      expect(part2(example, 74)).toEqual(7)
      expect(part2(example, 72)).toEqual(29)
      expect(part2(example, 70)).toEqual(41)
    })
  })

  it("runs part1", () => {
    expect(part1()).toEqual(1384)
  })

  it("runs part2", async () => {
    expect(part2()).toEqual(1008542)
  })
})
