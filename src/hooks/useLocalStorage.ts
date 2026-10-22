import { useEffect, useState } from 'react';

/** Persist non-sensitive UI state without making storage availability a requirement. */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved ? (JSON.parse(saved) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // The experience remains fully usable when storage is blocked or full.
    }
  }, [key, value]);

  return [value, setValue] as const;
}
