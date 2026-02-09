import React, { useState } from 'react';
import { config } from '../data';

const SecretScreen = ({ onBack }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <section id="secret-screen" className="screen active" role="main">
            <h2 className="section-title">Un mic secret... 🤫</h2>
            <p className="response-text" style={{ marginBottom: '1rem' }}>L-ai găsit! Iată ceva extra special...</p>

            <h3 style={{ margin: '2rem 0 1rem', color: 'var(--accent-pink)', fontWeight: 700, fontSize: '1.5rem' }}>
                10 Motive Pentru Care Te Iubesc 💖
            </h3>
            <ol className="reasons-list">
                {config.reasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                ))}
            </ol>

            <p style={{ margin: '2rem 0 1rem', color: 'var(--text-soft)' }}>Și un mic cadou...</p>

            <div
                className={`flip-card ${isFlipped ? 'flipped' : ''}`}
                onClick={() => setIsFlipped(!isFlipped)}
                role="button"
                tabIndex="0"
                aria-label="Tap to reveal kiss coupon"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsFlipped(!isFlipped);
                    }
                }}
            >
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <span className="coupon-title">✨ ATINGE PENTRU A DEZVĂLUI ✨</span>
                        <span className="coupon-main">Cupon Special</span>
                    </div>
                    <div className="flip-card-back">
                        <span className="coupon-title">Valabil oricând 💋</span>
                        <span className="coupon-main">Un Pupic Lung și Dulce</span>
                    </div>
                </div>
            </div>

            <button className="btn btn-secondary continue-btn" onClick={onBack} aria-label="Go back to memories">
                Înapoi la amintiri
            </button>
        </section>
    );
};

export default SecretScreen;
