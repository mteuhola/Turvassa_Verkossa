type Frame = () => void;
interface TurnRenderer {
  startAnimation: (
    frames: Frame[],
    duration: number,
    onEnd: () => void,
  ) => void;
}

/**
 * page-flip 2.0.7 animates both halves of a rigid sheet's rotation, including
 * the half outside our portrait viewport. Keep only the visible half, while
 * retaining the engine's completion callback (page index and shadow cleanup).
 */
export function turnVisibleSheet(
  renderer: TurnRenderer,
  direction: "forward" | "backward",
  startTurn: () => void,
) {
  const original = renderer.startAnimation;
  renderer.startAnimation = (frames, _duration, onEnd) => {
    const midpoint = Math.floor(frames.length / 2);
    const visible =
      direction === "forward"
        ? frames.slice(0, midpoint + 1)
        : frames.slice(midpoint);
    original.call(renderer, visible, 420, onEnd);
  };
  try {
    startTurn();
  } finally {
    // The library creates its frame list synchronously. Do not alter later turns.
    renderer.startAnimation = original;
  }
}
