import React, { useState, useEffect } from 'react';
import { getFeaturedVideos } from '../data/videos';
import { PlayFilled, InfoRegular } from '@fluentui/react-icons';

const HeroBanner = ({ onPlay, onMoreInfo }) => {
  const featured = getFeaturedVideos();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featured.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % featured.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [featured.length]);

  const video = featured[currentIndex] || featured[0];
  if (!video) return null;

  return (
    <section className="hero" id="hero-banner">
      <div
        className="hero__backdrop"
        style={{ backgroundImage: `url(${video.thumbnail})` }}
      />
      <div className="hero__gradient-left" />
      <div className="hero__gradient-bottom" />

      <div className="hero__content" key={video.id}>
        <div className="hero__tag">
          <span className="hero__tag-dot" />
          SUFLETFLIX ORIGINAL
        </div>
        <h1 className="hero__title">{video.title}</h1>
        <p className="hero__description">{video.description}</p>
        <div className="hero__buttons">
          <button
            className="btn-netflix btn-netflix--play"
            onClick={() => onPlay(video)}
          >
            <PlayFilled fontSize={20} /> Play
          </button>
          <button
            className="btn-netflix btn-netflix--info"
            onClick={() => onMoreInfo(video)}
          >
            <InfoRegular fontSize={20} /> More Info
          </button>
        </div>
      </div>

      {/* Slide indicators */}
      {featured.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: '12%',
          right: 'var(--content-padding)',
          display: 'flex',
          gap: '6px',
          zIndex: 3
        }}>
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              style={{
                width: i === currentIndex ? '24px' : '8px',
                height: '3px',
                background: i === currentIndex ? 'var(--sf-red)' : 'rgba(255,255,255,.4)',
                border: 'none',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              aria-label={`Go to featured video ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroBanner;
