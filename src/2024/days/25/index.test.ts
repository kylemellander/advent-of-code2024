import { part1, part2 } from "."
import { describe, it, expect } from "vitest"
import example from "./example.txt?raw"

describe("test", async () => {
  describe("example", () => {
    it("runs part1", () => {
      expect(part1(example)).toEqual(3)
    })

    it.skip("runs part2", async () => {
      expect(part2(example)).toEqual("z00,z01,z02,z05")
    })
  })

  it("runs part1", () => {
    expect(part1()).toEqual(2854)
  })

  it.skip("runs part2", async () => {
    expect(part2()).toEqual("bs,cf,cn,gb,gk,jf,mp,qk,qo,st,ti,uc,xw")
  })
})
