'use client';

import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Badge from 'src/components/badge';
import Button from 'src/components/button';
import List from 'src/components/list';
import SuspenseQueryBoundary from 'src/components/templates/SuspenseQueryBoundary';
import { getFetch } from 'src/services/fetch';
import { Routine } from 'types/routine';

function PlanPage() {
  const router = useRouter();

  return (
    <main>
      <SuspenseQueryBoundary>
        <List border="b">
          <Plans />
        </List>
      </SuspenseQueryBoundary>
      <div className="py-5 text-center">
        <Button
          variant="secondary"
          size="md"
          onClick={() => router.push('/plan/new')}
        >
          새 루틴 추가하기
        </Button>
      </div>
    </main>
  );
}

function Plans() {
  const { data: routines = [] } = useSuspenseQuery<Routine[]>({
    queryKey: ['routines'],
    queryFn: () =>
      getFetch('/routine', {
        next: {
          tags: ['routines'],
        },
      }),
  });

  return routines.map(({ category, ...routine }) => (
    <List.Item key={routine.id} hoverable>
      <List.ItemBody>
        {({ Filler }) => (
          <>
            <Badge variant={category.theme}>{category.name}</Badge>
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
  ));
}

export default PlanPage;
