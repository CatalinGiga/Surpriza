import React, { useState } from 'react';
import { videos, categories } from '../data/videos';
import { HeartFilled, HeartRegular } from '@fluentui/react-icons';

const CategoryPage = ({ onMoreInfo, onToggleFav, isFavorite }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredVideos = activeCategory === 'all'
    ? videos
    : videos.filter(v => v.category === categories.find(c => c.id === activeCategory)?.filter);

  return (
    <div className="category-page page-transition">
      <h1 className="category-page__title">Categories 🎬</h1>
      <p className="category-page__subtitle">Browse all our memories by category</p>

      <div className="category-page__filters">
        <button
          className={`category-page__filter-btn ${activeCategory === 'all' ? 'category-page__filter-btn--active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-page__filter-btn ${activeCategory === cat.id ? 'category-page__filter-btn--active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="category-page__grid">
        {filteredVideos.map(video => (
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
                className={`browse-card__fav-btn ${isFavorite?.(video.id) ? 'browse-card__fav-btn--liked' : ''}`}
                onClick={(e) => { e.stopPropagation(); onToggleFav(video.id); }}
              >
                {isFavorite?.(video.id) ? '❤️' : '🤍'}
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
    </div>
  );
};

export default CategoryPage;
