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

    expect(consumePendingFiles()).toBe(files);
    expect(consumePendingFiles()).toBeNull();
  });

  it("keeps only the latest set", () => {
    setPendingFiles([file("old.xml")]);
    const latest = [file("new.xml")];
    setPendingFiles(latest);

    expect(consumePendingFiles()).toBe(latest);
  });

  it("treats an empty list as nothing to hand off", () => {
    setPendingFiles([file("a.xml")]);
    setPendingFiles([]);

    expect(consumePendingFiles()).toBeNull();
  });
});
