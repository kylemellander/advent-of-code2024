import { part1, part2 } from "."
import { describe, it, expect } from "vitest"
import example from "./example.txt?raw"

describe("test", async () => {
  describe("example", () => {
    it("runs part1", () => {
      expect(part1(example, { height: 7, width: 7, bytes: 12 })).toEqual(22)
    })

    it("runs part2", async () => {
      expect(part2(example, { height: 7, width: 7, bytes: 12 })).toEqual("6,1")
    })
  })

  it("runs part1", () => {
    expect(part1()).toEqual(246)
  })

  it("runs part2", async () => {
    expect(part2()).toEqual("22,50")
  })
})
