import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getFetch, postFetch, putFetch } from 'src/services/fetch';
import { Category } from 'types/category';

export type Routine = {
  id: string; // uuid
  name: string;
  repeatDays: number[];
  category: Category;
};

export const getRoutines = () => {
  return getFetch('/routine', {
    next: {
      tags: ['routines'],
    },
  });
};

export const getRoutine = (id: string) => {
  return getFetch(`/routine/${id}`, {
    next: {
      tags: ['routine', id],
    },
  });
};

type CreateRoutineParams = {
  name: string;
  repeatDays: number[];
  categoryId: string;
};

export const createRoutine = async (params: CreateRoutineParams) => {
  const response = await postFetch('/routine', params);
  if (!response.ok) throw new Error();
};

export const updateRoutine = async (
  id: string,
  params: CreateRoutineParams,
) => {
  const response = await putFetch(`/routine/${id}`, { id, ...params });
  if (!response.ok) throw new Error();
};

type UpdateRoutineCheckParams = {
  id: string;
  check: number;
};

const updateRoutineCheck = async ({ id, check }: UpdateRoutineCheckParams) => {
  const response = await postFetch('/history', {
    routineId: id,
    routineCheck: check,
  });
  if (!response.ok) throw new Error();
};

export const useRoutines = () => {
  return useQuery<Routine[]>({
    queryKey: ['routines'],
    queryFn: getRoutines,
  });
};

export const useUpdateRoutineCheck = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRoutineCheck,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['routine_tabs'],
      });
    },
  });
};
