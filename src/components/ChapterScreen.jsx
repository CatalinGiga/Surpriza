import React from 'react';

/**
 * ChapterScreen — flexible wrapper for non-original chapter content.
 * For Chapter 1 (type: 'original'), the App.jsx delegates to the existing flow.
 * For future chapters, this component renders based on the chapter's content type.
 */
const ChapterScreen = ({ chapter, onBack }) => {
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

    return (
        <section className="screen active chapter-screen" role="main" style={{ justifyContent: 'flex-start', paddingTop: '3rem' }}>
            {/* Chapter header */}
            <div className="chapter-header">
                <span className="chapter-label-badge">Capitolul {chapter.chapterNumber}</span>
                <h2 className="section-title">{content.title || chapter.title} {chapter.emoji}</h2>
            </div>

            {/* Message */}
            {content.message && (
                <div className="message-container" style={{ marginTop: '1.5rem' }}>
                    <div
                        className="message-text"
                        dangerouslySetInnerHTML={{ __html: content.message }}
                    />
                </div>
            )}

            {/* Photos grid */}
            {content.photos && content.photos.length > 0 && (
                <div className="memory-grid" style={{ marginTop: '2rem' }}>
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
                        </div>
                    ))}
                </div>
            )}

            {/* Back button */}
            <button className="btn btn-secondary back-to-tree-btn" onClick={onBack} style={{ marginTop: '2.5rem' }}>
                ← Înapoi la Grădină
            </button>
        </section>
    );
};

export default ChapterScreen;
