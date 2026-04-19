import { useLocalStorage } from './useLocalStorage';

export function useWatchProgress() {
  // { [videoId]: { progress: 0-1, currentTime: seconds, lastWatched: timestamp } }
  const [watchProgress, setWatchProgress] = useLocalStorage('sufletflix_progress', {});

  const updateProgress = (videoId, currentTime, duration) => {
    if (!duration || duration === 0) return;
    const progress = currentTime / duration;
    setWatchProgress(prev => ({
      ...prev,
      [videoId]: {
        progress,
        currentTime,
        duration,
        lastWatched: Date.now()
      }
    }));
  };

  const getProgress = (videoId) => {
    return watchProgress[videoId] || null;
  };

  const getContinueWatching = (allVideos) => {
    return allVideos
      .filter(v => {
        const p = watchProgress[v.id];
        return p && p.progress > 0.02 && p.progress < 0.95;
      })
      .sort((a, b) => {
        const pA = watchProgress[a.id];
        const pB = watchProgress[b.id];
        return (pB?.lastWatched || 0) - (pA?.lastWatched || 0);
      });
  };

  const clearProgress = (videoId) => {
    setWatchProgress(prev => {
      const next = { ...prev };
      delete next[videoId];
      return next;
    });
  };

  return { watchProgress, updateProgress, getProgress, getContinueWatching, clearProgress };
}
