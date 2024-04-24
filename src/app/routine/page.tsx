'use client';

import { CheckIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import Badge from 'src/components/badge';
import Dropdown from 'src/components/dropdown';
import List from 'src/components/list';
import { getFetch, postFetch } from 'src/services/fetch';
import { toDateStr } from 'src/utils/date-str';
import { ToCheckRoutine } from 'types/routine';

const ROUTINE_CHECKS = [
  { text: '완료하기', value: 1 },
  { text: '오늘은 건너뛰기', value: 2 },
  { text: '오늘 안 하기', value: 3 },
];

function getList(date: string): Promise<ToCheckRoutine[]> {
  return getFetch(`/daily?date=${date}`, {
    next: {
      tags: ['daily_routines'],
    },
  });
}

export default function RoutineToday() {
  const reqDateStr = toDateStr(new Date());
  const {
    data = [],
    isPending,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['daily_routines'],
    queryFn: () => getList(reqDateStr),
  });
  const routines = data.filter((routine) => Number(routine.routineCheck) === 0);

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
      <List border="b">
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
                  {ROUTINE_CHECKS.map(({ text, value }) => (
                    <Dropdown.ButtonItem
                      key={text}
                      onClick={() => update(routine.id, value)}
                    >
                      {text}
                    </Dropdown.ButtonItem>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
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
