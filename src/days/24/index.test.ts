import { part1, part2 } from "."
import { describe, it, expect } from "vitest"
import example from "./example.txt?raw"
import example2 from "./example2.txt?raw"

describe("test", async () => {
  describe("example", () => {
    it("runs part1", () => {
      expect(part1(example)).toEqual(4)
    })

    it("runs part1", () => {
      expect(part1(example2)).toEqual(2024)
    })
  })

  it("runs part1", () => {
    expect(part1()).toEqual(42883464055378)
  })

  it("runs part2", async () => {
    expect(part2()).toEqual("dqr,dtk,pfw,shh,vgs,z21,z33,z39")
  })
})
