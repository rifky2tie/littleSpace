import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { playChime } from '../utils/soundEffects';

export default function LandingPage({ onEnter, onTriggerHearts }) {
  const handleEnterClick = (e) => {
    playChime();
    const rect = e.currentTarget.getBoundingClientRect();
    if (onTriggerHearts) {
      onTriggerHearts(rect.left + rect.width / 2, rect.top);
    }
    setTimeout(() => {
      onEnter();
    }, 450);
  };

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 20px',
        position: 'relative'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',
          maxWidth: '460px',
          background: 'rgba(21, 34, 56, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(244, 184, 197, 0.22)',
          borderRadius: '28px',
          padding: '36px 26px 32px',
          position: 'relative',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45)',
          textAlign: 'center'
        }}
      >
        {/* Washi tape topper */}
        <div className="washi-tape washi-tape-pink" />

        {/* Floating gentle icons */}
        <motion.div
          animate={{ y: [-3, 4, -3], rotate: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(244, 184, 197, 0.15)',
            border: '1px solid rgba(244, 184, 197, 0.3)',
            marginBottom: '18px',
            color: '#f4b8c5'
          }}
        >
          <Heart size={28} fill="#f4b8c5" strokeWidth={1.5} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            fontSize: '1.9rem',
            fontWeight: 700,
            color: '#fdfbf7',
            letterSpacing: '-0.5px',
            marginBottom: '18px'
          }}
        >
          our little space <span style={{ color: '#f4b8c5' }}>♡</span>
        </motion.h1>

        {/* Intimate Letter Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            background: 'rgba(253, 251, 247, 0.06)',
            borderRadius: '18px',
            padding: '18px 16px',
            border: '1px dashed rgba(244, 184, 197, 0.25)',
            marginBottom: '22px'
          }}
        >
          <p
            style={{
              fontSize: '1.2rem',
              lineHeight: 1.6,
              color: '#f5f3f0',
              fontWeight: 500,
              marginBottom: '12px'
            }}
          >
            10 hari.<br />
            cuma 10 hari.<br />
            <span style={{ color: '#f4b8c5', fontWeight: 600 }}>
              tapi kenapa rasanya kayak 10 tahun?
            </span>
          </p>

          <p
            style={{
              fontSize: '0.9rem',
              color: '#a6b0c3',
              lineHeight: 1.55
            }}
          >
            karena kamu lagi jauh, aku bikin tempat kecil ini buat nemenin kamu sampai kita ketemu lagi.
          </p>
        </motion.div>

        {/* Enter Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEnterClick}
          className="btn-primary"
          style={{
            width: '100%',
            padding: '15px 24px',
            fontSize: '1.05rem',
            cursor: 'pointer'
          }}
        >
          <span>masuk ke tempat kecil kita</span>
          <ArrowRight size={18} />
        </motion.button>

        <p
          className="handwritten"
          style={{
            fontSize: '1.15rem',
            color: '#a6b0c3',
            marginTop: '16px',
            marginBottom: 0
          }}
        >
          dibuka khusus untuk kamu yang lagi di UI 🎭
        </p>
      </motion.div>
    </div>
  );
}
