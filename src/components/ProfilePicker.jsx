import React from 'react';
import { profiles } from '../data/videos';

const ProfilePicker = ({ onSelect }) => {
  return (
    <div className="profile-picker">
      <h1 className="profile-picker__title">Who's Watching?</h1>
      <div className="profile-picker__grid">
        {profiles.map(profile => (
          <div
            key={profile.id}
            className="profile-picker__item"
            onClick={() => onSelect(profile)}
          >
            <div className="profile-picker__avatar">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="profile-picker__avatar-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.textContent = profile.emoji;
                }}
              />
            </div>
            <span className="profile-picker__name">{profile.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePicker;
