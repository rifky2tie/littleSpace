import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';
import { calculateLdrStatus } from '../utils/dateUtils';
import MissingYouButton from './MissingYouButton';

export default function CountdownSection({
  onTriggerHearts,
  onGoToEnding
}) {
  const status = calculateLdrStatus(loveConfig.startDate, loveConfig.endDate);
  const [randomStatusIndex, setRandomStatusIndex] = useState(0);

  // Cycle random statuses every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setRandomStatusIndex((prev) => (prev + 1) % loveConfig.randomStatuses.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const todayMessage =
    loveConfig.dailyMessages[status.currentDay] ||
    "tetap semangat dan jaga diri baik-baik ya cantikk ❤️";

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Header card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          textAlign: 'center',
          paddingTop: '6px'
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(244, 184, 197, 0.12)',
            border: '1px solid rgba(244, 184, 197, 0.25)',
            padding: '4px 14px',
            borderRadius: '999px',
            fontSize: '0.84rem',
            color: '#f4b8c5',
            fontWeight: 600,
            marginBottom: '10px'
          }}
        >
          <Sparkles size={14} />
          <span>special little space for Siti Meyla Bakti</span>
        </div>

        <h1
          style={{
            fontSize: '1.9rem',
            fontWeight: 700,
            color: '#fdfbf7',
            letterSpacing: '-0.5px',
            marginBottom: '4px'
          }}
        >
          ldr survival kit 🫂
        </h1>
        <p
          style={{
            fontSize: '0.98rem',
            color: '#a6b0c3',
            fontWeight: 500
          }}
        >
          misi: bertahan sampai kita ketemu lagi.
        </p>
      </motion.div>

      {/* Main Countdown & Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="navy-card"
        style={{ textAlign: 'center', position: 'relative' }}
      >
        <div className="washi-tape washi-tape-pink" />

        {/* Big Day Display */}
        <div style={{ marginTop: '8px' }}>
          <span
            style={{
              fontSize: '0.85rem',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: '#f4b8c5',
              fontWeight: 700
            }}
          >
            LDR PROGRESS
          </span>
          <h2
            style={{
              fontSize: '2.7rem',
              fontWeight: 800,
              color: '#fdfbf7',
              letterSpacing: '-1px',
              margin: '2px 0 0',
              fontFamily: 'var(--font-ui)'
            }}
          >
            DAY {status.currentDay} / 10
          </h2>
          <p
            style={{
              fontSize: '1.15rem',
              fontWeight: 600,
              color: '#f4b8c5',
              marginTop: '4px'
            }}
          >
            {status.daysRemaining === 0 ? (
              <span>hari ini waktunya kita ketemu! 😭❤️</span>
            ) : (
              <span>{status.daysRemaining} hari lagi sampai kita ketemu ❤️</span>
            )}
          </p>
        </div>

        {/* Visual Progress Bar */}
        <div style={{ margin: '22px 0 16px' }}>
          <div
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '1.1rem',
              letterSpacing: '4px',
              color: '#f4b8c5',
              marginBottom: '8px',
              textShadow: '0 0 10px rgba(244, 184, 197, 0.4)'
            }}
          >
            [{status.progressBar}]
          </div>

          {/* Smooth animated progress line */}
          <div
            style={{
              width: '100%',
              height: '10px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '999px',
              overflow: 'hidden',
              padding: '2px',
              boxSizing: 'border-box'
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${status.progressPercent}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #f4b8c5, #e08da0, #c8b9ea)',
                borderRadius: '999px',
                boxShadow: '0 0 12px rgba(244, 184, 197, 0.6)'
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: '#8e9aaf',
              marginTop: '6px'
            }}
          >
            <span>mulai berangkat</span>
            <span>{status.progressPercent}% terlewati</span>
            <span>pulang ke pelukan</span>
          </div>
        </div>

        {/* Dynamic Random Status Ticker */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.22)',
            borderRadius: '14px',
            padding: '10px 16px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={randomStatusIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="handwritten"
              style={{
                fontSize: '1.25rem',
                color: '#e2e8f0',
                margin: 0
              }}
            >
              &ldquo;{loveConfig.randomStatuses[randomStatusIndex]}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* "Hari Ini..." Daily Card */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="paper-card"
        style={{
          transform: 'rotate(-0.5deg)',
          boxShadow: '0 10px 24px rgba(0, 0, 0, 0.28)'
        }}
      >
        <div className="washi-tape" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Calendar size={18} color="#e08da0" />
          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#8c8294'
            }}
          >
            hari ini...
          </span>
        </div>

        <p
          className="handwritten"
          style={{
            fontSize: '1.55rem',
            lineHeight: 1.35,
            color: '#2c2830',
            fontWeight: 700,
            margin: '4px 0 10px'
          }}
        >
          &ldquo;{todayMessage}&rdquo;
        </p>

        <p
          style={{
            fontSize: '0.82rem',
            color: '#7a7082',
            margin: 0,
            borderTop: '1px dashed #e8ded2',
            paddingTop: '8px'
          }}
        >
          Day {status.currentDay} dari 10 hari perjuangan di {loveConfig.destination} 🎭
        </p>
      </motion.div>

      {/* Main Feature: "🥺 aku kangen" Button */}
      <MissingYouButton onTriggerHearts={onTriggerHearts} />

      {/* Special Day 10 Banner if reached */}
      {status.isDay10 && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="paper-card"
          style={{
            background: 'linear-gradient(135deg, #fff3f5 0%, #fdf6ec 100%)',
            border: '2px solid #f4b8c5',
            textAlign: 'center',
            marginTop: '12px'
          }}
        >
          <h3 style={{ fontSize: '1.25rem', color: '#c72d56', marginBottom: '6px' }}>
            🎉 HARI KE-10 SUDAH TIBA!
          </h3>
          <p style={{ fontSize: '0.92rem', color: '#593540', marginBottom: '14px' }}>
            Perjalanan 10 hari selesai. Buka perayaan spesial kita sekarang!
          </p>
          <button
            type="button"
            onClick={onGoToEnding}
            className="btn-primary"
            style={{ width: '100%' }}
          >
            ❤️ LIHAT PERAYAAN HARI KE-10
          </button>
        </motion.div>
      )}
    </div>
  );
}
