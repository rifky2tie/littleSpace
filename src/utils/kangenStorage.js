export const KANGEN_STORAGE_KEY = 'our-little-space-kangen-count';

/**
 * Get current counter value strictly from localStorage for this specific device.
 * Guaranteed to start at 0 if no clicks have been made yet on this device.
 */
export function getKangenCount() {
  try {
    const saved = localStorage.getItem(KANGEN_STORAGE_KEY);
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0; // Strictly 0 for any new device / browser
  } catch {
    return 0;
  }
}

/**
 * Increment and save counter for this specific device in localStorage.
 */
export function incrementKangenCount() {
  const current = getKangenCount();
  const next = current + 1;
  try {
    localStorage.setItem(KANGEN_STORAGE_KEY, next.toString());
  } catch (err) {
    console.warn('localStorage not accessible:', err);
  }
  return next;
}

/**
 * Helper function strictly for development / testing.
 * Not exposed in production UI.
 */
export function resetKangenCounter() {
  try {
    localStorage.removeItem(KANGEN_STORAGE_KEY);
    window.dispatchEvent(new Event('kangen-count-reset'));
  } catch (err) {
    console.error('Failed to reset kangen counter:', err);
  }
}

// Attach to window for easy developer testing in DevTools console
if (typeof window !== 'undefined') {
  window.resetKangenCounter = resetKangenCounter;
}
