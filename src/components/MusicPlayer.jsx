import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = ({ shouldPlay }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const iframeRef = useRef(null);

    useEffect(() => {
        if (shouldPlay && iframeRef.current) {
            // Small delay to ensure iframe is loaded
            const timer = setTimeout(() => {
                setIsPlaying(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [shouldPlay]);

    const toggleMusic = () => {
        if (iframeRef.current) {
            const iframe = iframeRef.current;
            if (isPlaying) {
                // Pause by sending postMessage
                iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                setIsPlaying(false);
            } else {
                // Play by sending postMessage
                iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                setIsPlaying(true);
            }
        }
    };

    // Only render after user interaction
    if (!shouldPlay) {
        return null;
    }

    return (
        <>
            <iframe
                ref={iframeRef}
                style={{
                    position: 'fixed',
                    top: -9999,
                    left: -9999,
                    width: 1,
                    height: 1,
                    border: 'none'
                }}
                src="https://www.youtube.com/embed/8p4TcI-RHNQ?autoplay=1&loop=1&playlist=8p4TcI-RHNQ&enablejsapi=1&controls=0"
                allow="autoplay; encrypted-media"
                title="Background Music"
            />
            <button
                className="music-btn"
                onClick={toggleMusic}
                aria-label="Toggle music"
                style={{
                    opacity: isPlaying ? 1 : 0.7,
                    animation: isPlaying ? 'musicPulse 2s infinite' : 'none'
                }}
            >
                🎵
            </button>
        </>
    );
};

export default MusicPlayer;
