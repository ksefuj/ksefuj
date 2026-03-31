"use client";

import { useEffect } from "react";
import * as amplitude from "@amplitude/unified";

let initialized = false;

export function AmplitudeProvider() {
  useEffect(() => {
    if (initialized) {
      return;
    }
    initialized = true;

    amplitude.initAll("8182177694f99934e6f8b3628d51c13b", {
      serverZone: "EU",
      analytics: { autocapture: true },
      sessionReplay: { sampleRate: 1 },
    });
  }, []);

  return null;
}
