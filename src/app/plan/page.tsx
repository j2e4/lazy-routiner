'use client';

import { ChevronRightIcon, PlusIcon } from '@heroicons/react/20/solid';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Badge from 'src/components/badge';
import Button from 'src/components/button';
import List from 'src/components/list';
import { getFetch } from 'src/services/fetch';
import { Routine } from 'types/routine';

enum ExclusiveCase {
  Pending,
  Empty,
}

function getList(): Promise<Routine[]> {
  return getFetch('/routine', {
    next: {
      tags: ['routines'],
    },
  });
}

export default function PlanRoutineRootPage() {
  const router = useRouter();

  const { data: routines = [], isPending } = useQuery({
    queryKey: ['routines'],
    queryFn: getList,
  });
  const thisCase = [isPending, routines.length === 0].findIndex((v) => v);

  return (
    <main>
      <List border="b">
        {thisCase === ExclusiveCase.Pending && (
          <List.Item className="animate-pulse">
            <List.ItemBody className="my-1 space-y-5">
              <List.ItemBodyText className="h-3 rounded-lg bg-slate-200" />
              <List.ItemBodyText className="h-3 rounded-lg bg-slate-200" />
            </List.ItemBody>
            <List.ItemTail className="my-auto h-4 w-8 rounded-lg bg-slate-200" />
          </List.Item>
        )}
        {thisCase === ExclusiveCase.Empty && (
          <List.Item>
            <List.ItemBody>
              <List.ItemBodyText className="flex h-full items-center justify-center">
                등록한 루틴이 없어요.
              </List.ItemBodyText>
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
      <Button
        className="absolute bottom-0 right-0 m-4 rounded-full p-4"
        onClick={() => router.push('/plan/new')}
      >
        <PlusIcon className="h-8 w-8" />
      </Button>
    </main>
  );
}
