const FAVORITES_STORAGE_KEY = "spice-garden-favorites";
const FAVORITES_EVENT = "spice-garden:favorites-change";

function readFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function writeFavorites(ids: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
}

export function getFavoriteDishIds(): string[] {
  return readFavorites();
}

export function isFavoriteDish(dishId: string): boolean {
  return getFavoriteDishIds().includes(dishId);
}

export function toggleFavoriteDish(dishId: string): boolean {
  const current = getFavoriteDishIds();
  const exists = current.includes(dishId);
  const next = exists ? current.filter((id) => id !== dishId) : [...current, dishId];
  writeFavorites(next);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(FAVORITES_EVENT));
  }

  return !exists;
}

export function subscribeToFavorites(callback: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;

  const handler = () => callback();
  window.addEventListener(FAVORITES_EVENT, handler);
  return () => window.removeEventListener(FAVORITES_EVENT, handler);
}
