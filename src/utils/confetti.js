import confetti from 'canvas-confetti';

/**
 * Romantic Confetti Burst
 */
export function fireConfetti() {
  const count = 60;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#f4b8c5', '#e08da0', '#d5c7f2', '#fbf8f2', '#ffd166', '#ff85a2']
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 45
  });
  fire(0.2, {
    spread: 60
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.9
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 40
  });
}

/**
 * Big Celebration Confetti (for Day 10 or Monolog Ready)
 */
export function fireGrandConfetti() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#f4b8c5', '#b8a2e3', '#ffd166', '#ff9ebb', '#ffffff'];

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);
    confetti({
      particleCount,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors
    });
    confetti({
      particleCount,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors
    });
  }, 250);
}
