// Typewriter counter utility
export function typewriterCount(
  target: number,
  duration: number = 2000,
  onUpdate: (value: number) => void,
  onComplete?: () => void
) {
  const start = performance.now();
  const step = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out quart for a mechanical feel
    const eased = 1 - Math.pow(1 - progress, 4);
    onUpdate(Math.floor(eased * target));
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      onComplete?.();
    }
  };
  requestAnimationFrame(step);
}
