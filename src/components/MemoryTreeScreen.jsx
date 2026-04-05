import React, { useMemo } from 'react';
import { chapters } from '../data';

const MemoryTreeScreen = ({ onSelectChapter }) => {
    const now = new Date();

    // Sort chapters: newest first (highest chapter number at top)
    const sortedChapters = useMemo(() => {
        return [...chapters].sort((a, b) => b.chapterNumber - a.chapterNumber);
    }, []);

    const isUnlocked = (chapter) => {
        return new Date(chapter.unlockDate) <= now;
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const months = [
            'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
            'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
        ];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    // Find the newest unlocked chapter
    const newestUnlocked = useMemo(() => {
        const unlocked = chapters.filter(ch => isUnlocked(ch));
        return unlocked.length > 0
            ? unlocked.reduce((a, b) => a.chapterNumber > b.chapterNumber ? a : b)
            : null;
    }, []);

    return (
        <section id="memory-tree-screen" className="screen active" role="main">
            {/* Header */}
            <div className="tree-header">
                <div className="tree-header-emoji">🌿</div>
                <h1 className="tree-title">Grădina Amintirilor</h1>
                <p className="tree-subtitle">Fiecare capitol e o amintire care crește în inima mea 💕</p>
            </div>

            {/* The vine / tree */}
            <div className="tree-container">
                {/* The organic vine line */}
                <div className="vine-line" aria-hidden="true">
                    <svg className="vine-svg" viewBox="0 0 40 100" preserveAspectRatio="none">
                        <path
                            d="M20,0 C25,10 15,20 20,30 C25,40 15,50 20,60 C25,70 15,80 20,90 C22,95 20,100 20,100"
                            fill="none"
                            stroke="url(#vineGradient)"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        <defs>
                            <linearGradient id="vineGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgba(255, 107, 157, 0.15)" />
                                <stop offset="50%" stopColor="rgba(255, 107, 157, 0.5)" />
                                <stop offset="100%" stopColor="rgba(196, 69, 105, 0.3)" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Chapter nodes */}
                {sortedChapters.map((chapter, index) => {
                    const unlocked = isUnlocked(chapter);
                    const isNewest = newestUnlocked && chapter.id === newestUnlocked.id;
                    const side = index % 2 === 0 ? 'right' : 'left';

                    return (
                        <div
                            key={chapter.id}
                            className={`tree-node ${side} ${unlocked ? 'unlocked' : 'locked'} ${isNewest ? 'newest' : ''}`}
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            {/* Branch connector */}
                            <div className="branch-connector" aria-hidden="true">
                                <svg className="branch-svg" viewBox="0 0 80 20" preserveAspectRatio="none">
                                    <path
                                        d={side === 'right'
                                            ? "M0,10 C20,10 30,8 50,5 C60,3 70,4 80,4"
                                            : "M80,10 C60,10 50,8 30,5 C20,3 10,4 0,4"
                                        }
                                        fill="none"
                                        stroke="rgba(255, 107, 157, 0.3)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                {/* Leaf at the junction */}
                                <span className="branch-leaf" aria-hidden="true">
                                    {unlocked ? '🌿' : '🍂'}
                                </span>
                            </div>

                            {/* Node card */}
                            <button
                                className="tree-node-card"
                                onClick={() => unlocked && onSelectChapter(chapter)}
                                disabled={!unlocked}
                                aria-label={unlocked
                                    ? `Deschide ${chapter.title}`
                                    : `${chapter.title} - încă nu e disponibil`
                                }
                            >
                                {/* Glow effect for newest */}
                                {isNewest && <div className="node-glow" aria-hidden="true" />}

                                <div className="node-emoji">{chapter.emoji}</div>
                                <div className="node-info">
                                    <span className="node-chapter-label">
                                        Capitolul {chapter.chapterNumber}
                                    </span>
                                    <h3 className="node-title">{chapter.title}</h3>
                                    <p className="node-teaser">{chapter.teaser}</p>
                                    <span className="node-date">
                                        {unlocked ? formatDate(chapter.date) : '🔒 ' + formatDate(chapter.unlockDate)}
                                    </span>
                                </div>

                                {unlocked && (
                                    <div className="node-arrow" aria-hidden="true">
                                        <span>→</span>
                                    </div>
                                )}
                            </button>

                            {/* Floating decorative elements for newest */}
                            {isNewest && (
                                <div className="node-particles" aria-hidden="true">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span
                                            key={i}
                                            className="node-particle"
                                            style={{
                                                left: `${20 + Math.random() * 60}%`,
                                                animationDelay: `${Math.random() * 3}s`,
                                                animationDuration: `${2 + Math.random() * 2}s`,
                                            }}
                                        >
                                            {['✨', '🌸', '💫', '🦋', '🌺'][i]}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Root / bottom decoration */}
                <div className="tree-root" aria-hidden="true">
                    <span className="root-emoji">🌱</span>
                    <span className="root-text">Unde totul a început...</span>
                </div>
            </div>
        </section>
    );
};

export default MemoryTreeScreen;
