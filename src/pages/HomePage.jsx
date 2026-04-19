import React from 'react';
import HeroBanner from '../components/HeroBanner';
import VideoRow from '../components/VideoRow';
import { videos, categories, getRecentVideos, getVideosByCategory } from '../data/videos';

const HomePage = ({ onPlay, onMoreInfo, onToggleFav, isFavorite, getProgress, continueWatching }) => {
  const recentVideos = getRecentVideos();

  return (
    <div className="page-transition">
      <HeroBanner onPlay={onPlay} onMoreInfo={onMoreInfo} />

      <div className="video-rows">
        {/* Continue Watching */}
        {continueWatching && continueWatching.length > 0 && (
          <VideoRow
            title="Continue Watching ▶️"
            videos={continueWatching}
            onPlay={onPlay}
            onMoreInfo={onMoreInfo}
            onToggleFav={onToggleFav}
            isFavorite={isFavorite}
            watchProgress={getProgress}
          />
        )}

        {/* Recently Added */}
        <VideoRow
          title="Recently Added 🆕"
          videos={recentVideos}
          onPlay={onPlay}
          onMoreInfo={onMoreInfo}
          onToggleFav={onToggleFav}
          isFavorite={isFavorite}
          watchProgress={getProgress}
        />

        {/* Category rows */}
        {categories.map(cat => {
          const catVideos = getVideosByCategory(cat.filter);
          if (catVideos.length === 0) return null;
          return (
            <VideoRow
              key={cat.id}
              title={cat.name}
              videos={catVideos}
              onPlay={onPlay}
              onMoreInfo={onMoreInfo}
              onToggleFav={onToggleFav}
              isFavorite={isFavorite}
              watchProgress={getProgress}
            />
          );
        })}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__hearts">💕</div>
        <div className="footer__text">Made with love for us</div>
        <div className="footer__text">Sufletflix © {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
};

export default HomePage;
