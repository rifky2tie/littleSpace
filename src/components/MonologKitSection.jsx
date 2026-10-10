import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Heart, Award, Trophy, RotateCcw } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';
import { calculateLdrStatus } from '../utils/dateUtils';
import { fireConfetti, fireGrandConfetti } from '../utils/confetti';
import { playPop, playChime } from '../utils/soundEffects';

const STORAGE_KEY = 'ldr_monolog_checklist_v1';

export default function MonologKitSection({ onOpenActressQuiz, onTriggerHearts }) {
  const status = calculateLdrStatus(
    loveConfig.startDate,
    loveConfig.endDate,
    null,
    loveConfig.competitionEndDate
  );
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : loveConfig.monologChecklist;
    } catch {
      return loveConfig.monologChecklist;
    }
  });
  const [showPrideModal, setShowPrideModal] = useState(false);
  const [hasCelebratedAll, setHasCelebratedAll] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const list = saved ? JSON.parse(saved) : loveConfig.monologChecklist;
      return list.length > 0 && list.every((i) => i.checked);
    } catch {
      return false;
    }
  });

  const totalCount = items.length;
  const completedCount = items.filter((i) => i.checked).length;
  const isAllCompleted = totalCount > 0 && completedCount === totalCount;

  // Toggle checklist item
  const toggleItem = (id) => {
    playPop();
    const updated = items.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    const willBeAll = updated.every((i) => i.checked);
    if (willBeAll && !hasCelebratedAll) {
      setHasCelebratedAll(true);
      playChime();
      fireGrandConfetti();
    }
  };

  const resetChecklist = () => {
    playPop();
    const reset = items.map((item) => ({ ...item, checked: false }));
    setItems(reset);
    setHasCelebratedAll(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reset));
  };

  const handleCheerClick = (e) => {
    playChime();
    fireConfetti();
    const rect = e.currentTarget.getBoundingClientRect();
    if (onTriggerHearts) {
      onTriggerHearts(rect.left + rect.width / 2, rect.top);
    }
    setShowPrideModal(true);
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
          monolog survival kit 🎭
        </h1>
        <p style={{ fontSize: '0.94rem', color: '#a6b0c3' }}>
          jangan sampai ada yang ketinggalan ya cantikk.
        </p>
      </div>

      {/* Checklist Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="navy-card"
        style={{ padding: '24px 20px' }}
      >
        <div className="washi-tape washi-tape-pink" />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}
        >
          <span
            style={{
              fontSize: '0.86rem',
              fontWeight: 700,
              color: '#f4b8c5',
              letterSpacing: '0.5px'
            }}
          >
            PERSIAPAN PANGGUNG: {completedCount} / {totalCount}
          </span>
          <button
            type="button"
            onClick={resetChecklist}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#8e9aaf',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.78rem'
            }}
            title="Reset checklist"
          >
            <RotateCcw size={13} />
            <span>reset</span>
          </button>
        </div>

        {/* List Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleItem(item.id)}
              className={`custom-check-item ${item.checked ? 'completed' : ''}`}
            >
              <div className="check-box">
                {item.checked && <Check size={14} strokeWidth={3} />}
              </div>
              <span
                className="check-label"
                style={{
                  fontSize: '0.94rem',
                  fontWeight: 500,
                  color: item.checked ? '#f4b8c5' : '#fdfbf7'
                }}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* All Checked Celebration Box */}
        <AnimatePresence>
          {isAllCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                marginTop: '20px',
                background: 'linear-gradient(135deg, rgba(244, 184, 197, 0.22), rgba(200, 185, 234, 0.22))',
                border: '2px solid #f4b8c5',
                borderRadius: '16px',
                padding: '18px 16px',
                textAlign: 'center'
              }}
            >
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#fdfbf7',
                  marginBottom: '6px'
                }}
              >
                MISSION READY 🎭🔥
              </h3>
              <p
                style={{
                  fontSize: '0.95rem',
                  color: '#f4b8c5',
                  fontWeight: 600,
                  lineHeight: 1.45
                }}
              >
                sekarang tinggal tampil dan kasih yang terbaik.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Cheer Button: "semangat lomba ❤️" */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        style={{ textAlign: 'center' }}
      >
        <button
          type="button"
          onClick={handleCheerClick}
          className="btn-primary"
          style={{
            width: '100%',
            padding: '16px 24px',
            fontSize: '1.1rem',
            cursor: 'pointer'
          }}
        >
          <Heart size={20} fill="#2b1720" />
          <span>semangat lomba ❤️</span>
        </button>
      </motion.div>

      {/* Post-Competition Trigger Box (Hanya muncul setelah tanggal 14) */}
      {status.isAfterDate14 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="paper-card"
          style={{
            textAlign: 'center',
            cursor: 'pointer',
            padding: '20px 18px',
            background: 'linear-gradient(145deg, #fff9fb 0%, #fdfbf7 100%)',
            border: '1px solid #ebd7dc'
          }}
          onClick={() => {
            playPop();
            onOpenActressQuiz();
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '6px' }}>
            <Trophy size={18} color="#d4738a" />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#8c8294', letterSpacing: '1px' }}>
              SETELAH LOMBA SELESAI
            </span>
          </div>
          <h3 style={{ fontSize: '1.18rem', color: '#2c2830', marginBottom: '6px' }}>
            HOW DID MY FAVORITE ACTRESS DO? 🎭
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#7a7082' }}>
            klik di sini buat cerita hasil lombanya ke aku! ✨
          </p>
        </motion.div>
      )}

      {/* Modal: Big Pride Message */}
      <AnimatePresence>
        {showPrideModal && (
          <div className="modal-overlay" onClick={() => setShowPrideModal(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="modal-content"
              style={{ textAlign: 'center', padding: '36px 24px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="washi-tape washi-tape-pink" />

              <motion.div
                animate={{ rotate: [-6, 6, -6], scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(224, 141, 160, 0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: '#e08da0'
                }}
              >
                <Award size={34} />
              </motion.div>

              <h2
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: '#2c2830',
                  marginBottom: '16px'
                }}
              >
                buat aktris kebanggaanku 🌟
              </h2>

              <p
                className="handwritten"
                style={{
                  fontSize: '1.65rem',
                  lineHeight: 1.4,
                  color: '#38222b',
                  marginBottom: '20px'
                }}
              >
                &ldquo;aku bangga sama kamu.<br />
                apapun hasilnya nanti,<br />
                aku tetap bangga.&rdquo;
              </p>

              <p
                style={{
                  fontSize: '0.9rem',
                  color: '#6b6375',
                  lineHeight: 1.5,
                  marginBottom: '24px'
                }}
              >
                Kamu udah berusaha keras latihan berhari-hari. Nikmati setiap detik di atas panggung itu ya! ❤️
              </p>

              <button
                type="button"
                onClick={() => setShowPrideModal(false)}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                makasih sayang, aku siap tampil! 🎭✨
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
