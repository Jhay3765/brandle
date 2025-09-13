"use client";

import React, { useMemo, useState } from "react";
import { XCircle, Diamond as DiamondIcon, Lock } from "lucide-react";
import type { RoundData } from "@/app/types/game";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function BrandleRound({
  round,
  onWin,
  onLose,
}: {
  round: RoundData;
  onWin: () => void;
  onLose: () => void;
}) {
  const MAX_GUESSES = 3;
  const { answer, hints } = round;

  const [revealed, setRevealed] = useState(1);
  const [page, setPage] = useState(0);
  const [left, setLeft] = useState(MAX_GUESSES);
  const [guess, setGuess] = useState("");
  const [wrong, setWrong] = useState<string[]>([]);
  const [done, setDone] = useState<"win" | "lose" | null>(null);

  const placeholder = useMemo(
    () =>
      done
        ? done === "win"
          ? "Correct! Loading results…"
          : "Out of guesses. Better luck next time."
        : `Guess a brand (${left} guess${left === 1 ? "" : "es"} remaining)…`,
    [left, done]
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (done || !guess.trim()) return;
    const clean = guess.trim().toLowerCase();

    if (clean === answer.toLowerCase()) {
      setDone("win");
      onWin();
      return;
    }

    setWrong((w) => [clean, ...w.slice(0, 4)]);
    const nextLeft = left - 1;
    setLeft(nextLeft);
    setRevealed((r) => Math.min(hints.length, r + 1));
    setPage((p) => Math.min(p + 1, Math.min(hints.length - 1, revealed)));

    if (nextLeft <= 0) {
      setDone("lose");
      onLose();
    }
    setGuess("");
  };

  function Diamond({
    active,
    locked,
    onClick,
  }: {
    active?: boolean;
    locked?: boolean;
    onClick?: () => void;
  }) {
    return (
      <button
        onClick={locked ? undefined : onClick}
        disabled={!!locked}
        className={`grid h-9 w-9 place-items-center rotate-45 rounded-[6px] border transition ${
          locked
            ? "cursor-not-allowed border-white/10 bg-black/20 text-zinc-500"
            : active
            ? "border-amber-300/40 bg-gradient-to-br from-amber-300/30 to-amber-400/20 text-amber-300 shadow-[0_0_0_1px_rgba(251,191,36,0.28),0_6px_24px_-6px_rgba(251,191,36,0.18)]"
            : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/20 hover:text-zinc-100"
        }`}
      >
        {locked ? (
          <Lock size={14} className="-rotate-45" />
        ) : (
          <DiamondIcon size={14} className="-rotate-45" />
        )}
      </button>
    );
  }

  const renderHint = (h: RoundData["hints"][number]) =>
    h.type === "text" ? (
      <p className="mx-auto max-w-3xl text-center text-[15px] leading-relaxed text-neutral-100">
        {h.value}
      </p>
    ) : (
      <img
        src={h.value}
        alt={h.alt ?? "Hint image"}
        className="h-28 w-28 object-contain select-none"
        draggable={false}
      />
    );

  return (
    <main className="min-h-screen bg-theme-dark text-neutral-100">
      {/* Header */}

      <div className="max-w-7xl mx-auto px-4 pt-4 mb-10 flex items-center justify-between">
        <Link href="/">
          <div className="text-3xl title tracking-tight text-primary">
            Brandle
          </div>
        </Link>
      </div>

      <div className="mx-auto max-w-4xl px-6 pt-4">
        <section className="text-center">
          <h1 className="mt-2 text-2xl font-semibold tracking-tight title md:text-4xl text-neutral-100">
            Guess the brand
          </h1>

          {/* Hint stage */}
          <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-6">
            <div className="relative h-56 md:h-64">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={page}
                  className="absolute inset-0 grid place-items-center"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  {renderHint(hints[page])}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Diamonds nav */}
          <div className="mt-5 flex items-center justify-center gap-4">
            {hints.map((_, i) => {
              const locked = i >= revealed;
              const active = i === page;
              return (
                <Diamond
                  key={i}
                  locked={locked}
                  active={active}
                  onClick={!locked ? () => setPage(i) : undefined}
                />
              );
            })}
          </div>

          {/* Wrong guesses */}
          {!!wrong.length && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {wrong.map((g, i) => (
                <span
                  key={g + i}
                  className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-sm text-neutral-200"
                >
                  <XCircle className="text-red-500" size={16} />
                  {g}
                </span>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={submit} className="mt-6">
            <input
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              disabled={!!done}
              type="text"
              placeholder={placeholder}
              className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-700 disabled:opacity-60"
            />
          </form>

          {/* Status */}
          <p className="mt-3 text-sm text-neutral-400">
            {done === "win" && "Correct!"}
            {done === "lose" && "No more guesses."}
          </p>
        </section>

        {/* Footer Actions */}
      </div>
    </main>
  );
}
