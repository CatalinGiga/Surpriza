import React from 'react';
import { config } from '../data';

const MessageScreen = ({ onNext }) => {
    return (
        <section id="message-screen" className="screen active" role="main" style={{ justifyContent: 'flex-start', paddingTop: '3rem' }}>
            <div className="message-container">
                <h2 className="section-title">O notă mică pentru inima ta 💌</h2>
                <div
                    className="message-text"
                    id="main-message"
                    dangerouslySetInnerHTML={{ __html: config.mainMessage }}
                />
                <button className="btn" onClick={onNext} aria-label="Continue to Valentine question">
                    Încă ceva... 💕
                </button>
            </div>
        </section>
    );
};

export default MessageScreen;
