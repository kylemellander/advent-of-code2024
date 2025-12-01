import { part1, part2 } from "."
import { describe, it, expect } from "vitest"
import example from "./example.txt?raw"

describe("test", async () => {
  describe("example", () => {
    it("runs part1", () => {
      expect(part1(example)).toEqual(7)
    })

    it("runs part2", async () => {
      expect(part2(example)).toEqual("co,de,ka,ta")
    })
  })

  it("runs part1", () => {
    expect(part1()).toEqual(1366)
  })

  it("runs part2", async () => {
    expect(part2()).toEqual("bs,cf,cn,gb,gk,jf,mp,qk,qo,st,ti,uc,xw")
  })
})
