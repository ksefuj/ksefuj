import { Validator } from "./validator";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b border-stone-800 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-baseline justify-between">
          <h1 className="text-xl font-semibold tracking-tight">
            ksefuj<span className="text-stone-500">.to</span>
          </h1>
          <p className="text-sm text-stone-500">walidator KSeF FA(3)</p>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-3xl w-full space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">
              Sprawdź swoją e-fakturę
            </h2>
            <p className="text-stone-400 text-lg">
              Wrzuć XML, zobacz błędy. Walidacja odbywa się w Twojej
              przeglądarce&nbsp;— dane nie opuszczają Twojego komputera.
            </p>
          </div>

          <Validator />
        </div>
      </div>

      <footer className="border-t border-stone-800 px-6 py-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-sm text-stone-600">
          <span>© 2026 ksefuj</span>
          <div className="flex gap-4">
            <a
              href="https://github.com/ksefuj/ksefuj"
              className="hover:text-stone-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@ksefuj/validator"
              className="hover:text-stone-400 transition-colors"
            >
              npm
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
