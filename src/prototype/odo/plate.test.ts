import { describe, expect, it } from "vitest";
import { formatPlate, plateTone } from "./plate";

const valid = [
  "HR26DK1234",
  "HR 26 DK 1234",
  "hr26dk1234",
  "MH12AB1234",
  "DL1C1234",
  "KA01AB1234",
  "TN09A1234",
  "GJ05ABC1234",
  "22BH1234AA",
  "22 BH 1234 AA",
  "01BH0001ZZ",
  "UP32DT5678",
];

const invalid = [
  "H26DK1234",
  "HR26DK12345",
  "22BX1234AA",
  "22BH12345AA",
  "1234567890",
  "BH1234AA",
  "2BH1234AA",
  "HR261234",
  "ABCD1234",
  "12BH12AA",
  "QQ",
  "HR26D",
];

describe("formatPlate", () => {
  it("accepts standard and BH plates, including spaces and lowercase", () => {
    expect(valid.length).toBeGreaterThanOrEqual(12);
    for (const plate of valid) {
      const result = formatPlate(plate);
      expect(result.valid, plate).toBe(true);
      expect(result.error, plate).toBe("");
      expect(result.normalised, plate).toMatch(/^[A-Z0-9]+$/);
      expect(result.display.includes(" "), plate).toBe(true);
    }
    expect(formatPlate("HR 26 DK 1234")).toMatchObject({ normalised: "HR26DK1234", display: "HR 26 DK 1234", series: "standard" });
    expect(formatPlate("22 bh 1234 aa")).toMatchObject({ normalised: "22BH1234AA", display: "22 BH 1234 AA", series: "bh" });
    expect(formatPlate("DL1C1234").display).toBe("DL 1 C 1234");
    expect(formatPlate("GJ05ABC1234").display).toBe("GJ 05 ABC 1234");
  });

  it("rejects plates that are incomplete or the wrong shape", () => {
    expect(invalid.length).toBeGreaterThanOrEqual(12);
    for (const plate of invalid) {
      expect(formatPlate(plate).valid, plate).toBe(false);
    }
    expect(formatPlate("H26DK1234").error).not.toBe("");
    expect(formatPlate("22BX1234AA").error).not.toBe("");
    expect(formatPlate("HR26D").error).toBe("");
    expect(formatPlate("HR-26-DK-1234").valid).toBe(true);
  });

  it("paints a cab plate yellow and every other kind white", () => {
    expect(plateTone("cab")).toBe("cab");
    expect(plateTone("car")).toBe("private");
    expect(plateTone("bike")).toBe("private");
    expect(plateTone("scooter")).toBe("private");
  });
});
