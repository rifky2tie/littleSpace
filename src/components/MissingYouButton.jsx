import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';
import { playPop } from '../utils/soundEffects';
import { getKangenCount, incrementKangenCount } from '../utils/kangenStorage';

export default function MissingYouButton({ onTriggerHearts }) {
  // STRICT PER-DEVICE COUNTER: Starts strictly from 0 on any new device/browser
  const [count, setCount] = useState(() => getKangenCount());
  const [replyMessage, setReplyMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // Listen for reset events (development/testing only)
  useEffect(() => {
    const handleReset = () => {
      setCount(0);
      setReplyMessage('');
    };
    window.addEventListener('kangen-count-reset', handleReset);
    return () => window.removeEventListener('kangen-count-reset', handleReset);
  }, []);

  const handleClick = (e) => {
    playPop();
    const newCount = incrementKangenCount();
    setCount(newCount);

    // Pick random message
    const replies = loveConfig.kangenReplies;
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    setReplyMessage(randomReply);

    // Trigger hearts flying up from the button
    const rect = e.currentTarget.getBoundingClientRect();
    if (onTriggerHearts) {
      onTriggerHearts(rect.left + rect.width / 2, rect.top);
    }

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '28px 0 16px',
        textAlign: 'center'
      }}
    >
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleClick}
        className="btn-kangen"
      >
        <motion.span
          animate={isAnimating ? { scale: [1, 1.4, 1], rotate: [0, -15, 15, 0] } : {}}
          transition={{ duration: 0.3 }}
          style={{ display: 'inline-flex', color: '#e08da0' }}
        >
          <Heart size={24} fill="#e08da0" />
        </motion.span>
        <span>🥺 aku kangen</span>
      </motion.button>

      {/* Reply Message Bubble */}
      <div style={{ minHeight: '44px', marginTop: '14px', display: 'flex', alignItems: 'center' }}>
        <AnimatePresence mode="wait">
          {replyMessage && (
            <motion.div
              key={replyMessage + count}
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              style={{
                background: 'rgba(244, 184, 197, 0.16)',
                border: '1px solid rgba(244, 184, 197, 0.35)',
                color: '#fdfbf7',
                padding: '7px 16px',
                borderRadius: '999px',
                fontSize: '0.92rem',
                fontWeight: 600
              }}
            >
              💬 &ldquo;{replyMessage}&rdquo;
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Kangen Counter */}
      <div style={{ marginTop: '4px' }}>
        <p
          style={{
            fontSize: '0.9rem',
            color: '#a6b0c3',
            marginBottom: '4px'
          }}
        >
          kamu sudah bilang kangen sebanyak:{' '}
          <span style={{ color: '#f4b8c5', fontWeight: 700, fontSize: '1.05rem' }}>
            {count}
          </span>{' '}
          kali
        </p>
        <p
          className="handwritten"
          style={{
            fontSize: '1.18rem',
            color: '#e08da0',
            letterSpacing: '0.3px',
            margin: 0
          }}
        >
          sepertinya kita punya masalah. 🫣
        </p>
      </div>
    </div>
  );
}
