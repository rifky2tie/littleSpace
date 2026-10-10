import React from 'react';
import { playPop } from '../utils/soundEffects';

export default function Footer({ onResetLanding }) {
  return (
    <footer
      style={{
        marginTop: 'auto',
        padding: '36px 16px 20px',
        textAlign: 'center',
        borderTop: '1px dashed rgba(244, 184, 197, 0.15)',
        color: '#8e9aaf'
      }}
    >
      <p
        style={{
          fontSize: '0.86rem',
          lineHeight: 1.6,
          marginBottom: '4px'
        }}
      >
        made with too much love & a little bit of longing ♡
      </p>

      <p
        className="handwritten"
        style={{
          fontSize: '1.25rem',
          color: '#f4b8c5',
          margin: '0 0 14px'
        }}
      >
        for my favorite person, Siti Meyla Bakti.
      </p>

      {/* Discrete subtle controls: Revisit intro letter */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.74rem'
        }}
      >
        <button
          type="button"
          onClick={() => {
            playPop();
            onResetLanding();
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#707b91',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          buka surat pembuka awal
        </button>
      </div>
    </footer>
  );
}
