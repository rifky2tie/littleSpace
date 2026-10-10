import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import LandingPage from './components/LandingPage';
import Navigation from './components/Navigation';
import CountdownSection from './components/CountdownSection';
import LettersSection from './components/LettersSection';
import MonologKitSection from './components/MonologKitSection';
import VirtualHugSection from './components/VirtualHugSection';
import GallerySection from './components/GallerySection';
import Day10Celebration from './components/Day10Celebration';
import ActressQuizModal from './components/ActressQuizModal';
import FloatingHearts from './components/FloatingHearts';
import Footer from './components/Footer';

import './styles/scrapbook.css';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isActressQuizOpen, setIsActressQuizOpen] = useState(false);
  const [burstHearts, setBurstHearts] = useState([]);

  // Trigger floating heart particles at coordinates (x, y)
  const triggerBurstHearts = (x, y, count = 5) => {
    const emojis = ['❤️', '💖', '✨', '🥺', '🌸', '💕'];
    const newParticles = Array.from({ length: count }).map((_, idx) => ({
      id: `${Date.now()}-${idx}-${Math.random()}`,
      x: x + (Math.random() * 40 - 20),
      y: y + (Math.random() * 20 - 10),
      size: Math.floor(Math.random() * 12 + 18),
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    }));

    setBurstHearts((prev) => [...prev, ...newParticles]);

    // Clean up particles after animation completes
    setTimeout(() => {
      setBurstHearts((prev) =>
        prev.filter((p) => !newParticles.find((np) => np.id === p.id))
      );
    }, 2400);
  };

  return (
    <>
      {/* Subtle Grain Overlay */}
      <div className="grain-overlay" />

      {/* Ambient Twinkling Stars & Dynamic Burst Hearts */}
      <FloatingHearts burstHearts={burstHearts} />

      <div className="app-container">
        <AnimatePresence mode="wait">
          {!hasEntered ? (
            <LandingPage
              key="landing"
              onEnter={() => setHasEntered(true)}
              onTriggerHearts={(x, y) => triggerBurstHearts(x, y, 6)}
            />
          ) : (
            <motion.div
              key="main-space"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                padding: '20px 16px'
              }}
            >
              {/* Tab Content with Smooth Transitions */}
              <AnimatePresence mode="wait">
                {activeTab === 'home' && (
                  <motion.div
                    key="tab-home"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <CountdownSection
                      onTriggerHearts={(x, y) => triggerBurstHearts(x, y, 5)}
                      onGoToEnding={() => setActiveTab('day10')}
                    />
                  </motion.div>
                )}

                {activeTab === 'letters' && (
                  <motion.div
                    key="tab-letters"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <LettersSection
                      onTriggerHearts={(x, y) => triggerBurstHearts(x, y, 4)}
                    />
                  </motion.div>
                )}

                {activeTab === 'monolog' && (
                  <motion.div
                    key="tab-monolog"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <MonologKitSection
                      onOpenActressQuiz={() => setIsActressQuizOpen(true)}
                      onTriggerHearts={(x, y) => triggerBurstHearts(x, y, 5)}
                    />
                  </motion.div>
                )}

                {activeTab === 'gallery' && (
                  <motion.div
                    key="tab-gallery"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <GallerySection
                      onTriggerHearts={(x, y) => triggerBurstHearts(x, y, 4)}
                    />
                  </motion.div>
                )}

                {activeTab === 'hugs' && (
                  <motion.div
                    key="tab-hugs"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <VirtualHugSection
                      onTriggerHearts={(x, y) => triggerBurstHearts(x, y, 5)}
                    />
                  </motion.div>
                )}

                {activeTab === 'day10' && (
                  <motion.div
                    key="tab-day10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Day10Celebration
                      onBackToDashboard={() => setActiveTab('home')}
                      onTriggerHearts={(x, y) => triggerBurstHearts(x, y, 7)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Romantic Footer */}
              <Footer
                onResetLanding={() => setHasEntered(false)}
              />

              {/* Floating Bottom Navigation */}
              <Navigation
                activeTab={activeTab === 'day10' ? 'home' : activeTab}
                onSelectTab={(tab) => setActiveTab(tab)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Post-Monologue Result Modal: "HOW DID MY FAVORITE ACTRESS DO? 🎭" */}
      <ActressQuizModal
        isOpen={isActressQuizOpen}
        onClose={() => setIsActressQuizOpen(false)}
        onTriggerHearts={(x, y) => triggerBurstHearts(x, y, 5)}
      />
    </>
  );
}
