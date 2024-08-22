import { useRef } from 'react';

export function useRefs<K extends string, T extends HTMLElement>() {
  const refs = useRef<Map<K, T>>();

  const getMap = () => {
    if (!refs.current) refs.current = new Map();
    return refs.current;
  };

  const setRef = (key: K, node: T | null) => {
    const map = getMap();
    if (node) map.set(key, node);
    else map.delete(key);
  };

  const getRef = (key: K) => {
    const map = getMap();
    return map.get(key) ?? null;
  };

  return { getRef, setRef };
}
