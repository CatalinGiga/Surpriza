import React, { useState } from 'react';
import { config } from '../data';
import PhotoModal from './PhotoModal';

const MemoryScreen = ({ onNext, onSecret }) => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    return (
        <section id="memory-screen" className="screen active" role="main" style={{ justifyContent: 'flex-start', paddingTop: '3rem' }}>
            <h2 className="section-title">Câteva momente dragi ✨</h2>
            <p className="memory-hint">Apasă pe o poză ca să citești povestea ei 💕</p>

            <div className="memory-grid" role="list">
                {config.photos.map((photo, index) => (
                    <div
                        key={index}
                        className="polaroid"
                        role="listitem"
                        tabIndex="0"
                        aria-label={`View memory: ${photo.label}`}
                        onClick={() => setSelectedPhoto(photo)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setSelectedPhoto(photo);
                            }
                        }}
                    >
                        <img
                            src={photo.src}
                            alt={photo.caption}
                            className="polaroid-img"
                            onError={(e) => {
                                e.target.style.background = 'linear-gradient(135deg, #f0e6ea 0%, #dcc4ca 100%)';
                                e.target.alt = 'Photo placeholder';
                            }}
                        />
                        <span className="polaroid-label">{photo.label}</span>
                    </div>
                ))}
            </div>

            <div className="buttons-row">
                <button className="btn continue-btn" onClick={onNext} aria-label="Continue to message">
                    Continuă
                </button>
                <button
                    className="secret-btn"
                    onClick={onSecret}
                    aria-label="Secret surprise"
                    title="Pssst... apasă-mă!"
                >
                    💗
                </button>
            </div>

            <PhotoModal
                photo={selectedPhoto}
                onClose={() => setSelectedPhoto(null)}
            />
        </section>
    );
};

export default MemoryScreen;
