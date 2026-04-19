import React from 'react';
import {
  PlayFilled,
  HeartFilled,
  HeartRegular,
  ChevronDownRegular,
} from '@fluentui/react-icons';

const VideoCard = ({ video, onPlay, onMoreInfo, onToggleFav, isFavorite, progress }) => {
  const progressPercent = progress?.progress ? Math.min(progress.progress * 100, 100) : 0;

  return (
    <div className="video-card" onClick={() => onMoreInfo(video)}>
      <div className="video-card__thumbnail-wrapper">
        <img
          className="video-card__thumbnail"
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
          }}
        />
        <span className="video-card__duration">{video.duration}</span>
        {progressPercent > 0 && (
          <div
            className="video-card__progress-bar"
            style={{ width: `${progressPercent}%` }}
          />
        )}
      </div>

      {/* Info overlay (visible on hover) */}
      <div className="video-card__info">
        <div className="video-card__info-inner">
          <div className="video-card__info-buttons">
            <button
              className="video-card__info-btn video-card__info-btn--play"
              onClick={(e) => { e.stopPropagation(); onPlay(video); }}
              title="Play"
            >
              <PlayFilled fontSize={14} />
            </button>
            <button
              className={`video-card__info-btn ${isFavorite ? 'video-card__info-btn--liked' : ''}`}
              onClick={(e) => { e.stopPropagation(); onToggleFav(video.id); }}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? <HeartFilled fontSize={14} /> : <HeartRegular fontSize={14} />}
            </button>
            <button
              className="video-card__info-btn"
              onClick={(e) => { e.stopPropagation(); onMoreInfo(video); }}
              title="More info"
              style={{ marginLeft: 'auto' }}
            >
              <ChevronDownRegular fontSize={14} />
            </button>
          </div>

          <div className="video-card__info-title">{video.title}</div>
          <div className="video-card__info-meta">
            <span className="video-card__info-date">{video.date}</span>
            <span>•</span>
            <span>{video.duration}</span>
          </div>
          {video.tags && (
            <div className="video-card__info-tags">
              {video.tags.slice(0, 3).map(tag => (
                <span key={tag} className="video-card__info-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
