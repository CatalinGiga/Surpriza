import React, { useState, useEffect } from 'react';

const MusicPlayer = ({ shouldPlay, audioRef }) => {
    const [isPlaying, setIsPlaying] = useState(false);

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

    const base = import.meta.env.BASE_URL;

    return (
        <>
            <audio
                ref={audioRef}
                src={`${base}music.mp3`}
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
