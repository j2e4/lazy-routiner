import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { merge } from 'lodash';
import { getFetch } from 'src/services/fetch';

export type CategoryTheme =
  | 'GRAY'
  | 'RED'
  | 'YELLOW'
  | 'GREEN'
  | 'BLUE'
  | 'INDIGO'
  | 'PURPLE'
  | 'PINK';

export type Category = {
  id: string; // uuid
  name: string;
  theme: CategoryTheme;
};

export const getCategories = () => {
  return getFetch('/category', {
    next: {
      tags: ['categories'],
    },
  });
};

export const useCategories = (
  options?: Omit<UseQueryOptions<Category[]>, 'queryKey' | 'queryFn'>,
) => {
  const queryOptions = merge(
    {
      queryKey: ['categories'],
      queryFn: getCategories,
    },
    options,
  );
  return useQuery(queryOptions);
};
