"use client";

import React, { useMemo, useState } from "react";
import BrandleRound from "./components/BrandleRound";
import CorrectScreen from "./components/CorrectScreen";
import LoseScreen from "./components/LoseScreen";
import type { RoundData } from "../types/game";
import { getShuffledRounds } from "./pool";

export default function Page() {
  // Build the first shuffled pass of the pool
  const [queue, setQueue] = useState<RoundData[]>(() => getShuffledRounds());
  const [idx, setIdx] = useState(0);
  const [mode, setMode] = useState<"play" | "win" | "lose">("play");

  const round = useMemo(() => queue[idx], [queue, idx]);

  const handleWin = () => setMode("win");
  const handleLose = () => setMode("lose");

  const advanceQueue = () => {
    // If we're at the end, reshuffle a fresh pass
    if (idx >= queue.length - 1) {
      setQueue(getShuffledRounds());
      setIdx(0);
    } else {
      setIdx((i) => i + 1);
    }
    setMode("play");
  };

  const goNextRound = () => advanceQueue();
  const retrySameRound = () => setMode("play"); // retry without advancing

  if (mode === "win") {
    return (
      <CorrectScreen
        answer={round.answer}
        hints={round.hints}
        sideImage={{
          src: "https://i.imgflip.com/1bij.jpg",
          alt: "Roll Safe",
        }}
        onNext={goNextRound}
      />
    );
  }

  if (mode === "lose") {
    return (
      <LoseScreen
        answer={round.answer}
        hints={round.hints}
        onRetry={retrySameRound}
        onNext={goNextRound}
      />
    );
  }

  return (
    <BrandleRound
      key={`round-${idx}-${mode}`} // ensures clean reset on state changes
      round={round}
      onWin={handleWin}
      onLose={handleLose}
    />
  );
}
