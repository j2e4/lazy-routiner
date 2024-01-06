'use client';

import { CheckIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import Badge, { BadgeVariant } from 'src/components/badge';
import Dropdown from 'src/components/dropdown';
import RoutineList from 'src/components/routine-list';

const MOCK_DATA: {
  id: string;
  name: string;
  badge: { name: string; variant: BadgeVariant };
}[] = [
  {
    id: '1',
    name: '챌린저스 기상 미션하기',
    badge: { variant: 'blue', name: '생활' },
  },
  {
    id: '2',
    name: '뉴스레터 읽기',
    badge: { variant: 'yellow', name: '상식' },
  },
];

export default function RoutineToday() {
  return (
    <main>
      <RoutineList>
        {/*TODO*/}
        {false && (
          <RoutineList.Item center>
            <RoutineList.ItemBody>
              오늘 루틴을 모두 완료했어요.
            </RoutineList.ItemBody>
          </RoutineList.Item>
        )}
        {MOCK_DATA.map(({ badge, ...routine }) => (
          <RoutineList.Item key={routine.id} between>
            <RoutineList.ItemHead>
              <Badge variant={badge.variant}>{badge.name}</Badge>
              <RoutineList.ItemBody>{routine.name}</RoutineList.ItemBody>
            </RoutineList.ItemHead>
            <RoutineList.ItemTail className="space-x-1">
              <Dropdown>
                <Dropdown.Button
                  variant="secondary"
                  size="sm"
                  rounded
                  screenReader="Update whether this routine is done or not"
                >
                  <CheckIcon
                    className="h-3.5 w-3.5 text-gray-400"
                    aria-hidden="true"
                  />
                </Dropdown.Button>
                <Dropdown.Menu>
                  {['완료하기', '오늘은 건너뛰기', '오늘 안 하기'].map(
                    (name) => (
                      <Dropdown.ButtonItem key={name}>
                        {name}
                      </Dropdown.ButtonItem>
                    ),
                  )}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Button
                  variant="secondary"
                  size="sm"
                  rounded
                  screenReader="Manage this routine"
                >
                  <EllipsisVerticalIcon
                    className="h-3.5 w-3.5 text-gray-400"
                    aria-hidden="true"
                  />
                </Dropdown.Button>
                <Dropdown.Menu>
                  <Dropdown.LinkItem href={`/plan/${routine.id}`}>
                    수정하기
                  </Dropdown.LinkItem>
                </Dropdown.Menu>
              </Dropdown>
            </RoutineList.ItemTail>
          </RoutineList.Item>
        ))}
      </RoutineList>
    </main>
  );
}
