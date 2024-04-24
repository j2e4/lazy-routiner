import { useRef, useState } from 'react';

export function useDebounce<T>(
  initialState: T,
  ms = 300,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState(initialState);
  const timeoutId = useRef<NodeJS.Timeout>();

  const debounced: React.Dispatch<React.SetStateAction<T>> = (value) => {
    if (timeoutId.current !== undefined) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      setState(value);
      timeoutId.current = undefined;
    }, ms);
  };

  return [state, debounced];
}
