'use client';

import { useRouter } from 'next/navigation';
import { ChevronRightIcon, PlusIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import Badge, { BadgeVariant } from 'src/components/badge';
import Button from 'src/components/button';
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

export default function PlanRoutine() {
  const router = useRouter();

  return (
    <main>
      <List border="b">
        {/*TODO*/}
        {false && (
          <List.Item>
            <List.ItemBody className="text-center">
              <List.ItemBodyText>등록한 루틴이 없어요.</List.ItemBodyText>
            </List.ItemBody>
          </List.Item>
        )}
        {MOCK_DATA.map(({ badge, ...routine }) => (
          <List.Item key={routine.id} hoverable>
            <List.ItemBody>
              {({ Filler }) => (
                <>
                  <Badge variant={badge.variant}>{badge.name}</Badge>
                  <List.ItemBodyText
                    as={Link}
                    href={`/plan/${routine.id}`}
                    className="mt-1 block"
                  >
                    {routine.name}
                    <Filler />
                  </List.ItemBodyText>
                </>
              )}
            </List.ItemBody>
            <List.ItemTail className="inline-flex items-center">
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            </List.ItemTail>
          </List.Item>
        ))}
      </List>
      <Button
        className="absolute bottom-0 right-0 m-4 rounded-full p-4"
        onClick={() => router.push('/plan/new')}
      >
        <PlusIcon className="h-8 w-8" />
      </Button>
    </main>
  );
}
