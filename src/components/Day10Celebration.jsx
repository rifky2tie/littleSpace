import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowLeft } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';
import { fireGrandConfetti } from '../utils/confetti';
import { playChime, playPop } from '../utils/soundEffects';

export default function Day10Celebration({ onBackToDashboard, onTriggerHearts }) {
  const [showMeetPopup, setShowMeetPopup] = useState(false);

  useEffect(() => {
    // Fire celebration confetti when entering Day 10 celebration
    playChime();
    fireGrandConfetti();
  }, []);

  const handleMeetClick = (e) => {
    playChime();
    fireGrandConfetti();
    const rect = e.currentTarget.getBoundingClientRect();
    if (onTriggerHearts) {
      onTriggerHearts(rect.left + rect.width / 2, rect.top);
    }
    setShowMeetPopup(true);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 4px',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      {/* Back button */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
        <button
          type="button"
          onClick={() => {
            playPop();
            onBackToDashboard();
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#fdfbf7',
            padding: '8px 14px',
            borderRadius: '999px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem'
          }}
        >
          <ArrowLeft size={16} />
          <span>kembali ke dashboard</span>
        </button>
      </div>

      {/* Main Celebratory Paper Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="paper-card"
        style={{
          width: '100%',
          background: 'linear-gradient(145deg, #fffaf4 0%, #fff1f4 100%)',
          border: '2px solid #f4b8c5',
          boxShadow: '0 20px 45px rgba(244, 184, 197, 0.35)',
          padding: '38px 24px 34px'
        }}
      >
        <div className="washi-tape washi-tape-pink" />

        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'rgba(224, 141, 160, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            color: '#e08da0'
          }}
        >
          <Sparkles size={38} />
        </motion.div>

        <h1
          style={{
            fontSize: '2.4rem',
            fontWeight: 800,
            color: '#c72d56',
            letterSpacing: '-0.5px',
            marginBottom: '4px'
          }}
        >
          YOU MADE IT. 🥹
        </h1>

        <p
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#543841',
            marginBottom: '4px'
          }}
        >
          10 hari akhirnya selesai.
        </p>

        <p
          className="handwritten"
          style={{
            fontSize: '1.5rem',
            color: '#d4738a',
            marginBottom: '24px'
          }}
        >
          sebentar lagi kita ketemu. ❤️
        </p>

        {/* Heartfelt Note Box */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px dashed #e08da0',
            borderRadius: '18px',
            padding: '22px 18px',
            marginBottom: '28px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)'
          }}
        >
          <p
            className="handwritten"
            style={{
              fontSize: '1.55rem',
              lineHeight: 1.5,
              color: '#2c2830',
              margin: 0
            }}
          >
            &ldquo;makasih udah bertahan sejauh ini.<br />
            sekarang nggak perlu kangen lewat layar lagi.&rdquo;
          </p>
        </div>

        {/* Emotion Payoff Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMeetClick}
          className="btn-primary"
          style={{
            width: '100%',
            padding: '17px 28px',
            fontSize: '1.18rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <Heart size={22} fill="#2b1720" />
          <span>❤️ FINALLY, WE MEET</span>
        </motion.button>
      </motion.div>

      {/* Sweet Climax Popup: "come home, pretty girl." */}
      <AnimatePresence>
        {showMeetPopup && (
          <div
            className="modal-overlay"
            onClick={() => {
              playPop();
              setShowMeetPopup(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="modal-content"
              style={{
                textAlign: 'center',
                padding: '44px 28px',
                background: '#fff9fb',
                border: '2px solid #f4b8c5',
                boxShadow: '0 20px 50px rgba(224, 141, 160, 0.45)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="washi-tape washi-tape-pink" />

              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ fontSize: '3.5rem', marginBottom: '14px' }}
              >
                🏠🫂
              </motion.div>

              <h2
                className="handwritten"
                style={{
                  fontSize: '2.5rem',
                  color: '#c72d56',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  marginBottom: '14px'
                }}
              >
                come home, pretty girl.
              </h2>

              <p
                style={{
                  fontSize: '1.05rem',
                  color: '#543841',
                  lineHeight: 1.6,
                  marginBottom: '24px'
                }}
              >
                Pintu pelukanku sudah terbuka lebar buat kamu, {loveConfig.nickname}.
                Aku kangen banget, dan aku bangga banget sama kamu.
              </p>

              <button
                type="button"
                onClick={() => {
                  playPop();
                  setShowMeetPopup(false);
                }}
                className="btn-primary"
                style={{ width: '100%', padding: '14px 24px' }}
              >
                peluk aku sekarang! 🫂💕
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
