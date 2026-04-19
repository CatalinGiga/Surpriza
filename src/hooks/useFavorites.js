import { useLocalStorage } from './useLocalStorage';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage('sufletflix_favorites', []);

  const toggleFavorite = (videoId) => {
    setFavorites(prev =>
      prev.includes(videoId)
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const isFavorite = (videoId) => favorites.includes(videoId);

  return { favorites, toggleFavorite, isFavorite };
}
