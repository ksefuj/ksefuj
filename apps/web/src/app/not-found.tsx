import { fontVariables } from "./fonts";

// Root not-found: rendered outside app/[locale]/layout.tsx (invalid locale segment, URLs the
// middleware does not match), so it provides its own <html> and <body>. i18n is not available
// here, hence the minimal bilingual fallback. Unmatched paths under a valid locale get the
// localized app/[locale]/not-found.tsx instead.
export default function RootNotFound() {
  return (
    <html lang="pl" className={fontVariables} style={{ backgroundColor: "#FAFAF8" }}>
      <body className="antialiased min-h-screen bg-[#FAFAF8]">
        <main className="min-h-screen flex flex-col items-center justify-center gap-3 px-4 text-center">
          <h1 className="text-3xl font-bold text-slate-900">404</h1>
          <p className="text-slate-600">Nie znaleziono strony. / Page not found.</p>
          <a href="/" className="text-violet-600 hover:text-violet-700 text-sm">
            ← ksefuj.to
          </a>
        </main>
      </body>
    </html>
  );
}
