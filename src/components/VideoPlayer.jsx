import React, { useRef, useState, useEffect, useCallback } from 'react';
import { videos } from '../data/videos';
import {
  PlayFilled,
  PauseFilled,
  RewindRegular,
  FastForwardRegular,
  SpeakerMuteRegular,
  Speaker1Regular,
  Speaker2Regular,
  FullScreenMaximizeRegular,
  ArrowLeftRegular,
  VideoRegular,
} from '@fluentui/react-icons';

const VideoPlayer = ({ video, onClose, onUpdateProgress, initialTime }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const hideTimerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showNext, setShowNext] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);

  // Find next video
  const currentIdx = videos.findIndex(v => v.id === video.id);
  const nextVideo = currentIdx >= 0 && currentIdx < videos.length - 1 ? videos[currentIdx + 1] : null;

  useEffect(() => {
    setHasVideo(!!video.videoUrl);
  }, [video]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (!videoRef.current || !hasVideo) return;
      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          skip(-10);
          break;
        case 'ArrowRight':
          skip(10);
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'm':
          toggleMute();
          break;
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [hasVideo, isPlaying]);

  // Auto-hide controls
  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const skip = (seconds) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, duration));
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  const handleProgressClick = (e) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    onUpdateProgress?.(video.id, videoRef.current.currentTime, videoRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setShowNext(true);
    setShowControls(true);
  };

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-player-overlay">
      <div
        ref={containerRef}
        className={`video-player ${showControls ? 'video-player--controls-visible' : ''}`}
        onMouseMove={resetHideTimer}
        onClick={hasVideo ? togglePlay : undefined}
      >
        {hasVideo ? (
          <video
            ref={videoRef}
            className="video-player__video"
            src={video.videoUrl}
            onLoadedMetadata={(e) => {
              setDuration(e.target.duration);
              if (initialTime) e.target.currentTime = initialTime;
            }}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        ) : (
          <div className="video-player__placeholder">
            <div className="video-player__placeholder-icon"><VideoRegular fontSize={64} /></div>
            <div className="video-player__placeholder-text">
              <strong>{video.title}</strong>
              <br /><br />
              Video hasn't been added yet.
              <br />
              Add your video file to start watching!
            </div>
          </div>
        )}

        {/* Top controls */}
        <div className="video-player__top-controls" onClick={e => e.stopPropagation()}>
          <button className="video-player__back-btn" onClick={onClose}>
            <ArrowLeftRegular fontSize={20} /> <span className="video-player__title">{video.title}</span>
          </button>
        </div>

        {/* Bottom controls */}
        {hasVideo && (
          <div className="video-player__controls" onClick={e => e.stopPropagation()}>
            <div className="video-player__progress-container" onClick={handleProgressClick}>
              <div className="video-player__progress-bar">
                <div
                  className="video-player__progress-filled"
                  style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                />
              </div>
            </div>

            <div className="video-player__buttons">
              <div className="video-player__buttons-left">
                <button className="video-player__btn" onClick={togglePlay}>
                  {isPlaying ? <PauseFilled fontSize={20} /> : <PlayFilled fontSize={20} />}
                </button>
                <button className="video-player__btn" onClick={() => skip(-10)}><RewindRegular fontSize={20} /></button>
                <button className="video-player__btn" onClick={() => skip(10)}><FastForwardRegular fontSize={20} /></button>
                <div className="video-player__volume-wrapper">
                  <button className="video-player__btn" onClick={toggleMute}>
                    {isMuted || volume === 0 ? <SpeakerMuteRegular fontSize={20} /> : volume < 0.5 ? <Speaker1Regular fontSize={20} /> : <Speaker2Regular fontSize={20} />}
                  </button>
                  <input
                    type="range"
                    className="video-player__volume-slider"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                  />
                </div>
                <span className="video-player__time">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              <div className="video-player__buttons-right">
                <button className="video-player__btn" onClick={toggleFullscreen}><FullScreenMaximizeRegular fontSize={20} /></button>
              </div>
            </div>
          </div>
        )}

        {/* Close button for placeholder mode */}
        {!hasVideo && (
          <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
            <button
              className="video-player__back-btn"
              onClick={onClose}
              style={{ background: 'rgba(0,0,0,.5)', borderRadius: '4px', padding: '8px 16px' }}
            >
              <ArrowLeftRegular fontSize={18} /> Back
            </button>
          </div>
        )}

        {/* Next video suggestion */}
        {showNext && nextVideo && (
          <div className="video-player__next" onClick={() => { /* would load next */ }}>
            <div className="video-player__next-label">Next Up</div>
            <img
              className="video-player__next-thumb"
              src={nextVideo.thumbnail}
              alt={nextVideo.title}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="video-player__next-title">{nextVideo.title}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
