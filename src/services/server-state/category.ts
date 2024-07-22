import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { merge } from 'lodash';
import { getFetch } from 'src/services/fetch';
import { Category } from 'types/category';

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
