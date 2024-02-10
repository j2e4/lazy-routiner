import { Category } from 'types/category';

export type Routine = {
  id: string; // uuid
  name: string;
  repeatDays: number[];
  category: Category;
};
