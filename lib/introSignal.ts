let introFinished = false;
const listeners = new Set<() => void>();

/** Marks the intro sequence as finished, once, and notifies anyone waiting on it. */
export function completeIntro() {
  if (introFinished) return;
  introFinished = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

/** Runs `callback` when the intro finishes. If it already finished, runs immediately. */
export function onIntroComplete(callback: () => void) {
  if (introFinished) {
    callback();
    return () => {};
  }
  listeners.add(callback);
  return () => listeners.delete(callback);
}
