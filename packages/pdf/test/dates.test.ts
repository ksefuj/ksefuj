// Dates must not depend on the viewer's time zone. The package `test` script runs this file again
// under TZ=America/New_York (west of UTC, where date-only values used to shift back a day) and
// TZ=Pacific/Auckland (far east).
import { describe, expect, it } from "vitest";
import { readExample, render, xmlText } from "./helpers";

function variant(): Uint8Array {
  const xml = xmlText(readExample("FA_3_Przykład_1.xml"))
    .replace("<P_1>2026-02-15</P_1>", "<P_1>2026-02-01</P_1>")
    .replace(
      "<P_6>2026-01-27</P_6>",
      "<OkresFa><P_6_Od>2026-02-01</P_6_Od><P_6_Do>2026-02-28</P_6_Do></OkresFa>",
    )
    .replace(
      "</WarunkiTransakcji>",
      `<Transport><RodzajTransportu>3</RodzajTransportu>
        <DataGodzRozpTransportu>2026-02-01T00:30:00+01:00</DataGodzRozpTransportu>
        <DataGodzZakTransportu>2026-02-01T23:15:00Z</DataGodzZakTransportu></Transport></WarunkiTransakcji>`,
    );
  return new TextEncoder().encode(xml);
}

describe(`dates (TZ=${process.env.TZ ?? "default"})`, () => {
  it("date-only values keep their day", async () => {
    const r = await render(variant());
    expect(r.text).toContain("01.02.2026"); // P_1 and P_6_Od
    expect(r.text).toContain("28.02.2026"); // P_6_Do
    expect(r.text).not.toContain("31.01.2026");
    expect(r.text).not.toContain("27.02.2026");
  });

  it("date-times are shown in Europe/Warsaw", async () => {
    const r = await render(variant());
    expect(r.text).toContain("01.02.202600:30");
    expect(r.text).toContain("02.02.202600:15");
  });

  it("official example dates (P_1, P_6, payment date) are unchanged", async () => {
    const r = await render(readExample("FA_3_Przykład_1.xml"));
    expect(r.text).toContain("15.02.2026");
    expect(r.text).toContain("27.01.2026");
  });
});
