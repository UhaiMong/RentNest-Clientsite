import Link from "next/link";
import { Home, MessageSquareText, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-linear-to-br from-indigo-900 via-purple-900 to-indigo-900 py-16">
      <div className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-purple-600/25 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-indigo-500/25 blur-[120px]" />

      <div className="relative w-11/12 mx-auto max-w-2xl">
        {/* Terminal window */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 shadow-2xl backdrop-blur-sm">
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
            <span className="size-2.5 rounded-full bg-red-500/80" />
            <span className="size-2.5 rounded-full bg-yellow-500/80" />
            <span className="size-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 flex items-center gap-1.5 text-xs text-zinc-500">
              <Terminal className="size-3.5" />
              digital-resolution — resolve-route
            </span>
          </div>

          <div className="px-5 py-6 font-mono text-xs leading-relaxed sm:text-sm">
            <p className="text-zinc-500">
              ${" "}
              <span className="text-zinc-300">
                resolve --path=&quot;{"{"}requested-url{"}"}"
              </span>
            </p>
            <p className="mt-2 text-zinc-500">
              Looking up route in build manifest…
            </p>
            <p className="text-zinc-500">Checking redirects…</p>
            <p className="text-zinc-500">Checking legacy routes…</p>

            <p className="mt-3 text-red-400">
              error: route could not be resolved (404)
            </p>

            <div className="mt-5 flex items-baseline gap-4">
              <span className="bg-linear-to-r from-white via-indigo-200 to-blue-400 bg-clip-text text-6xl font-extrabold leading-none text-transparent sm:text-7xl">
                404
              </span>
              <span className="h-10 w-0.5 animate-[blink_1.1s_steps(1)_infinite] bg-blue-400 sm:h-12" />
            </div>

            <p className="mt-4 text-sm text-zinc-300 sm:text-base">
              This page didn&apos;t make it into the build. It may have been
              moved, renamed, or never existed.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-sky-400 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 [clip-path:polygon(0%_0%,100%_0%,100%_100%,4%_100%)]"
          >
            <Home className="size-4" />
            Return Home
          </Link>
          <Link
            href="/contact"
            className="flex flex-1 items-center justify-center gap-2 border border-zinc-700 bg-zinc-900/60 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-blue-500 hover:bg-zinc-900 [clip-path:polygon(0%_0%,100%_0%,100%_100%,4%_100%)]"
          >
            <MessageSquareText className="size-4" />
            Talk to Us Instead
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500 sm:text-left">
          Error code:{" "}
          <span className="font-mono text-zinc-400">ERR_ROUTE_NOT_FOUND</span>
        </p>
      </div>

      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
