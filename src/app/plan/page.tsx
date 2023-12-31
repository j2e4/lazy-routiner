'use client';

import { ChevronRightIcon, PlusIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import Badge, { BadgeVariant } from 'src/components/badge';
import Button from 'src/components/button';
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

export default function PlanRoutine() {
  return (
    <main>
      <div className="flex justify-end px-6 pb-4">
        <Button
          variant="primary"
          rounded
          fullWidth
          disabled
          className="flex items-center justify-center gap-1 font-semibold"
        >
          <PlusIcon className="-ml-1 h-5 w-5" />
          루틴 등록하기
        </Button>
      </div>
      <RoutineList>
        {/*TODO*/}
        {false && (
          <RoutineList.Item center>
            <RoutineList.ItemBody>등록한 루틴이 없어요.</RoutineList.ItemBody>
          </RoutineList.Item>
        )}
        {MOCK_DATA.map(({ badge, ...routine }) => (
          <RoutineList.Item key={routine.id} between hoverable>
            <RoutineList.ItemHead>
              <Badge variant={badge.variant}>{badge.name}</Badge>
              <RoutineList.ItemBody>
                {({ ExpandedPane }) => (
                  <Link href="/plan">
                    {routine.name}
                    <ExpandedPane />
                  </Link>
                )}
              </RoutineList.ItemBody>
            </RoutineList.ItemHead>
            <RoutineList.ItemTail>
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            </RoutineList.ItemTail>
          </RoutineList.Item>
        ))}
      </RoutineList>
    </main>
  );
}
