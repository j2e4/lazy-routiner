'use client';

import { CheckIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import Badge, { BadgeVariant } from 'src/components/badge';
import Dropdown from 'src/components/dropdown';
import List from 'src/components/list';

const MOCK_DATA: {
  id: string;
  name: string;
  badge: { name: string; variant: BadgeVariant };
}[] = [
  {
    id: '1',
    name: '챌린저스 기상 미션하기',
    badge: { variant: 'BLUE', name: '생활' },
  },
  {
    id: '2',
    name: '뉴스레터 읽기',
    badge: { variant: 'YELLOW', name: '상식' },
  },
];

export default function RoutineToday() {
  return (
    <main>
      <List border="b">
        {/*TODO*/}
        {false && (
          <List.Item>
            <List.ItemBody className="text-center">
              <List.ItemBodyText>
                오늘 루틴을 모두 완료했어요.
              </List.ItemBodyText>
            </List.ItemBody>
          </List.Item>
        )}
        {MOCK_DATA.map(({ badge, ...routine }) => (
          <List.Item key={routine.id}>
            <List.ItemBody>
              <Badge variant={badge.variant}>{badge.name}</Badge>
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
