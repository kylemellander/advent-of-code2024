import { part1, part2 } from "./"
import { describe, it, expect } from "vitest"
import example from "./example.txt?raw"
import input from "./input.txt?raw"

describe("test", async () => {
  describe("example", () => {
    it("runs part1", () => {
      expect(part1(example, 11, 7)).toEqual(12)
    })
  })

  it("runs part1", () => {
    expect(part1()).toEqual(229868730)
  })

  it("runs part2", async () => {
    expect(part2(input)).toEqual(7861)
  })
})
