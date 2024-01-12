import { Category } from 'types/category';

export type RoutineInput = {
  id?: string; // uuid
  name: string;
  repeatDays: number[];
  categoryId: string; // uuid
};

export type Routine = {
  id: string; // uuid
  name: string;
  repeatDays: number[];
  category: Category;
};
