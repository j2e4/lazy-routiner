'use client';

import { Tab } from '@headlessui/react';
import { CheckIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import _ from 'lodash';
import { useState } from 'react';
import Badge from 'src/components/badge';
import Dropdown from 'src/components/dropdown';
import List from 'src/components/list';
import { ROUTINE_CHECK_ITEMS, ROUTINE_CHECK_TABS } from 'src/constants/routine';
import { getFetch, postFetch } from 'src/services/fetch';
import { toDateStr } from 'src/utils/date-str';
import { DailyRoutine } from 'types/routine';

const initialTabs = ROUTINE_CHECK_TABS.map((tab) => ({
  routines: [] as DailyRoutine[],
  ...tab,
}));
export default function RoutineToday() {
  const {
    data: tabs = initialTabs,
    isPending,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['daily_routines'],
    queryFn: async () => {
      const date = toDateStr(new Date());
      const arr: DailyRoutine[] = await getFetch('/daily', {
        params: {
          date,
        },
        next: {
          tags: ['daily_routines'],
        },
      });
      const groups = _.groupBy(
        arr,
        ({ routineCheck }) => routineCheck ?? ROUTINE_CHECK_TABS[0].key,
      );

      return ROUTINE_CHECK_TABS.map((tab) => ({
        routines: groups[tab.key] ?? [],
        ...tab,
      }));
    },
  });
  const [tabIndex, setTabIndex] = useState(ROUTINE_CHECK_TABS[0].key);
  const currentTab = tabs[tabIndex];

  let displayMessage = '';
  if (isPending) displayMessage = currentTab.pendingMessage;
  else if (isSuccess && currentTab.routines.length === 0)
    displayMessage = currentTab.emptyListMessage;

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
          {tabs.map((tab) => (
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
                    {tab.routines.length}
                  </span>
                </>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map(({ routines, ...tab }) => (
            <Tab.Panel key={tab.key}>
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
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </main>
  );
}
