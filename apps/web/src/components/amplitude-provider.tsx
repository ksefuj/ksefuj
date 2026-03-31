"use client";

import { useEffect } from "react";
import * as amplitude from "@amplitude/unified";

let initialized = false;

export function AmplitudeProvider() {
  useEffect(() => {
    if (initialized) {
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
    if (!apiKey) {
      return;
    }

    try {
      amplitude.initAll(apiKey, {
        serverZone: "EU",
        analytics: {
          autocapture: {
            pageViews: true,
            sessions: true,
            elementInteractions: false,
            formInteractions: false,
          },
        },
      });
      initialized = true;
    } catch (error) {
      console.error("Failed to initialize Amplitude", error);
    }
  }, []);

  return null;
}
