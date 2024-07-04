'use client';

import { Tab } from '@headlessui/react';
import { CheckIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useState } from 'react';
import Badge from 'src/components/badge';
import Dropdown from 'src/components/dropdown';
import List from 'src/components/list';
import TabListPlaceholder from 'src/components/routine/TabListPlaceholder';
import { ROUTINE_CHECK_ITEMS, DAILY_ROUTINE_TABS } from 'src/constants/routine';
import { useUpdateRoutineCheck } from 'src/services/server-state/routine';
import { useRoutineTabs } from 'src/services/server-state/routine-tabs';
import { DailyRoutine } from 'types/routine';

const initialTabs = DAILY_ROUTINE_TABS.map((tab) => ({
  routines: [] as DailyRoutine[],
  ...tab,
}));
function RoutinePage() {
  const [tabIndex, setTabIndex] = useState(0);
  const { data: tabs = initialTabs } = useRoutineTabs();
  const { mutate } = useUpdateRoutineCheck();

  return (
    <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
      <Tab.List className="-mb-px flex justify-between px-6 md:justify-normal md:space-x-6 md:px-8">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
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
                  {tab.routines?.length ?? 0}
                </span>
              </>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {tabs.map(({ routines, ...tab }) => (
          <Tab.Panel key={tab.id}>
            <List>
              <TabListPlaceholder tabIndex={tabIndex} />
              {routines?.map(({ category, ...routine }) => (
                <List.Item key={routine.id}>
                  <List.ItemBody>
                    <Badge variant={category.theme}>{category.name}</Badge>
                    <List.ItemBodyText className="mt-1 block">
                      {routine.name}
                    </List.ItemBodyText>
                  </List.ItemBody>
                  <List.ItemTail className="flex items-center space-x-1">
                    {tab.checkable && (
                      <Dropdown>
                        <Dropdown.Button variant="secondary" size="sm" squared>
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
                              onClick={() => {
                                mutate({ id: routine.id, check: value });
                              }}
                            >
                              {name}
                            </Dropdown.ButtonItem>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                    {tab.updatable && (
                      <Dropdown>
                        <Dropdown.Button variant="secondary" size="sm" squared>
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
                    )}
                  </List.ItemTail>
                </List.Item>
              ))}
            </List>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}

export default RoutinePage;
