import React, { useState } from 'react';

const ChapterScreen = ({ chapter, onBack }) => {
    const [isOpened, setIsOpened] = useState(false);

    if (!chapter || !chapter.content) {
        return (
            <section className="screen active" role="main">
                <h2 className="section-title">Capitolul {chapter?.chapterNumber} 💫</h2>
                <p className="response-text" style={{ marginTop: '1rem' }}>
                    Acest capitol este în pregătire... Revino curând! 🌸
                </p>
                <button className="btn btn-secondary back-to-tree-btn" onClick={onBack} style={{ marginTop: '2rem' }}>
                    ← Înapoi la Grădină
                </button>
            </section>
        );
    }

    const { content } = chapter;

    // Sealed envelope state
    if (chapter.type === 'letter' && !isOpened) {
        return (
            <section className="screen active letter-sealed-screen" role="main">
                <span className="cover-decoration top-left">✨</span>
                <span className="cover-decoration bottom-right">💫</span>
                
                <h2 className="letter-waiting-title">Ai primit o scrisoare! 💌</h2>
                <div className="sealed-envelope-container" onClick={() => setIsOpened(true)} tabIndex="0" role="button" aria-label="Deschide scrisoarea">
                    <div className="envelope-body">
                        <div className="envelope-flap-outer"></div>
                        <div className="envelope-flap-inner"></div>
                        <div className="wax-seal">
                            <span className="seal-sparkle">💕</span>
                        </div>
                    </div>
                    <p className="envelope-hint">Apasă pe sigiliu pentru a deschide</p>
                </div>

                <button className="back-to-tree-subtle" onClick={onBack}>
                    ← Înapoi la Grădină
                </button>
            </section>
        );
    }

    // Opened content state
    return (
        <section className={`screen active chapter-screen ${isOpened ? 'letter-revealed' : ''}`} role="main" style={{ justifyContent: 'flex-start', paddingTop: '3rem' }}>
            {/* Chapter header */}
            <div className="chapter-header">
                <span className="chapter-label-badge">Capitolul {chapter.chapterNumber}</span>
                <h2 className="section-title">{content.title || chapter.title} {chapter.emoji}</h2>
            </div>

            {/* Message */}
            {content.message && (
                <div className="message-container" style={{ marginTop: '1.5rem' }}>
                    <div
                        className="message-text letter-text"
                        dangerouslySetInnerHTML={{ __html: content.message }}
                    />
                </div>
            )}

            {/* Photos grid */}
            {content.photos && content.photos.length > 0 && (
                <div className="memory-grid" style={{ marginTop: '2rem', paddingBottom: '1rem' }}>
                    {content.photos.map((photo, index) => (
                        <div key={index} className="polaroid">
                            <img
                                src={photo.src}
                                alt={photo.caption || ''}
                                className="polaroid-img"
                                onError={(e) => {
                                    e.target.style.background = 'linear-gradient(135deg, #f0e6ea 0%, #dcc4ca 100%)';
                                }}
                            />
                            {photo.label && <span className="polaroid-label">{photo.label}</span>}
                            {photo.caption && <span className="polaroid-label" style={{ fontSize: '0.8rem', opacity: 0.8, color: '#666' }}>{photo.caption}</span>}
                        </div>
                    ))}
                </div>
            )}

            {/* Back button */}
            <button className="btn btn-secondary back-to-tree-btn" onClick={onBack} style={{ marginTop: '1rem', marginBottom: '3rem' }}>
                ← Înapoi la Grădină
            </button>
        </section>
    );
};

export default ChapterScreen;
