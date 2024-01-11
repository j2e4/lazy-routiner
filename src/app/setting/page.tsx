'use client';

import { ChevronRightIcon } from '@heroicons/react/20/solid';
import List from 'src/components/list';

export default function SettingRootPage() {
  return (
    <main>
      <List border="b">
        <List.Item hoverable>
          <List.ItemBody>
            {({ Filler }) => (
              <List.ItemBodyText as="button" type="button">
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
    </main>
  );
}
