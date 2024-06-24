import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { merge } from 'lodash';
import { getFetch } from 'src/services/fetch';
import { Category } from 'types/category';

const getCategories = () => {
  return getFetch('/category', {
    next: {
      tags: ['categories'],
    },
  });
};

type UseCategoriesOptions = Omit<
  UseQueryOptions<Category[]>,
  'queryKey' | 'queryFn'
>;
export const useCategories = (options?: UseCategoriesOptions) => {
  const queryOptions = merge(
    {
      queryKey: ['categories'],
      queryFn: getCategories,
    },
    options,
  );
  return useQuery(queryOptions);
};
