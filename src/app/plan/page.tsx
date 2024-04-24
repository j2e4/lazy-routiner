'use client';

import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Badge from 'src/components/badge';
import Button from 'src/components/button';
import List from 'src/components/list';
import { getFetch } from 'src/services/fetch';
import { Routine } from 'types/routine';

function getList(): Promise<Routine[]> {
  return getFetch('/routine', {
    next: {
      tags: ['routines'],
    },
  });
}

export default function PlanRoutineRootPage() {
  const router = useRouter();

  const {
    data: routines = [],
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ['routines'],
    queryFn: getList,
  });
  const isEmpty = isSuccess && routines.length === 0;

  let displayMessage = '';
  if (isPending) displayMessage = '루틴을 불러오는 중이에요.';
  else if (isEmpty) displayMessage = '등록한 루틴이 없어요.';

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
        ))}
      </List>
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
