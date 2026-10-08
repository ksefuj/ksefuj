"use client";

import { useEffect } from "react";
import * as amplitude from "@amplitude/analytics-browser";

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
      // Analytics only: no session replay, experiment or Guides & Surveys SDKs are loaded
      amplitude.init(apiKey, {
        serverZone: "EU",
        identityStorage: "localStorage", // no cookies, as stated on the privacy page
        autocapture: {
          pageViews: true,
          sessions: true,
          elementInteractions: false,
          formInteractions: false,
        },
      });
      initialized = true;
    } catch (error) {
      console.error("Failed to initialize Amplitude", error);
    }
  }, []);

  return null;
}
