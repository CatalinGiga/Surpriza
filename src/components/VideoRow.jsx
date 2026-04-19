import React, { useRef } from 'react';
import VideoCard from './VideoCard';

const VideoRow = ({ title, videos, onPlay, onMoreInfo, onToggleFav, isFavorite, watchProgress }) => {
  const sliderRef = useRef(null);

  if (!videos || videos.length === 0) return null;

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const amount = sliderRef.current.offsetWidth * 0.75;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="video-row">
      <h2 className="video-row__title">{title}</h2>
      <div className="video-row__slider-wrapper">
        <button
          className="video-row__arrow video-row__arrow--left"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          ‹
        </button>

        <div className="video-row__slider" ref={sliderRef}>
          {videos.map(video => (
            <VideoCard
              key={video.id}
              video={video}
              onPlay={onPlay}
              onMoreInfo={onMoreInfo}
              onToggleFav={onToggleFav}
              isFavorite={isFavorite?.(video.id)}
              progress={watchProgress?.(video.id)}
            />
          ))}
        </div>

        <button
          className="video-row__arrow video-row__arrow--right"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default VideoRow;
