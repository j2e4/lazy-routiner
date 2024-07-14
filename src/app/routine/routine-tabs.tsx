'use client';

import { Tab } from '@headlessui/react';
import { CheckIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useState } from 'react';
import Badge from 'src/components/badge';
import Dropdown from 'src/components/dropdown';
import List from 'src/components/list';
import { useUpdateRoutineCheck } from 'src/services/server-state/routine';
import {
  CheckOption,
  DAILY_ROUTINE_TABS,
  DailyRoutineTab,
  useRoutineTabs,
} from 'src/services/server-state/routine-tabs';

function RoutineTabs() {
  const [tabIndex, setTabIndex] = useState(0);
  const { data: tabs = DAILY_ROUTINE_TABS } = useRoutineTabs();

  return (
    <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
      <Tab.List className="-mb-px flex justify-between px-6 md:justify-normal md:space-x-6 md:px-8">
        {tabs.map((tab) => (
          <TabByCheck
            key={tab.id}
            name={tab.name}
            count={tab.routines?.length || 0}
          />
        ))}
      </Tab.List>
      <Tab.Panels>
        {tabs.map((tab) => (
          <Tab.Panel key={tab.id}>
            <RoutinesByCheck tab={tab} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}

function TabByCheck({ name, count }: { name: string; count: number }) {
  return (
    <Tab
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
          {name}
          <span
            className={clsx(
              'ml-3 rounded-full px-2.5 py-0.5 text-xs font-medium',
              selected && 'bg-theme-neutral-100',
              !selected && 'bg-gray-100 text-gray-900',
            )}
          >
            {count}
          </span>
        </>
      )}
    </Tab>
  );
}

function RoutinesByCheck({ tab }: { tab: DailyRoutineTab }) {
  const { routines = [] } = tab;
  const { mutate } = useUpdateRoutineCheck();

  return (
    <List>
      {routines.length === 0 && (
        <List.Item>
          <List.ItemBody className="text-center">
            <List.ItemBodyText>{tab.emptyMessage}</List.ItemBodyText>
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
                  {[
                    { name: '완료하기', value: CheckOption.Checked },
                    { name: '오늘은 건너뛰기', value: CheckOption.Skipped },
                    { name: '오늘 안 하기', value: CheckOption.NoCheck },
                  ].map(({ name, value }) => (
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
  );
}

export default RoutineTabs;
