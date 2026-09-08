import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const documentHead = readFileSync(new URL("../../index.html", import.meta.url), "utf8");
const pixelId = "PXaZn4cgnwXL1GYZoqm1ro";

describe("OpenAI pixel document setup", () => {
  it("installs one global pixel initialization near the top of the HTML head", () => {
    expect(documentHead.match(new RegExp(pixelId, "g")) ?? []).toHaveLength(1);
    expect(documentHead.match(/oaiq\("init"/g) ?? []).toHaveLength(1);
    expect(documentHead.indexOf("<!-- OpenAI Pixel -->")).toBeGreaterThan(0);
    expect(documentHead.indexOf("<!-- OpenAI Pixel -->")).toBeLessThan(
      documentHead.indexOf('rel="icon"'),
    );
  });
});
