import { part1, part2 } from "."
import { describe, it, expect } from "vitest"
import example from "./example.txt?raw"

describe("test", async () => {
  describe("example", () => {
    it("runs part1", () => {
      expect(part1(example)).toEqual(480)
    })

    it("runs part2", () => {
      expect(part2(example)).toEqual(875318608908)
    })
  })

  it("runs part1", () => {
    expect(part1()).toEqual(40069)
  })

  it("runs part2", async () => {
    expect(part2()).toEqual(71493195288102)
  })
})
