'use client';

import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Badge from 'src/components/badge';
import Button from 'src/components/button';
import Dialog from 'src/components/dialog';
import List from 'src/components/list';
import { getCategories } from 'src/services/server-state/category';
import SuspenseQueryBoundary from 'src/components/templates/SuspenseQueryBoundary';

function Categories() {
  const { data: categories = [] } = useSuspenseQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return categories.map((category) => (
    <List.Item key={category.id} hoverable>
      <List.ItemBody>
        {({ Filler }) => (
          <Link href={`/category/${category.id}`}>
            <Badge variant={category.theme}>{category.name}</Badge>
            <Filler />
          </Link>
        )}
      </List.ItemBody>
      <List.ItemTail className="inline-flex items-center">
        <ChevronRightIcon className="h-5 w-5 text-gray-400" />
      </List.ItemTail>
    </List.Item>
  ));
}

function SettingPage() {
  const router = useRouter();
  const [categoryListOpened, setCategoryListOpened] = useState(false);

  return (
    <main>
      <List border="b">
        <List.Item hoverable>
          <List.ItemBody>
            {({ Filler }) => (
              <List.ItemBodyText
                as="button"
                type="button"
                onClick={() => {
                  setCategoryListOpened(true);
                }}
              >
                루틴 카테고리 관리
                <Filler />
              </List.ItemBodyText>
            )}
          </List.ItemBody>
          <List.ItemTail className="inline-flex items-center">
            <ChevronRightIcon className="h-5 w-5 text-gray-400" />
          </List.ItemTail>
        </List.Item>
      </List>
      <Dialog open={categoryListOpened} onClose={setCategoryListOpened}>
        <Dialog.Header as="h3">루틴 카테고리 관리</Dialog.Header>
        <SuspenseQueryBoundary>
          <List border="y" className="h-48 overflow-y-auto">
            <Categories />
          </List>
        </SuspenseQueryBoundary>
        <Dialog.Footer className="mt-6 space-x-3 text-right">
          <Button
            size="md"
            variant="primary"
            onClick={() => {
              router.push('/category/new');
            }}
          >
            추가
          </Button>
          <Button
            size="md"
            variant="secondary"
            onClick={() => {
              setCategoryListOpened(false);
            }}
          >
            닫기
          </Button>
        </Dialog.Footer>
      </Dialog>
    </main>
  );
}

export default SettingPage;
