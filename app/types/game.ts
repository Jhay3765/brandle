// types/game.ts
export type TextHint = { type: "text"; label?: string; value: string };
export type ImageHint = {
  type: "image";
  label?: string;
  value: string;
  alt?: string;
};
export type Hint = TextHint | ImageHint;

export type RoundData = {
  answer: string;
  hints: Hint[];
};
