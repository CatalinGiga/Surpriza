import React, { useState, useRef, useEffect } from 'react';
import PasswordScreen from './components/PasswordScreen';
import MusicPlayer from './components/MusicPlayer';
import MemoryTreeScreen from './components/MemoryTreeScreen';
import CoverScreen from './components/CoverScreen';
import MemoryScreen from './components/MemoryScreen';
import MessageScreen from './components/MessageScreen';
import ValentineScreen from './components/ValentineScreen';
import YesScreen from './components/YesScreen';
import SecretScreen from './components/SecretScreen';
import ChapterScreen from './components/ChapterScreen';
import { ambientMusic } from './data';

function App() {
  const [currentScreen, setCurrentScreen] = useState('password');
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [musicSrc, setMusicSrc] = useState(null);
  const [musicStarted, setMusicStarted] = useState(false);
  const audioRef = useRef(null);
  const ambientRef = useRef(null);

  // Scroll to top whenever screen changes
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };
    
    scrollToTop();
    requestAnimationFrame(scrollToTop);
    setTimeout(scrollToTop, 0);
    setTimeout(scrollToTop, 50);
    setTimeout(scrollToTop, 100);
    setTimeout(scrollToTop, 200);
  }, [currentScreen]);

  // Ambient music for the tree lobby
  useEffect(() => {
    if (currentScreen === 'tree' && ambientRef.current) {
      ambientRef.current.volume = 0.3;
      ambientRef.current.play().catch(e => console.log('Ambient play failed:', e));
    } else if (ambientRef.current) {
      ambientRef.current.pause();
    }
  }, [currentScreen]);

  // When entering a chapter, set up its music and stop ambient
  const handleSelectChapter = (chapter) => {
    setSelectedChapter(chapter);

    if (chapter.type === 'original') {
      // For the original flow, go to its cover screen
      setMusicSrc(chapter.music);
      setCurrentScreen('cover');
    } else {
      // For custom chapters, go to the chapter screen
      setMusicSrc(chapter.music);
      setCurrentScreen('chapter');
    }
  };

  const handleStartOriginalFlow = () => {
    // Play chapter music directly from click handler (for mobile)
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Play failed:', e));
    }
    setMusicStarted(true);
    setCurrentScreen('memory');
  };

  const handleBackToTree = () => {
    // Stop chapter music, go back to tree
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setMusicStarted(false);
    setMusicSrc(null);
    setSelectedChapter(null);
    setCurrentScreen('tree');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'password':
        return <PasswordScreen onSuccess={() => setCurrentScreen('tree')} />;
      case 'tree':
        return <MemoryTreeScreen onSelectChapter={handleSelectChapter} />;
      case 'cover':
        return <CoverScreen onNext={handleStartOriginalFlow} onBack={handleBackToTree} />;
      case 'memory':
        return <MemoryScreen onNext={() => setCurrentScreen('message')} onSecret={() => setCurrentScreen('secret')} />;
      case 'message':
        return <MessageScreen onNext={() => setCurrentScreen('valentine')} />;
      case 'valentine':
        return <ValentineScreen onYes={() => setCurrentScreen('yes')} />;
      case 'yes':
        return <YesScreen onBackToTree={handleBackToTree} />;
      case 'secret':
        return <SecretScreen onBack={() => setCurrentScreen('memory')} />;
      case 'chapter':
        return <ChapterScreen chapter={selectedChapter} onBack={handleBackToTree} />;
      default:
        return <MemoryTreeScreen onSelectChapter={handleSelectChapter} />;
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

      {/* Ambient lobby music */}
      <audio
        ref={ambientRef}
        src={ambientMusic}
        loop
        preload="auto"
      />

      {/* Chapter-specific music */}
      <MusicPlayer shouldPlay={musicStarted} audioRef={audioRef} musicSrc={musicSrc} />

      {renderScreen()}
    </>
  );
}

export default App;
