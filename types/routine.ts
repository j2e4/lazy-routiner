import { RoutineCheck } from 'src/constants/routine';
import { Category } from 'types/category';

export type Routine = {
  id: string; // uuid
  name: string;
  repeatDays: number[];
  category: Category;
};

export type DailyRoutine = {
  id: string; // uuid
  name: string;
  routineCheck: RoutineCheck | null; // null은 0으로 취급한다.
  category: Category;
};
