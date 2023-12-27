import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

function RoutineListRoot({ children }: PropsWithChildren) {
  return <ul className="divide-y border-y border-gray-200">{children}</ul>;
}

function RoutineItem({
  between,
  center,
  children,
}: PropsWithChildren<{ between?: boolean; center?: boolean }>) {
  return (
    <li
      className={clsx(
        'relative flex gap-x-6 px-3.5 py-5 hover:bg-gray-50 md:px-8',
        {
          'justify-between': between,
          'justify-center': center,
        },
      )}
    >
      {children}
    </li>
  );
}

function RoutineItemHead({ children }: PropsWithChildren) {
  return <div className="min-w-0 flex-auto space-y-1">{children}</div>;
}

function RoutineItemBody({ children }: PropsWithChildren) {
  return (
    <p className="truncate text-sm font-medium leading-6 text-gray-800">
      {children}
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
