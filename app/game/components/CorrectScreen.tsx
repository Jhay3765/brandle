"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import type { Hint } from "@/app/types/game";

export default function CorrectScreen({
  title = "You nailed it!",
  answer,
  hints,
  roundNumber,
  sideImage,
  onNext,
}: {
  title?: string;
  answer: string;
  hints: Hint[];
  roundNumber?: number;
  sideImage?: { src: string; alt?: string };
  onNext: () => void;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(251,191,36,0.08),transparent_60%),radial-gradient(800px_380px_at_80%_20%,rgba(251,191,36,0.05),transparent_55%)]" />

      {/* Top Bar */}
      <div className="relative mx-auto mb-10 flex max-w-7xl items-center justify-between px-4 pt-4">
        <span className="title font-serif text-3xl tracking-tight text-amber-300">
          Brandle
        </span>
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="title font-serif text-4xl font-semibold tracking-tight md:text-6xl">
              {title}
            </h1>
          </motion.div>

          <div className="mt-6 flex flex-col items-center gap-4">
            <AnswerBadge answer={answer} />
          </div>

          {sideImage && (
            <motion.img
              src={sideImage.src}
              alt={sideImage.alt ?? "Celebration"}
              className="mx-auto mt-6 h-40 w-full max-w-sm select-none rounded-xl object-cover"
              draggable={false}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
            />
          )}
        </section>

        {/* Hints */}
        <section className="mt-10">
          <h2 className="mb-4 text-xs uppercase tracking-[0.22em] text-zinc-500">
            Round Hints
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {hints.map((h, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                    Hint {i + 1}
                  </div>
                  {h.type === "text" ? (
                    <p className="mt-1 text-[15px] leading-relaxed text-zinc-100">
                      {h.value}
                    </p>
                  ) : (
                    <img
                      src={h.value}
                      alt={h.alt ?? `Hint ${i + 1}`}
                      className="mt-2 h-14 w-14 select-none rounded-md object-contain"
                      draggable={false}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="mt-10 flex justify-end gap-3">
          <div className="text-right">
            <NextRoundButton onClick={onNext} />
          </div>
        </div>
      </div>
    </main>
  );
}

function AnswerBadge({ answer }: { answer: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-3 py-1.5 text-sm shadow-sm backdrop-blur-sm">
      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
      <span className="text-zinc-100">
        <span className="text-zinc-400">Answer:</span>{" "}
        <span className="font-semibold">{answer}</span>
      </span>
    </div>
  );
}

function NextRoundButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-gradient-to-b from-zinc-900 to-zinc-800 px-6 py-3 text-sm font-semibold text-zinc-100 shadow hover:from-zinc-800 hover:to-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/30"
    >
      NEXT ROUND
    </button>
  );
}
