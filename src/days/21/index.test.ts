import { part1, part2 } from "."
import { describe, it, expect } from "vitest"
import example from "./example.txt?raw"

describe("test", async () => {
  describe("example", () => {
    it("runs part1", () => {
      expect(part1(example)).toEqual(126384)
    })

    it.skip("runs part2", async () => {
      expect(part2(example)).toEqual(0)
    })
  })

  it.skip("runs part1", () => {
    expect(part1()).toEqual(1384)
  })

  it.skip("runs part2", async () => {
    expect(part2()).toEqual(1008542)
  })
})
