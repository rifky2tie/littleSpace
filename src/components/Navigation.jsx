import React from 'react';
import { Home, Mail, Theater, Camera, HeartHandshake } from 'lucide-react';
import { playPop } from '../utils/soundEffects';

export default function Navigation({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'home', label: 'home', icon: Home, emoji: '🏠' },
    { id: 'letters', label: 'letters', icon: Mail, emoji: '💌' },
    { id: 'monolog', label: 'monolog', icon: Theater, emoji: '🎭' },
    { id: 'gallery', label: 'gallery', icon: Camera, emoji: '📸' },
    { id: 'hugs', label: 'hugs', icon: HeartHandshake, emoji: '🫂' }
  ];

  const handleTabClick = (tabId) => {
    playPop();
    onSelectTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const IconComponent = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab.id)}
            className={`nav-item ${isActive ? 'active' : ''}`}
            aria-label={tab.label}
          >
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <IconComponent size={19} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
