import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { DAILY_ROUTINE_TABS } from 'src/constants/routine';
import { getFetch } from 'src/services/fetch';
import { toDateStr } from 'src/utils/date-str';
import { DailyRoutineTab } from 'types/routine';

const getRoutineTabs = async () => {
  const date = toDateStr(new Date());
  const arr = await getFetch('/daily', {
    params: {
      date,
    },
    next: {
      tags: ['routine_tabs'],
    },
  });
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
