import React from 'react';

const ValentineScreen = ({ onYes }) => {
    return (
        <section id="valentine-screen" className="screen active" role="main">
            <span className="cover-decoration top-left">✨</span>
            <span className="cover-decoration top-right">💫</span>
            <span className="cover-decoration bottom-left">💕</span>
            <span className="cover-decoration bottom-right">✨</span>
            <h2 className="cover-title valentine-question">Ți-a pus un zâmbet pe buze mini-surpriza mea? 💕</h2>
            <div className="valentine-buttons">
                <button className="btn" onClick={onYes} aria-label="Yes">Da ❤️</button>
            </div>
        </section>
    );
};

export default ValentineScreen;
