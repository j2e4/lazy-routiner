'use client';

import clsx from 'clsx';
import type { PropsWithChildren, ReactNode } from 'react';
import HoverableProvider from 'src/contexts/hoverable/hoverable-provider';
import { useHoverable } from 'src/hooks/useHoverable';

function RoutineListRoot({ children }: PropsWithChildren) {
  return <ul className="divide-y border-y border-gray-200">{children}</ul>;
}

function RoutineItem({
  between,
  center,
  children,
  hoverable = false,
}: PropsWithChildren<{
  between?: boolean;
  center?: boolean;
  hoverable?: boolean;
}>) {
  return (
    <HoverableProvider hoverable={hoverable}>
      <li
        className={clsx('flex gap-x-6 px-3.5 py-5 md:px-8', {
          'justify-between': between,
          'justify-center': center,
          'relative hover:bg-gray-50': hoverable,
        })}
      >
        {children}
      </li>
    </HoverableProvider>
  );
}

function RoutineItemHead({ children }: PropsWithChildren) {
  return <div className="min-w-0 flex-auto space-y-1">{children}</div>;
}

type CallableChildren<T> = (args: T) => ReactNode;
type ExpandedPaneProps = { 'data-testid'?: string };
type RoutineItemBodyChildrenProps = {
  ExpandedPane: (props: ExpandedPaneProps) => ReactNode;
};
function RoutineItemBody({
  children,
}: {
  children?: ReactNode | CallableChildren<RoutineItemBodyChildrenProps>;
}) {
  const hoverable = useHoverable();
  const ExpandedPane = (props: ExpandedPaneProps) =>
    // 부모 element에 relative 스타일이 필요하기 때문에 hoverable 검사가 필요하다.
    hoverable && (
      <span className="absolute inset-x-0 -top-px bottom-0" {...props} />
    );

  return (
    <p className="truncate text-sm font-medium leading-6 text-gray-800">
      {typeof children === 'function' && children({ ExpandedPane })}
      {typeof children !== 'function' && children}
    </p>
  );
}

function RoutineItemTail({ children }: PropsWithChildren) {
  return <div className="flex shrink-0 items-center">{children}</div>;
}

export default Object.assign(RoutineListRoot, {
  Item: RoutineItem,
  ItemHead: RoutineItemHead,
  ItemBody: RoutineItemBody,
  ItemTail: RoutineItemTail,
});
