import { notFound } from "next/navigation";

// Catch-all so unmatched paths under a locale render app/[locale]/not-found.tsx
// (inside the locale layout) instead of the root not-found.
export default function CatchAllPage() {
  notFound();
}
