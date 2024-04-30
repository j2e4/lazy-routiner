'use client';

import { Tab } from '@headlessui/react';
import { CheckIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useState } from 'react';
import Badge from 'src/components/badge';
import Dropdown from 'src/components/dropdown';
import List from 'src/components/list';
import {
  ROUTINE_CHECK_ITEMS,
  ROUTINE_CHECK_TABS,
  RoutineCheck,
} from 'src/constants/routine';
import { getFetch, postFetch } from 'src/services/fetch';
import { toDateStr } from 'src/utils/date-str';
import { DailyRoutine } from 'types/routine';

export default function RoutineToday() {
  const {
    data = [],
    isPending,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['daily_routines'],
    queryFn: () => {
      const date = toDateStr(new Date());
      return getFetch('/daily', {
        params: {
          date,
        },
        next: {
          tags: ['daily_routines'],
        },
      });
    },
  });

  const [tabIndex, setTabIndex] = useState(RoutineCheck.ToCheck);
  const tab = ROUTINE_CHECK_TABS[tabIndex];
  const tabData = new Map<RoutineCheck, DailyRoutine[]>();
  data.forEach((item: DailyRoutine) => {
    const check = Number(item.routineCheck);
    const arr = tabData.get(check) || [];
    tabData.set(check, arr.concat(item));
  });
  const routines = tabData.get(tab.key) || [];

  let displayMessage = '';
  if (isPending) displayMessage = '오늘 실천할 루틴을 불러오는 중이에요.';
  else if (isSuccess && routines.length === 0)
    displayMessage = '오늘 루틴을 모두 완료했어요.';

  const update = async (routineId: string, routineCheck: number) => {
    const response = await postFetch('/history', {
      routineId,
      routineCheck,
    });
    if (response.ok) await refetch();
  };

  return (
    <main>
      <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
        <Tab.List className="-mb-px flex justify-between px-6 md:justify-normal md:space-x-6 md:px-8">
          {ROUTINE_CHECK_TABS.map((tab) => (
            <Tab
              key={tab.key}
              className={({ selected }) =>
                clsx(
                  'flex whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium outline-none md:px-2',
                  selected && 'border-theme-neutral-200 text-gray-900',
                  !selected &&
                    'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                )
              }
            >
              {({ selected }) => (
                <>
                  {tab.name}
                  <span
                    className={clsx(
                      'ml-3 rounded-full px-2.5 py-0.5 text-xs font-medium',
                      selected && 'bg-theme-neutral-100',
                      !selected && 'bg-gray-100 text-gray-900',
                    )}
                  >
                    {tabData.get(tab.key)?.length || 0}
                  </span>
                </>
              )}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
      <List>
        {displayMessage !== '' && (
          <List.Item>
            <List.ItemBody className="text-center">
              <List.ItemBodyText>{displayMessage}</List.ItemBodyText>
            </List.ItemBody>
          </List.Item>
        )}
        {routines.map(({ category, ...routine }) => (
          <List.Item key={routine.id}>
            <List.ItemBody>
              <Badge variant={category.theme}>{category.name}</Badge>
              <List.ItemBodyText className="mt-1 block">
                {routine.name}
              </List.ItemBodyText>
            </List.ItemBody>
            <List.ItemTail className="flex items-center space-x-1">
              {tab.updatable && (
                <Dropdown>
                  <Dropdown.Button variant="secondary" size="sm">
                    <CheckIcon
                      className="h-3.5 w-3.5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="sr-only">
                      Update whether this routine is done or not
                    </span>
                  </Dropdown.Button>
                  <Dropdown.Menu>
                    {ROUTINE_CHECK_ITEMS.map(({ name, value }) => (
                      <Dropdown.ButtonItem
                        key={name}
                        onClick={() => update(routine.id, value)}
                      >
                        {name}
                      </Dropdown.ButtonItem>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}
              <Dropdown>
                <Dropdown.Button variant="secondary" size="sm">
                  <EllipsisVerticalIcon
                    className="h-3.5 w-3.5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Manage this routine</span>
                </Dropdown.Button>
                <Dropdown.Menu>
                  <Dropdown.LinkItem href={`/plan/${routine.id}`}>
                    수정하기
                  </Dropdown.LinkItem>
                </Dropdown.Menu>
              </Dropdown>
            </List.ItemTail>
          </List.Item>
        ))}
      </List>
    </main>
  );
}
