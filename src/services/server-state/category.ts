import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { merge } from 'lodash';
import { getFetch, postFetch, putFetch } from 'src/services/fetch';

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

export const getCategory = (id: string) => {
  return getFetch(`/category/${id}`, {
    next: {
      tags: ['category', id],
    },
  });
};

type CreateCategoryParams = {
  name: string;
  theme: CategoryTheme;
};

export const createCategory = async (params: CreateCategoryParams) => {
  const response = await postFetch('/category', params);
  if (!response.ok) throw new Error();
};

export const updateCategory = async (
  id: string,
  params: CreateCategoryParams,
) => {
  const response = await putFetch(`/category/${id}`, { id, ...params });
  if (!response.ok) throw new Error();
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
