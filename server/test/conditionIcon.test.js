import { describe, it, expect } from "vitest";
import { getConditionIcon } from "../src/utils/conditionIcon.js";

describe("getConditionIcon", () => {
  it("maps clear sky to sunny by day and night by night", () => {
    expect(getConditionIcon(1000, 1)).toBe("sunny");
    expect(getConditionIcon(1000, 0)).toBe("night");
  });

  it("maps partly cloudy to partly-cloudy by day and cloudy-night by night", () => {
    expect(getConditionIcon(1003, 1)).toBe("partly-cloudy");
    expect(getConditionIcon(1003, 0)).toBe("cloudy-night");
  });

  it("maps overcast, cloudy and fog to cloudy by day and cloudy-night by night", () => {
    for (const code of [1006, 1009, 1030, 1135]) {
      expect(getConditionIcon(code, 1)).toBe("cloudy");
      expect(getConditionIcon(code, 0)).toBe("cloudy-night");
    }
  });

  it("maps any precipitation (rain, showers, thunder, snow) to rain, day or night", () => {
    for (const code of [1063, 1087, 1183, 1195, 1210, 1243, 1276]) {
      expect(getConditionIcon(code, 1)).toBe("rain");
      expect(getConditionIcon(code, 0)).toBe("rain");
    }
  });

  it("falls back to cloudy / cloudy-night for unknown or missing codes", () => {
    expect(getConditionIcon(9999, 1)).toBe("cloudy");
    expect(getConditionIcon(undefined, 0)).toBe("cloudy-night");
  });
});
