// src/services/reviews.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ReviewData = {
  userName: string;
  images?: string[];
  rating: number;   // 0..5
  location: string;
  comment: string;
};

const KEY = '@userReview';

export async function getReview(): Promise<ReviewData | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ReviewData | null) : null;
  } catch {
    return null;
  }
}

export async function setReview(data: ReviewData | null) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
}

export async function clearReview() {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch {}
}

/** Simula o “submit”: salva localmente e você navega para o feedback */
export async function submitUserReview(data: ReviewData) {
  await setReview(data);
}
