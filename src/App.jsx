import React, { useState, useRef, useEffect } from 'react';
import MusicPlayer from './components/MusicPlayer';
import CoverScreen from './components/CoverScreen';
import MemoryScreen from './components/MemoryScreen';
import MessageScreen from './components/MessageScreen';
import ValentineScreen from './components/ValentineScreen';
import YesScreen from './components/YesScreen';
import SecretScreen from './components/SecretScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('cover');
  const [musicStarted, setMusicStarted] = useState(false);
  const audioRef = useRef(null);

  // Scroll to top whenever screen changes
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };
    
    scrollToTop();
    // Multiple attempts for mobile browsers
    requestAnimationFrame(scrollToTop);
    setTimeout(scrollToTop, 0);
    setTimeout(scrollToTop, 50);
    setTimeout(scrollToTop, 100);
    setTimeout(scrollToTop, 200);
  }, [currentScreen]);

  const handleStart = () => {
    // Play audio directly from click handler (required for mobile)
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Play failed:', e));
    }
    setMusicStarted(true);
    setCurrentScreen('memory');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'cover':
        return <CoverScreen onNext={handleStart} />;
      case 'memory':
        return <MemoryScreen onNext={() => setCurrentScreen('message')} onSecret={() => setCurrentScreen('secret')} />;
      case 'message':
        return <MessageScreen onNext={() => setCurrentScreen('valentine')} />;
      case 'valentine':
        return <ValentineScreen onYes={() => setCurrentScreen('yes')} />;
      case 'yes':
        return <YesScreen />;
      case 'secret':
        return <SecretScreen onBack={() => setCurrentScreen('memory')} />;
      default:
        return <CoverScreen onNext={() => setCurrentScreen('memory')} />;
    }
  };

  return (
    <>
      <div className="floating-hearts">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className="heart-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${15 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * -20}s`
            }}
          >
            {['💕', '💗', '💖', '✨', '💫'][Math.floor(Math.random() * 5)]}
          </span>
        ))}
      </div>

      <MusicPlayer shouldPlay={musicStarted} audioRef={audioRef} />

      {renderScreen()}
    </>
  );
}

export default App;
