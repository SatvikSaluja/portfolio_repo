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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/40" />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <div>
          <span
            className="-translate-y-2 block font-mono text-xs uppercase tracking-[0.2em] text-white/50"
          >
            Research Portfolio
          </span>
          <h1
            className="mt-3 text-5xl font-semibold tracking-tight text-white sm:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Satvik Saluja
          </h1>
          <p className="mx-auto mt-10 max-w-md font-mono text-sm tracking-wide text-white/70">
            Scientific Machine Learning, Computational Biology, and Biomedical AI.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-white px-8 text-base font-medium text-black hover:bg-white/90"
          >
            <Link href="/portfolio">Open Portfolio</Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-white/30 bg-transparent px-8 text-base font-medium text-white hover:bg-white/10"
          >
            <a href="/Satvik_Saluja_CV.docx" download>
              Download CV
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}
