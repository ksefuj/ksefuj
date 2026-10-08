// Root not-found: rendered outside app/[locale]/layout.tsx (unmatched URLs, invalid locales),
// so it has to provide its own <html> and <body>.
export default function RootNotFound() {
  return (
    <html lang="pl" style={{ backgroundColor: "#FAFAF8" }}>
      <body className="antialiased min-h-screen bg-[#FAFAF8]">
        <main className="min-h-screen flex flex-col items-center justify-center gap-3 px-4 text-center">
          <h1 className="text-3xl font-bold text-slate-900">404</h1>
          <p className="text-slate-600">Nie znaleziono strony.</p>
          <a href="/" className="text-violet-600 hover:text-violet-700 text-sm">
            ← ksefuj.to
          </a>
        </main>
      </body>
    </html>
  );
}
