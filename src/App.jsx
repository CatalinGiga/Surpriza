import React, { useState } from 'react';
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

  const handleStart = () => {
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

      <MusicPlayer shouldPlay={musicStarted} />

      {renderScreen()}
    </>
  );
}

export default App;
