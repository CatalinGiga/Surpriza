// Get base URL from Vite
const base = import.meta.env.BASE_URL;

// ─── Video data ─────────────────────────────────────────────────
export const videos = [
  {
    id: 1,
    title: "La mulți ani, Deniii! 🎂💖",
    description: "Un video special cu cele mai frumoase poze ale noastre, pentru cea mai specială zi a ta. La mulți ani, sufletul meu! 🥳✨",
    thumbnail: `${base}thumbnails/lmaDeniii2025.png`,
    videoUrl: `${base}videos/ZiNastereDeniii2025.MP4`,
    category: "Milestones",
    date: "2025-09-19",
    duration: "2:55",
    tags: ["birthday", "milestone", "2025"],
    featured: true
  }
];

// ─── Categories ──────────────────────────────────────────────────
export const categories = [
  { id: "best-moments", name: "Our Best Moments 💑", filter: "Our Best Moments" },
  { id: "travel", name: "Travel Adventures ✈️", filter: "Travel Adventures" },
  { id: "date-nights", name: "Date Nights 🍷", filter: "Date Nights" },
  { id: "funny", name: "Funny Clips 😂", filter: "Funny Clips" },
  { id: "milestones", name: "Milestones 🎂", filter: "Milestones" },
  { id: "just-us", name: "Just Us 🌙", filter: "Just Us" },
];

// ─── Profiles ────────────────────────────────────────────────────
export const profiles = [
  { id: "deni", name: "Deniii ✨💖", emoji: "🥰", avatar: `${base}Deni.png` },
  { id: "cata", name: "Cătă 🙈", emoji: "😎", avatar: `${base}Cata.png` },
];

// ─── Our Story Timeline (empty — to be filled in) ───────────────
export const timelineMilestones = [
  // Add your milestones here! Example:
  {
    id: 1,
    date: "2024-06-14",
    title: "Ne-am cunoscut 💫",
    description: "Povestea noastră a început...",
    image: `${base}milestone_photos/primaIesire.jpeg`
  },
];

// ─── Helper functions ────────────────────────────────────────────
export function getVideosByCategory(category) {
  return videos.filter(v => v.category === category);
}

export function getFeaturedVideos() {
  return videos.filter(v => v.featured);
}

export function getRecentVideos() {
  return [...videos].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
}

export function searchVideos(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return videos.filter(v =>
    v.title.toLowerCase().includes(q) ||
    v.tags.some(t => t.toLowerCase().includes(q)) ||
    v.date.includes(q) ||
    v.category.toLowerCase().includes(q)
  );
}
