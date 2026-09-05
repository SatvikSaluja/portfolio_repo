"use client";

import Link from "next/link";
import { BlackHole } from "@/components/ui/black-hole";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <BlackHole />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/40" />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <div>
          <span
            className="block font-mono text-xs uppercase tracking-[0.2em] text-white/50"
          >
            Research Portfolio
          </span>
          <h1
            className="mt-3 text-5xl font-semibold tracking-tight text-white sm:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Satvik Saluja
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-white/70">
            Scientific machine learning, computational biology, and biomedical AI.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-white px-8 text-base font-medium text-black hover:bg-white/90"
          >
            <Link href="/portfolio">Open Portfolio</Link>
          </Button>

          {/* No CV file wired up yet — swap disabled for an <a href="/Satvik_Saluja_CV.pdf" target="_blank"> once one is ready. */}
          <Button
            size="lg"
            variant="outline"
            disabled
            className="h-12 cursor-not-allowed rounded-full border-white/20 bg-transparent px-8 text-base font-medium text-white/50 hover:bg-transparent"
            title="CV coming soon"
          >
            Download CV — coming soon
          </Button>
        </div>
      </div>
    </main>
  );
}
