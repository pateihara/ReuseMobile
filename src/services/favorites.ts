// src/services/favorites.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'favorites';

export type Favorite = { id: string; [k: string]: any };

async function read(): Promise<Favorite[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) {
      await AsyncStorage.setItem(KEY, JSON.stringify([]));
      return [];
    }
    try {
      return JSON.parse(raw) as Favorite[];
    } catch {
      await AsyncStorage.setItem(KEY, JSON.stringify([]));
      return [];
    }
  } catch {
    return [];
  }
}

async function write(list: Favorite[]) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // silencia em dev
  }
}

export async function loadFavorites(): Promise<Favorite[]> {
  return read();
}

export async function addFavorite(fav: Favorite) {
  const list = await read();
  const exists = list.some(x => x.id === fav.id);
  if (!exists) {
    list.push(fav);
    await write(list);
  }
}

export async function removeFavorite(id: string) {
  const list = await read();
  const next = list.filter(x => x.id !== id);
  await write(next);
}

export async function clearFavorites() {
  await write([]);
}

export async function isFavorite(id: string): Promise<boolean> {
  const list = await read();
  return list.some(x => x.id === id);
}

export async function toggleFavorite(fav: Favorite) {
  const favs = await read();
  const exists = favs.some(x => x.id === fav.id);
  if (exists) {
    await write(favs.filter(x => x.id !== fav.id));
    return false;
  } else {
    favs.push(fav);
    await write(favs);
    return true;
  }
}

// ✅ export default com os mesmos métodos (compat com import default)
const Favorites = {
  loadFavorites,
  addFavorite,
  removeFavorite,
  clearFavorites,
  isFavorite,
  toggleFavorite,
};
export default Favorites;
