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

    amplitude.initAll(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!, {
      serverZone: "EU",
      analytics: { autocapture: true },
      sessionReplay: { sampleRate: 1 },
    });
  }, []);

  return null;
}
