import { useContext } from 'react';
import { HoverableContext } from 'src/contexts/hoverable/hoverable-context';

export function useHoverable() {
  return useContext(HoverableContext);
}
