import { Category } from 'types/category';

export type Routine = {
  id: string; // uuid
  name: string;
  repeatDays: number[];
  category: Category;
};

export type ToCheckRoutine = {
  id: string;
  name: string;
  routineCheck: number | null;
  category: Category;
};
