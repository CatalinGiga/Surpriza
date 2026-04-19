import React, { useEffect } from 'react';
import { videos } from '../data/videos';

const VideoModal = ({ video, onClose, onPlay, onToggleFav, isFavorite, onSelectVideo }) => {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!video) return null;

  // Related videos: same category, excluding current
  const related = videos
    .filter(v => v.id !== video.id && (v.category === video.category || v.tags.some(t => video.tags.includes(t))))
    .slice(0, 6);

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal" onClick={e => e.stopPropagation()}>
        {/* Preview header */}
        <div className="video-modal__preview">
          <img
            className="video-modal__preview-img"
            src={video.thumbnail}
            alt={video.title}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.background = 'linear-gradient(135deg, #1a1a2e, #0f3460)';
            }}
          />
          <div className="video-modal__preview-gradient" />
          <div className="video-modal__preview-content">
            <h2 className="video-modal__preview-title">{video.title}</h2>
            <div className="video-modal__preview-buttons">
              <button className="btn-netflix btn-netflix--play" onClick={() => onPlay(video)}>
                <span className="btn-icon">▶</span> Play
              </button>
              <button
                className={`btn-netflix ${isFavorite ? 'btn-netflix--red' : 'btn-netflix--info'}`}
                onClick={() => onToggleFav(video.id)}
              >
                {isFavorite ? '❤️ Favorited' : '🤍 Favorite'}
              </button>
            </div>
          </div>
          <button className="video-modal__close" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="video-modal__body">
          <div className="video-modal__meta">
            <span className="video-modal__meta-item video-modal__meta-date">{video.date}</span>
            <span className="video-modal__meta-item video-modal__meta-duration">{video.duration}</span>
            <span className="video-modal__meta-item" style={{ color: 'var(--sf-text-muted)' }}>{video.category}</span>
          </div>
          <p className="video-modal__description">{video.description}</p>
          {video.tags && (
            <div className="video-modal__tags">
              {video.tags.map(tag => (
                <span key={tag} className="video-modal__tag">{tag}</span>
              ))}
            </div>
          )}

          {/* Related */}
          {related.length > 0 && (
            <>
              <h3 className="video-modal__related-title">More Like This</h3>
              <div className="video-modal__related-grid">
                {related.map(rv => (
                  <div
                    key={rv.id}
                    className="video-modal__related-card"
                    onClick={() => onSelectVideo(rv)}
                  >
                    <img
                      className="video-modal__related-thumb"
                      src={rv.thumbnail}
                      alt={rv.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.querySelector('.video-modal__related-info').style.borderTop = '1px solid var(--sf-border)';
                      }}
                    />
                    <div className="video-modal__related-info">
                      <div className="video-modal__related-name">{rv.title}</div>
                      <div className="video-modal__related-meta">{rv.date} • {rv.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
