import { part1, part2 } from "."
import { describe, it, expect } from "vitest"
import example from "./example.txt?raw"

describe("test", async () => {
  describe("example", () => {
    it("runs part1", () => {
      expect(part1(example)).toEqual(37327623)
    })

    it("runs part2", async () => {
      expect(part2("1\n2\n3\n2024")).toEqual(23) // I can't believe he changed the input for the example
    })
  })

  it("runs part1", () => {
    expect(part1()).toEqual(17965282217)
  })

  it("runs part2", async () => {
    expect(part2()).toEqual(2152)
  })
})
