import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X, Heart } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';
import { fireConfetti } from '../utils/confetti';
import { playChime, playPop } from '../utils/soundEffects';

export default function ActressQuizModal({ isOpen, onClose, onTriggerHearts }) {
  const [selectedResult, setSelectedResult] = useState(null);

  if (!isOpen) return null;

  const options = [
    { id: '1', label: 'JUARA 1', icon: '🥇', desc: 'paling keren di panggung' },
    { id: '2', label: 'JUARA 2', icon: '🥈', desc: 'luar biasa memukau' },
    { id: '3', label: 'JUARA 3', icon: '🥉', desc: 'penampilan membanggakan' },
    { id: 'heart', label: 'JUARA DI HATI AKU', icon: '❤️', desc: 'selalu nomor satu selamanya' }
  ];

  const handleSelect = (opt, e) => {
    playChime();
    fireConfetti();
    const rect = e.currentTarget.getBoundingClientRect();
    if (onTriggerHearts) {
      onTriggerHearts(rect.left + rect.width / 2, rect.top);
    }
    setSelectedResult(opt);
  };

  const handleClose = () => {
    playPop();
    setSelectedResult(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={handleClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 10 }}
          className="modal-content"
          style={{ textAlign: 'center', padding: '32px 24px' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="washi-tape washi-tape-pink" />

          {/* Close button */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(0,0,0,0.06)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b6375'
            }}
          >
            <X size={18} />
          </button>

          {!selectedResult ? (
            <div>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(224, 141, 160, 0.16)',
                  color: '#e08da0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px'
                }}
              >
                <Trophy size={28} />
              </div>

              <h2
                style={{
                  fontSize: '1.28rem',
                  fontWeight: 800,
                  color: '#2c2830',
                  letterSpacing: '-0.3px',
                  marginBottom: '6px'
                }}
              >
                HOW DID MY FAVORITE ACTRESS DO? 🎭
              </h2>

              <p style={{ fontSize: '0.88rem', color: '#6b6375', marginBottom: '20px' }}>
                pilih salah satu buat tahu respon dari aku:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {options.map((opt) => (
                  <motion.button
                    key={opt.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={(e) => handleSelect(opt, e)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 18px',
                      background: '#fff',
                      border: '1px solid #ebdada',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ fontSize: '1.6rem' }}>{opt.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.98rem', color: '#2c2830' }}>
                        {opt.label}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#8c8294' }}>{opt.desc}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <motion.div
                initial={{ scale: 0.7 }}
                animate={{ scale: [0.7, 1.2, 1] }}
                transition={{ duration: 0.4 }}
                style={{ fontSize: '3rem', marginBottom: '10px' }}
              >
                {selectedResult.icon}
              </motion.div>

              <div
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#e08da0',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '4px'
                }}
              >
                {selectedResult.label}
              </div>

              <h3
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  color: '#2c2830',
                  marginBottom: '16px'
                }}
              >
                Kamu Tetap Nomor Satu! 🌟
              </h3>

              <div
                style={{
                  background: 'rgba(244, 184, 197, 0.12)',
                  border: '1px dashed #e08da0',
                  borderRadius: '16px',
                  padding: '18px 16px',
                  marginBottom: '20px'
                }}
              >
                <p
                  className="handwritten"
                  style={{
                    fontSize: '1.45rem',
                    lineHeight: 1.4,
                    color: '#2c2830',
                    margin: 0
                  }}
                >
                  &ldquo;{loveConfig.actressQuote}&rdquo;
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                <Heart size={18} fill="#2b1720" />
                <span>aku sayang kamu ❤️</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
