import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PasswordScreen from './components/PasswordScreen';
import ProfilePicker from './components/ProfilePicker';
import Navbar from './components/Navbar';
import SearchOverlay from './components/SearchOverlay';
import VideoModal from './components/VideoModal';
import VideoPlayer from './components/VideoPlayer';
import HomePage from './pages/HomePage';
import OurStoryPage from './pages/OurStoryPage';
import FavoritesPage from './pages/FavoritesPage';
import CategoryPage from './pages/CategoryPage';
import { videos } from './data/videos';
import { useFavorites } from './hooks/useFavorites';
import { useWatchProgress } from './hooks/useWatchProgress';

function App() {
  const [screen, setScreen] = useState('password'); // password | loading | profile | main
  const [searchOpen, setSearchOpen] = useState(false);
  const [modalVideo, setModalVideo] = useState(null);
  const [playerVideo, setPlayerVideo] = useState(null);
  const navigate = useNavigate();

  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { updateProgress, getProgress, getContinueWatching } = useWatchProgress();

  const continueWatching = getContinueWatching(videos);

  const handlePlay = useCallback((video) => {
    setModalVideo(null);
    setPlayerVideo(video);
  }, []);

  const handleMoreInfo = useCallback((video) => {
    setPlayerVideo(null);
    setModalVideo(video);
  }, []);

  const handleCloseModal = useCallback(() => setModalVideo(null), []);
  const handleClosePlayer = useCallback(() => setPlayerVideo(null), []);

  const handleSelectVideo = useCallback((video) => {
    setModalVideo(video);
  }, []);

  // Auto-advance from loading to profile
  useEffect(() => {
    if (screen === 'loading') {
      // Play the intro sound
      const audio = new Audio(`${import.meta.env.BASE_URL}loading_sound.mp3`);
      audio.volume = 0.8;
      audio.play().catch(e => console.log('Intro sound skipped:', e));

      const timer = setTimeout(() => {
        audio.pause();
        setScreen('profile');
      }, 4000);
      return () => {
        clearTimeout(timer);
        audio.pause();
      };
    }
  }, [screen]);

  // Password screen
  if (screen === 'password') {
    return <PasswordScreen onSuccess={() => setScreen('loading')} />;
  }

  // Netflix-style loading intro
  if (screen === 'loading') {
    return (
      <div className="netflix-intro">

        {/* Phase 1: 3D Ribbon "S" — zooms out like Netflix's N */}
        <div className="nf-ribbon">
          <svg className="nf-ribbon__svg" viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* 3D cylindrical gradient — bright center, dark edges = ribbon depth */}
              <linearGradient id="ribbon3d" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2d0000" />
                <stop offset="12%" stopColor="#6d0000" />
                <stop offset="30%" stopColor="#b91c1c" />
                <stop offset="45%" stopColor="#E50914" />
                <stop offset="50%" stopColor="#ff2020" />
                <stop offset="55%" stopColor="#E50914" />
                <stop offset="70%" stopColor="#b91c1c" />
                <stop offset="88%" stopColor="#6d0000" />
                <stop offset="100%" stopColor="#2d0000" />
              </linearGradient>

              {/* Vertical depth gradient overlay */}
              <linearGradient id="depthV" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
              </linearGradient>

              {/* Animated shine gradient */}
              <linearGradient id="shineGrad" gradientUnits="objectBoundingBox" x1="-1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="40%" stopColor="rgba(255,255,255,0)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.35)" />
                <stop offset="60%" stopColor="rgba(255,255,255,0)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  from="-1.5 0"
                  to="2.5 0"
                  begin="1.5s"
                  dur="1s"
                  fill="freeze"
                />
              </linearGradient>

              {/* Red glow filter */}
              <filter id="redGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                <feFlood floodColor="#E50914" floodOpacity="0.5" />
                <feComposite in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g filter="url(#redGlow)">
              {/* Shadow layer — offset for depth */}
              <text x="103" y="230" textAnchor="middle" fill="#0a0000" opacity="0.5"
                fontFamily="'Bebas Neue', Impact, sans-serif" fontSize="260" fontWeight="400">
                S
              </text>

              {/* Main 3D ribbon body */}
              <text x="100" y="227" textAnchor="middle" fill="url(#ribbon3d)"
                fontFamily="'Bebas Neue', Impact, sans-serif" fontSize="260" fontWeight="400">
                S
              </text>

              {/* Vertical depth overlay */}
              <text x="100" y="227" textAnchor="middle" fill="url(#depthV)"
                fontFamily="'Bebas Neue', Impact, sans-serif" fontSize="260" fontWeight="400">
                S
              </text>

              {/* Animated shine sweep */}
              <text x="100" y="227" textAnchor="middle" fill="url(#shineGrad)"
                fontFamily="'Bebas Neue', Impact, sans-serif" fontSize="260" fontWeight="400">
                S
              </text>
            </g>
          </svg>
        </div>

        {/* Phase 2: Full "SUFLETFLIX" logo image */}
        <img
          className="nf-text"
          src={`${import.meta.env.BASE_URL}Sufletflix.png`}
          alt="Sufletflix"
        />

      </div>
    );
  }

  // Profile picker
  if (screen === 'profile') {
    return <ProfilePicker onSelect={() => setScreen('main')} />;
  }

  // Main app
  return (
    <>
      <Navbar onSearchOpen={() => setSearchOpen(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onPlay={handlePlay}
              onMoreInfo={handleMoreInfo}
              onToggleFav={toggleFavorite}
              isFavorite={isFavorite}
              getProgress={getProgress}
              continueWatching={continueWatching}
            />
          }
        />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favorites={favorites}
              onToggleFav={toggleFavorite}
              onMoreInfo={handleMoreInfo}
            />
          }
        />
        <Route
          path="/categories"
          element={
            <CategoryPage
              onMoreInfo={handleMoreInfo}
              onToggleFav={toggleFavorite}
              isFavorite={isFavorite}
            />
          }
        />
      </Routes>

      {/* Search overlay */}
      {searchOpen && (
        <SearchOverlay
          onClose={() => setSearchOpen(false)}
          onPlay={handlePlay}
          onMoreInfo={(video) => { setSearchOpen(false); handleMoreInfo(video); }}
        />
      )}

      {/* Video modal */}
      {modalVideo && (
        <VideoModal
          video={modalVideo}
          onClose={handleCloseModal}
          onPlay={handlePlay}
          onToggleFav={toggleFavorite}
          isFavorite={isFavorite(modalVideo.id)}
          onSelectVideo={handleSelectVideo}
        />
      )}

      {/* Video player */}
      {playerVideo && (
        <VideoPlayer
          video={playerVideo}
          onClose={handleClosePlayer}
          onUpdateProgress={updateProgress}
          initialTime={getProgress(playerVideo.id)?.currentTime || 0}
        />
      )}
    </>
  );
}

export default App;
