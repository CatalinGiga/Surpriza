import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { config } from '../data';

const YesScreen = () => {
    useEffect(() => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="yes-screen" className="screen active" role="main">
            <h2 className="response-title">Yay! Așa da! ❤️</h2>
            <p className="response-text">{config.yesMessage}</p>
            <div className="contact-section">
                <p>Hai să vorbim! 💕</p>
                <div className="contact-buttons">
                    <a href="tel:+40761389550" className="btn btn-small">📞 Sună-mă</a>
                    <a href="https://www.instagram.com/ionutcatalingiga/" target="_blank" rel="noopener noreferrer"
                        className="btn btn-small btn-secondary">💬 Scrie-mi pe Instagram</a>
                </div>
            </div>
        </section>
    );
};

export default YesScreen;
