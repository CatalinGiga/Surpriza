import React from 'react';

const CoverScreen = ({ onNext, onBack }) => {
    return (
        <section id="cover-screen" className="screen active" role="main">
            <span className="cover-decoration top-left">✨</span>
            <span className="cover-decoration top-right">💫</span>
            <span className="cover-decoration bottom-left">💕</span>
            <span className="cover-decoration bottom-right">✨</span>
            <h1 className="cover-title">Bună, suflețelul meu mic și drag ❤️</h1>
            <p className="cover-subtitle">Maimuțica ta a făcut ceva mic pentru tine.</p>
            <button className="btn" onClick={onNext} aria-label="Open your gift">Deschide-l</button>

            {/* Subtle back button */}
            {onBack && (
                <button
                    className="back-to-tree-subtle"
                    onClick={onBack}
                    aria-label="Back to Memory Tree"
                >
                    ← Grădină
                </button>
            )}
        </section>
    );
};

export default CoverScreen;
