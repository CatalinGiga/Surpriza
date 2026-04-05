import React, { useState, useEffect } from 'react';

const MusicPlayer = ({ shouldPlay, audioRef, musicSrc }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    // Update audio source when musicSrc changes
    useEffect(() => {
        if (audioRef.current && musicSrc) {
            const wasPlaying = !audioRef.current.paused;
            audioRef.current.src = musicSrc;
            if (wasPlaying || shouldPlay) {
                audioRef.current.play().catch(e => console.log('Play failed:', e));
            }
        }
    }, [musicSrc]);

    useEffect(() => {
        if (!audioRef.current) return;
        
        const audio = audioRef.current;
        
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        
        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        };
    }, [audioRef]);

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log('Play failed:', e));
            }
        }
    };

    return (
        <>
            <audio
                ref={audioRef}
                src={musicSrc || ''}
                loop
                preload="auto"
            />
            {shouldPlay && (
                <button
                    className="music-btn"
                    onClick={toggleMusic}
                    aria-label="Toggle music"
                    style={{
                        opacity: isPlaying ? 1 : 0.7,
                        animation: isPlaying ? 'musicPulse 2s infinite' : 'none'
                    }}
                >
                    {isPlaying ? '🎵' : '🔇'}
                </button>
            )}
        </>
    );
};

export default MusicPlayer;
