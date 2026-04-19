import React, { useState, useEffect, useRef } from 'react';
import { searchVideos } from '../data/videos';

const SearchOverlay = ({ onClose, onPlay, onMoreInfo }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResults(searchVideos(query));
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="search-overlay">
      <div className="search-overlay__header">
        <input
          ref={inputRef}
          className="search-overlay__input"
          type="text"
          placeholder="Caută titluri, taguri, date..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <button className="search-overlay__close" onClick={onClose}>✕</button>
      </div>

      {query.trim() ? (
        results.length > 0 ? (
          <div className="search-overlay__results">
            {results.map(video => (
              <div
                key={video.id}
                className="search-overlay__search-card"
                onClick={() => onMoreInfo(video)}
              >
                <img
                  className="search-overlay__search-card-thumb"
                  src={video.thumbnail}
                  alt={video.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.querySelector('.search-overlay__search-card-info').style.borderTop = '1px solid var(--sf-border)';
                  }}
                />
                <div className="search-overlay__search-card-info">
                  <div className="search-overlay__search-card-title">{video.title}</div>
                  <div className="search-overlay__search-card-meta">{video.date} • {video.duration} • {video.category}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="search-overlay__empty">
            <div className="search-overlay__empty-icon">🔍</div>
            <div className="search-overlay__empty-text">
              No results for "{query}"
            </div>
          </div>
        )
      ) : (
        <div className="search-overlay__empty">
          <div className="search-overlay__empty-icon">🎬</div>
          <div className="search-overlay__empty-text">
            Start typing to search your memories...
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchOverlay;
