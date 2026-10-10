import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';
import { playHugSqueeze } from '../utils/soundEffects';
import { getHugCount, incrementHugCount } from '../utils/hugStorage';

export default function VirtualHugSection({ onTriggerHearts }) {
  const [isHugging, setIsHugging] = useState(false);
  // STRICT PER-DEVICE COUNTER: Starts strictly at 0 on any new device/browser
  const [hugCount, setHugCount] = useState(() => getHugCount());
  const [showFeedback, setShowFeedback] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Listen for reset events (development/testing only)
  useEffect(() => {
    const handleReset = () => {
      setHugCount(0);
      setShowFeedback(false);
    };
    window.addEventListener('hug-count-reset', handleReset);
    return () => window.removeEventListener('hug-count-reset', handleReset);
  }, []);

  const handleHugClick = (e) => {
    playHugSqueeze();
    setIsHugging(true);
    setIsShaking(true);
    setShowFeedback(true);

    const newCount = incrementHugCount();
    setHugCount(newCount);

    // Trigger multiple flying hearts
    const rect = e.currentTarget.getBoundingClientRect();
    if (onTriggerHearts) {
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          onTriggerHearts(
            rect.left + rect.width / 2 + (Math.random() * 60 - 30),
            rect.top - 20
          );
        }, i * 80);
      }
    }

    // Reset shaking and hugging animation
    setTimeout(() => setIsShaking(false), 500);
    setTimeout(() => setIsHugging(false), 800);
  };

  return (
    <div
      className={isShaking ? 'shake-animation' : ''}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        textAlign: 'center'
      }}
    >
      {/* Header */}
      <div style={{ paddingTop: '4px' }}>
        <h1
          style={{
            fontSize: '1.9rem',
            fontWeight: 700,
            color: '#fdfbf7',
            letterSpacing: '-0.5px',
            marginBottom: '4px'
          }}
        >
          virtual hug 🫂
        </h1>
        <p style={{ fontSize: '0.94rem', color: '#a6b0c3' }}>
          buat kamu yang lagi kedinginan atau kangen di UI
        </p>
      </div>

      {/* Hug Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="navy-card"
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '36px 20px 28px',
          position: 'relative'
        }}
      >
        <div className="washi-tape washi-tape-pink" />

        {/* Cute Animated Character (Lovable Teddy Cuddle) */}
        <div
          style={{
            width: '210px',
            height: '210px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '10px 0 24px'
          }}
        >
          {/* Pulsing Aura */}
          <motion.div
            animate={{
              scale: isHugging ? [1, 1.35, 1.1] : [1, 1.08, 1],
              opacity: isHugging ? 0.6 : 0.25
            }}
            transition={{ duration: isHugging ? 0.4 : 2, repeat: isHugging ? 0 : Infinity }}
            style={{
              position: 'absolute',
              width: '170px',
              height: '170px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #f4b8c5 0%, rgba(244, 184, 197, 0) 70%)',
              zIndex: 0
            }}
          />

          {/* Character SVG */}
          <motion.svg
            width="190"
            height="190"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'relative', zIndex: 1 }}
            animate={
              isHugging
                ? {
                    scale: [1, 1.18, 0.95, 1.05],
                    rotate: [0, -3, 3, 0]
                  }
                : {
                    y: [-3, 3, -3]
                  }
            }
            transition={{
              duration: isHugging ? 0.6 : 3,
              repeat: isHugging ? 0 : Infinity,
              ease: 'easeInOut'
            }}
          >
            {/* Bear Ears */}
            <circle cx="65" cy="62" r="22" fill="#edd6bf" />
            <circle cx="65" cy="62" r="13" fill="#f8cfd9" />
            <circle cx="135" cy="62" r="22" fill="#edd6bf" />
            <circle cx="135" cy="62" r="13" fill="#f8cfd9" />

            {/* Bear Body */}
            <ellipse cx="100" cy="142" rx="55" ry="46" fill="#edd6bf" />

            {/* Bear Head */}
            <ellipse cx="100" cy="98" rx="52" ry="46" fill="#f4e3d3" />

            {/* Cheeks Blushing */}
            <motion.ellipse
              cx="74"
              cy="108"
              rx="9"
              ry="6"
              fill="#f4aab8"
              animate={{ opacity: isHugging ? 0.9 : 0.55 }}
            />
            <motion.ellipse
              cx="126"
              cy="108"
              rx="9"
              ry="6"
              fill="#f4aab8"
              animate={{ opacity: isHugging ? 0.9 : 0.55 }}
            />

            {/* Eyes */}
            {isHugging ? (
              // Happy squinting eyes when hugging
              <>
                <path
                  d="M70 94 Q76 86 82 94"
                  stroke="#38222b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M118 94 Q124 86 130 94"
                  stroke="#38222b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </>
            ) : (
              // Cute round eyes
              <>
                <circle cx="76" cy="94" r="5" fill="#38222b" />
                <circle cx="78" cy="92" r="1.8" fill="#fff" />
                <circle cx="124" cy="94" r="5" fill="#38222b" />
                <circle cx="126" cy="92" r="1.8" fill="#fff" />
              </>
            )}

            {/* Snout */}
            <ellipse cx="100" cy="106" rx="15" ry="11" fill="#fff9f3" />
            <ellipse cx="100" cy="102" rx="5.5" ry="3.8" fill="#543841" />
            <path
              d="M100 106 L100 110 M96 110 Q100 114 104 110"
              stroke="#543841"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Little Heart on Chest */}
            <path
              d="M100 134 C97 129 90 130 90 136 C90 142 100 148 100 148 C100 148 110 142 110 136 C110 130 103 129 100 134 Z"
              fill="#e08da0"
            />

            {/* Arms - Animated Hugging Motion */}
            <motion.path
              d={
                isHugging
                  ? 'M55 135 C50 120 70 125 90 135' // folded inwards
                  : 'M55 130 C45 140 50 155 65 148'
              }
              stroke="#edd6bf"
              strokeWidth="15"
              strokeLinecap="round"
              fill="none"
              animate={isHugging ? { pathLength: [0.8, 1] } : {}}
            />
            <motion.path
              d={
                isHugging
                  ? 'M145 135 C150 120 130 125 110 135' // folded inwards
                  : 'M145 130 C155 140 150 155 135 148'
              }
              stroke="#edd6bf"
              strokeWidth="15"
              strokeLinecap="round"
              fill="none"
              animate={isHugging ? { pathLength: [0.8, 1] } : {}}
            />
          </motion.svg>
        </div>

        {/* Hug Button: [ peluk aku ] */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleHugClick}
          className="btn-primary"
          style={{
            padding: '16px 42px',
            fontSize: '1.2rem',
            borderRadius: '999px',
            boxShadow: '0 8px 24px rgba(224, 141, 160, 0.45)',
            cursor: 'pointer'
          }}
        >
          <HeartHandshake size={22} />
          <span>[ peluk aku ]</span>
        </motion.button>

        {/* Response Feedback Bubble */}
        <div style={{ minHeight: '80px', marginTop: '18px', display: 'flex', alignItems: 'center' }}>
          <AnimatePresence mode="wait">
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  background: 'rgba(244, 184, 197, 0.15)',
                  border: '1px solid rgba(244, 184, 197, 0.35)',
                  borderRadius: '16px',
                  padding: '14px 20px',
                  maxWidth: '360px'
                }}
              >
                <p
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#fdfbf7',
                    marginBottom: '4px'
                  }}
                >
                  peluk virtual berhasil dikirim 🫂
                </p>
                <p
                  className="handwritten"
                  style={{
                    fontSize: '1.25rem',
                    color: '#f4b8c5',
                    margin: 0
                  }}
                >
                  peluk ini berlaku sampai kamu pulang.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Counter */}
        <div style={{ marginTop: '8px', color: '#8e9aaf', fontSize: '0.86rem' }}>
          sudah dipeluk virtual sebanyak{' '}
          <span style={{ color: '#f4b8c5', fontWeight: 700 }}>{hugCount}</span> kali 💕
        </div>
      </motion.div>
    </div>
  );
}
