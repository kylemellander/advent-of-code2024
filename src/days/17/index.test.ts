import { part1, part2 } from "."
import { describe, it, expect } from "vitest"
import example from "./example.txt?raw"

describe("test", async () => {
  describe("example", () => {
    it("runs part1", () => {
      expect(part1(example)).toEqual("4,6,3,5,6,3,5,2,1,0")
    })


  })

  it("runs part1", () => {
    expect(part1()).toEqual("6,7,5,2,1,3,5,1,7")
  })

  it("runs part2", async () => {
    expect(part2()).toEqual(216549846240877n)
  })
})
