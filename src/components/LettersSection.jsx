import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, X, Heart } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';
import { calculateLdrStatus } from '../utils/dateUtils';
import { playChime, playPop } from '../utils/soundEffects';

export default function LettersSection({ onTriggerHearts }) {
  const status = calculateLdrStatus(loveConfig.startDate, loveConfig.endDate);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [lockedNoticeDay, setLockedNoticeDay] = useState(null);

  const handleLetterClick = (letter, e) => {
    // Check if letter is unlocked
    const isUnlocked = letter.day <= status.currentDay;

    if (!isUnlocked) {
      playPop();
      setLockedNoticeDay(letter.day);
      return;
    }

    playChime();
    const rect = e.currentTarget.getBoundingClientRect();
    if (onTriggerHearts) {
      onTriggerHearts(rect.left + rect.width / 2, rect.top);
    }
    setSelectedLetter(letter);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', paddingTop: '4px' }}>
        <h1
          style={{
            fontSize: '1.9rem',
            fontWeight: 700,
            color: '#fdfbf7',
            letterSpacing: '-0.5px',
            marginBottom: '4px'
          }}
        >
          letters for you 💌
        </h1>
        <p style={{ fontSize: '0.94rem', color: '#a6b0c3' }}>
          satu surat untuk setiap hari. dibuka pelan-pelan ya.
        </p>
      </div>

      {/* Grid of 10 Letter Envelopes */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(145px, 1fr))',
          gap: '14px'
        }}
      >
        {loveConfig.letters.map((letter) => {
          const isUnlocked = letter.day <= status.currentDay;
          const isToday = letter.day === status.currentDay;

          return (
            <motion.div
              key={letter.day}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={(e) => handleLetterClick(letter, e)}
              className="paper-card"
              style={{
                padding: '16px 12px',
                textAlign: 'center',
                cursor: 'pointer',
                borderRadius: '16px',
                border: isToday
                  ? '2px solid #e08da0'
                  : isUnlocked
                  ? '1px solid #e2d7c9'
                  : '1px dashed #d5cbbf',
                background: isToday
                  ? 'linear-gradient(145deg, #ffffff 0%, #fff6f8 100%)'
                  : isUnlocked
                  ? '#fdfbf7'
                  : 'rgba(247, 243, 236, 0.7)',
                opacity: isUnlocked ? 1 : 0.8,
                position: 'relative'
              }}
            >
              {isToday && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-9px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#e08da0',
                    color: '#fff',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '999px',
                    letterSpacing: '0.5px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  TODAY
                </div>
              )}

              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: isUnlocked ? 'rgba(224, 141, 160, 0.15)' : 'rgba(0, 0, 0, 0.05)',
                  color: isUnlocked ? '#e08da0' : '#a196a6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 8px'
                }}
              >
                {isUnlocked ? <Mail size={20} /> : <Lock size={18} />}
              </div>

              <div
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#2c2830',
                  marginBottom: '2px'
                }}
              >
                Day {String(letter.day).padStart(2, '0')}
              </div>

              <div
                className="handwritten"
                style={{
                  fontSize: '1rem',
                  color: isUnlocked ? '#593540' : '#8c8294',
                  lineHeight: 1.2
                }}
              >
                {isUnlocked ? 'open letter 💌' : 'buka nanti...'}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal: Locked Notice */}
      <AnimatePresence>
        {lockedNoticeDay && (
          <div className="modal-overlay" onClick={() => setLockedNoticeDay(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="modal-content"
              style={{ textAlign: 'center', maxWidth: '380px', padding: '32px 24px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="washi-tape washi-tape-pink" />
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'rgba(224, 141, 160, 0.15)',
                  color: '#e08da0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px'
                }}
              >
                <Lock size={26} />
              </div>

              <h3 style={{ fontSize: '1.25rem', color: '#2c2830', marginBottom: '8px' }}>
                Day {lockedNoticeDay} masih rahasia 🤫
              </h3>

              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                  color: '#593540',
                  marginBottom: '16px',
                  whiteSpace: 'pre-line'
                }}
              >
                ehh belum boleh dibuka 😭{'\n'}
                sabar dulu ya sayang.
              </p>

              <p style={{ fontSize: '0.85rem', color: '#8c8294', marginBottom: '20px' }}>
                Surat ini baru terbuka saat memasuki Hari ke-{lockedNoticeDay}.
              </p>

              <button
                type="button"
                onClick={() => setLockedNoticeDay(null)}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                oke, aku sabar kok 🥺
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Letter Reader (Scrapbook Paper Look) */}
      <AnimatePresence>
        {selectedLetter && (
          <div className="modal-overlay" onClick={() => setSelectedLetter(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              className="modal-content"
              style={{
                position: 'relative',
                padding: '36px 26px 28px',
                backgroundImage: 'repeating-linear-gradient(#fdfbf7 0px, #fdfbf7 27px, #e8dfd5 28px)',
                lineHeight: '28px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="washi-tape washi-tape-pink" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedLetter(null)}
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '16px',
                  background: 'rgba(0, 0, 0, 0.06)',
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

              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#e08da0',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '2px'
                }}
              >
                Surat Hari ke-{selectedLetter.day}
              </div>

              <h2
                style={{
                  fontSize: '1.35rem',
                  color: '#2c2830',
                  fontWeight: 700,
                  marginBottom: '16px',
                  lineHeight: 1.3
                }}
              >
                {selectedLetter.title}
              </h2>

              <p
                className="handwritten"
                style={{
                  fontSize: '1.45rem',
                  color: '#2b232c',
                  lineHeight: '32px',
                  marginBottom: '24px',
                  whiteSpace: 'pre-wrap'
                }}
              >
                &ldquo;{selectedLetter.content}&rdquo;
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px dashed #d9cec2',
                  paddingTop: '14px'
                }}
              >
                <span className="handwritten" style={{ fontSize: '1.25rem', color: '#e08da0' }}>
                  dari {loveConfig.myNickname} dengan penuh cinta ♡
                </span>
                <Heart size={20} fill="#e08da0" color="#e08da0" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
