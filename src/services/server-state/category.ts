import { getFetch } from 'src/services/fetch';
import { Category } from 'types/category';

export function getCategories(): Promise<Category[]> {
  return getFetch('/category', {
    next: {
      tags: ['categories'],
    },
  });
}
