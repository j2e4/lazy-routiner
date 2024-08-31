import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { getFetch } from 'src/services/fetch';
import { toDateStr } from 'src/utils/date-str';
import { Category } from 'src/services/server-state/category';

export enum CheckOption {
  ToCheck = 0,
  Checked = 1,
  Skipped = 2,
  NoCheck = 3,
}

export type DailyRoutine = {
  id: string; // uuid
  name: string;
  routineCheck: CheckOption | null; // null은 0으로 취급한다.
  category: Category;
};

export type DailyRoutineTab = {
  id: CheckOption;
  name: string;
  routines?: DailyRoutine[]; // server state
  checkable?: boolean;
  updatable?: boolean;
  emptyMessage: string;
};

export const DAILY_ROUTINE_TABS: DailyRoutineTab[] = [
  {
    id: CheckOption.ToCheck,
    name: '미완료',
    checkable: true,
    updatable: true,
    emptyMessage: '오늘 루틴을 모두 완료했어요.',
  },
  {
    id: CheckOption.Checked,
    name: '완료',
    emptyMessage: '아직 완료한 루틴이 없어요.',
  },
  {
    id: CheckOption.Skipped,
    name: '건너뜀',
    emptyMessage: '오늘 건너뛴 루틴이 없어요.',
  },
  {
    id: CheckOption.NoCheck,
    name: '안 함',
    emptyMessage: '오늘 안 하기로 한 루틴이 없어요.',
  },
];

export const getRoutineTabs = async () => {
  const date = toDateStr(new Date());
  const arr = await getFetch('/daily', { date });
  const groups = _.groupBy(
    arr,
    ({ routineCheck }) => routineCheck ?? DAILY_ROUTINE_TABS[0].id,
  );

  return DAILY_ROUTINE_TABS.map<DailyRoutineTab>((tab) => ({
    routines: groups[tab.id] ?? [],
    ...tab,
  }));
};

export const useRoutineTabs = () => {
  return useQuery<DailyRoutineTab[]>({
    queryKey: ['routine_tabs'],
    queryFn: getRoutineTabs,
  });
};
