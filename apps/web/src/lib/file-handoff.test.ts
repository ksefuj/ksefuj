import { beforeEach, describe, expect, it } from "vitest";
import { consumePendingFiles, setPendingFiles } from "./file-handoff";

const file = (name: string) => ({ name }) as File;

describe("file hand-off", () => {
  beforeEach(() => {
    consumePendingFiles();
  });

  it("returns null when nothing was set", () => {
    expect(consumePendingFiles()).toBeNull();
  });

  it("returns the files once and then empties the store", () => {
    const files = [file("a.xml"), file("b.xml")];
    setPendingFiles(files);

    expect(consumePendingFiles()?.files).toBe(files);
    expect(consumePendingFiles()).toBeNull();
  });

  it("passes the skipped count through, defaulting to zero", () => {
    setPendingFiles([file("a.xml")], 3);
    expect(consumePendingFiles()?.skipped).toBe(3);

    setPendingFiles([file("a.xml")]);
    expect(consumePendingFiles()?.skipped).toBe(0);
  });

  it("keeps only the latest set", () => {
    setPendingFiles([file("old.xml")], 1);
    const latest = [file("new.xml")];
    setPendingFiles(latest, 2);

    expect(consumePendingFiles()).toEqual({ files: latest, skipped: 2 });
  });

  it("treats an empty list as nothing to hand off", () => {
    setPendingFiles([file("a.xml")]);
    setPendingFiles([]);

    expect(consumePendingFiles()).toBeNull();
  });

  it("accepts a fresh entry right up to the expiry window", () => {
    setPendingFiles([file("a.xml")], 0, 1_000);

    expect(consumePendingFiles(11_000)).not.toBeNull();
  });

  it("ignores and clears an expired entry", () => {
    setPendingFiles([file("a.xml")], 0, 1_000);

    expect(consumePendingFiles(11_001)).toBeNull();
    // Cleared: even a "fresh" clock reading finds nothing afterwards
    expect(consumePendingFiles(1_000)).toBeNull();
  });
});
