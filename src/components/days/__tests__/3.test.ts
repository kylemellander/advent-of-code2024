import { part1, part2 } from "../3"
import { describe, it, expect } from "vitest"

describe("test", () => {
  it("runs part1", () => {
    expect(part1()).toEqual(173731097)
  })

  it("runs part2", () => {
    expect(part2()).toEqual(93729253)
  })

  describe("part2", () => {
    it("runs with example", () => {
      const example =
        "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
      expect(part2(example)).toEqual(48)
    })
  })
})
