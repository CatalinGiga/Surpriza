import React from 'react';
import { timelineMilestones } from '../data/videos';

const OurStoryPage = () => {
  return (
    <div className="story-page page-transition">
      <div className="story-page__header">
        <h1 className="story-page__title">Our Story 💕</h1>
        <p className="story-page__subtitle">Every love story is beautiful, but ours is my favorite</p>
      </div>

      {timelineMilestones.length > 0 ? (
        <div className="timeline">
          {timelineMilestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className="timeline-item"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="timeline-item__dot" />
              <div className="timeline-item__content">
                <div className="timeline-item__date">{milestone.date}</div>
                <h3 className="timeline-item__title">{milestone.title}</h3>
                <p className="timeline-item__text">{milestone.description}</p>
                {milestone.image && (
                  <img
                    className="timeline-item__image"
                    src={milestone.image}
                    alt={milestone.title}
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="timeline-empty">
          <div className="timeline-empty__icon">📖</div>
          <div className="timeline-empty__text">Our story is just beginning...</div>
          <div className="timeline-empty__sub">
            Add milestones to <code>src/data/videos.js</code> in the <code>timelineMilestones</code> array
            <br />to build your beautiful timeline together 💫
          </div>
        </div>
      )}

      <footer className="footer" style={{ marginTop: '4rem' }}>
        <div className="footer__hearts">💕</div>
        <div className="footer__text">Our love story continues...</div>
      </footer>
    </div>
  );
};

export default OurStoryPage;
