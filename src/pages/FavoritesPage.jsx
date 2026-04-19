import React from 'react';
import { videos } from '../data/videos';

const FavoritesPage = ({ favorites, onToggleFav, onMoreInfo }) => {
  const favVideos = videos.filter(v => favorites.includes(v.id));

  return (
    <div className="favorites-page page-transition">
      <h1 className="favorites-page__title">Our Favorites ❤️</h1>

      {favVideos.length > 0 ? (
        <div className="favorites-page__grid">
          {favVideos.map(video => (
            <div
              key={video.id}
              className="browse-card"
              onClick={() => onMoreInfo(video)}
            >
              <div style={{ position: 'relative' }}>
                <img
                  className="browse-card__thumb"
                  src={video.thumbnail}
                  alt={video.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <button
                  className="browse-card__fav-btn browse-card__fav-btn--liked"
                  onClick={(e) => { e.stopPropagation(); onToggleFav(video.id); }}
                  title="Remove from favorites"
                >
                  ❤️
                </button>
              </div>
              <div className="browse-card__body">
                <div className="browse-card__title">{video.title}</div>
                <div className="browse-card__meta">
                  <span>{video.date}</span>
                  <span>•</span>
                  <span>{video.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="favorites-page__empty">
          <div className="favorites-page__empty-heart">💔</div>
          <div className="favorites-page__empty-text">No favorites yet</div>
          <div className="favorites-page__empty-sub">
            Click the ❤️ on any video to add it here
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
