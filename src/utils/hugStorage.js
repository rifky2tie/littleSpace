export const HUG_STORAGE_KEY = 'our-little-space-hug-count';

/**
 * Get current virtual hug count strictly from localStorage for this specific device.
 * Guaranteed to start at 0 if no hugs have been sent yet on this device.
 */
export function getHugCount() {
  try {
    const saved = localStorage.getItem(HUG_STORAGE_KEY);
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
 * Increment and save virtual hug count for this specific device in localStorage.
 */
export function incrementHugCount() {
  const current = getHugCount();
  const next = current + 1;
  try {
    localStorage.setItem(HUG_STORAGE_KEY, next.toString());
  } catch (err) {
    console.warn('localStorage not accessible:', err);
  }
  return next;
}

/**
 * Helper function strictly for development / testing.
 * Not exposed in production UI.
 */
export function resetHugCounter() {
  try {
    localStorage.removeItem(HUG_STORAGE_KEY);
    window.dispatchEvent(new Event('hug-count-reset'));
  } catch (err) {
    console.error('Failed to reset hug counter:', err);
  }
}

// Attach to window for easy developer testing in DevTools console
if (typeof window !== 'undefined') {
  window.resetHugCounter = resetHugCounter;
}
