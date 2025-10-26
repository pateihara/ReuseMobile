// src/services/api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

type FetchJsonOpts = {
  cacheKey?: string;
  ttlMs?: number;
  retries?: number;
  timeoutMs?: number;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchJson<T = any>(url: string, opts: FetchJsonOpts = {}): Promise<T> {
  const { cacheKey, ttlMs = 2 * 60 * 1000, retries = 2, timeoutMs = 8000 } = opts;

  if (cacheKey) {
    const raw = await AsyncStorage.getItem(cacheKey);
    if (raw) {
      const { data, until } = JSON.parse(raw);
      if (!until || Date.now() < until) return data as T;
    }
  }

  let lastErr: any;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const ctrl = new AbortController();
      const id = setTimeout(() => ctrl.abort(), timeoutMs);
      const res = await fetch(url, { signal: ctrl.signal });
      clearTimeout(id);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as T;

      if (cacheKey) {
        await AsyncStorage.setItem(cacheKey, JSON.stringify({ data, until: Date.now() + ttlMs }));
      }
      return data;
    } catch (e) {
      lastErr = e;
      if (attempt < retries) await sleep(500 * (attempt + 1));
    }
  }
  throw lastErr;
}
