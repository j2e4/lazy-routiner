import { DailyRoutineTab } from 'types/routine';

export enum RoutineCheck {
  ToCheck,
  Checked,
  Skipped,
  NoCheck,
}

export const ROUTINE_CHECK_ITEMS = [
  { name: '완료하기', value: RoutineCheck.Checked },
  { name: '오늘은 건너뛰기', value: RoutineCheck.Skipped },
  { name: '오늘 안 하기', value: RoutineCheck.NoCheck },
];

export const DAILY_ROUTINE_TABS: DailyRoutineTab[] = [
  {
    id: RoutineCheck.ToCheck,
    name: '미완료',
    checkable: true,
    updatable: true,
  },
  { id: RoutineCheck.Checked, name: '완료' },
  { id: RoutineCheck.Skipped, name: '건너뜀' },
  { id: RoutineCheck.NoCheck, name: '안 함' },
];
