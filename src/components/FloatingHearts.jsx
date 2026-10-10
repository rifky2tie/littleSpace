import React, { useState } from 'react';

/**
 * Ambient background stars & twinkling effects
 */
export default function FloatingHearts({ burstHearts = [] }) {
  const [stars] = useState(() =>
    Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1.2,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 4
    }))
  );

  return (
    <>
      {/* Starry Night Atmosphere */}
      <div className="stars-bg">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`
            }}
          />
        ))}
      </div>

      {/* Dynamic Flying Heart Particles */}
      {burstHearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            fontSize: `${heart.size}px`
          }}
        >
          {heart.emoji || '❤️'}
        </span>
      ))}
    </>
  );
}
