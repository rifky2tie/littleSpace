import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';
import { playPop, playChime } from '../utils/soundEffects';

export default function GallerySection({ onTriggerHearts }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [failedImages, setFailedImages] = useState({});

  const handleImageError = (id) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handlePhotoClick = (photo, e) => {
    playChime();
    const rect = e.currentTarget.getBoundingClientRect();
    if (onTriggerHearts) {
      onTriggerHearts(rect.left + rect.width / 2, rect.top);
    }
    setSelectedPhoto(photo);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
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
          our little gallery 📸
        </h1>
        <p style={{ fontSize: '0.94rem', color: '#a6b0c3' }}>
          album kenangan kecil biar nggak lupa rasanya bareng kamu
        </p>
      </div>

      {/* Scrapbook Polaroid Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '24px 18px',
          padding: '8px 4px'
        }}
      >
        {loveConfig.photoList.map((photo) => {
          const isError = failedImages[photo.id];

          return (
            <motion.div
              key={photo.id}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => handlePhotoClick(photo, e)}
              className="polaroid-card"
              style={{
                transform: `rotate(${photo.rotation}deg)`
              }}
            >
              {/* Tape sticker on top corner */}
              <div
                className={`washi-tape ${
                  photo.rotation > 0 ? 'washi-tape-corner-left' : 'washi-tape-corner-right'
                }`}
              />

              <div className="polaroid-image-wrapper">
                {isError ? (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #fcecee, #f7e6ea)',
                      color: '#d4738a',
                      padding: '16px',
                      textAlign: 'center'
                    }}
                  >
                    <Heart size={38} fill="#d4738a" style={{ marginBottom: '8px' }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>foto cinta kita</span>
                  </div>
                ) : (
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    loading="lazy"
                    onError={() => handleImageError(photo.id)}
                  />
                )}
              </div>

              <div className="polaroid-caption">
                &ldquo;{photo.caption}&rdquo;
              </div>

              {photo.date && <div className="polaroid-date">— {photo.date}</div>}
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="modal-overlay"
            onClick={() => {
              playPop();
              setSelectedPhoto(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="modal-content"
              style={{
                background: '#ffffff',
                padding: '20px 20px 24px',
                maxWidth: '460px',
                borderRadius: '16px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  playPop();
                  setSelectedPhoto(null);
                }}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(0, 0, 0, 0.08)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 2,
                  color: '#4a4250'
                }}
              >
                <X size={18} />
              </button>

              <div
                style={{
                  width: '100%',
                  maxHeight: '60vh',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  background: '#f2ece4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {failedImages[selectedPhoto.id] ? (
                  <div
                    style={{
                      height: '240px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#d4738a'
                    }}
                  >
                    <Heart size={44} fill="#d4738a" />
                    <span style={{ marginTop: '8px', fontWeight: 600 }}>foto kenangan kita</span>
                  </div>
                ) : (
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.caption}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '60vh',
                      objectFit: 'contain',
                      display: 'block'
                    }}
                  />
                )}
              </div>

              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <p
                  className="handwritten"
                  style={{
                    fontSize: '1.5rem',
                    color: '#2c2830',
                    lineHeight: 1.3,
                    margin: '0 0 6px'
                  }}
                >
                  &ldquo;{selectedPhoto.caption}&rdquo;
                </p>
                {selectedPhoto.date && (
                  <p style={{ fontSize: '0.85rem', color: '#8c8294', margin: 0 }}>
                    {selectedPhoto.date}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
