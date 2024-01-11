import clsx from 'clsx';
import HoverableProvider from 'src/contexts/hoverable/hoverable-provider';
import { CallableChildren } from 'types/props';
import { useHoverable } from 'src/hooks/useHoverable';
import React from 'react';

type ListRootProps = React.PropsWithChildren<{
  border: 't' | 'b' | 'y';
}>;
function ListRoot({ border = 'y', children }: ListRootProps) {
  return (
    <ul
      className={clsx('divide-y border-gray-200', {
        'border-t': border === 't',
        'border-b': border === 'b',
        'border-y': border === 'y',
      })}
    >
      {children}
    </ul>
  );
}

type ListItemProps = React.PropsWithChildren<{
  hoverable?: boolean;
}>;
function ListItem({ children, hoverable = false }: ListItemProps) {
  return (
    <HoverableProvider hoverable={hoverable}>
      <li
        className={clsx('flex px-3.5 py-5 md:px-8', {
          'relative hover:bg-gray-50': hoverable,
        })}
      >
        {children}
      </li>
    </HoverableProvider>
  );
}

type ListItemBodyProps = {
  children:
    | React.ReactNode
    | CallableChildren<{ Filler: () => React.ReactNode }>;
};
type OmittedListItemBodyProps = ListItemBodyProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof ListItemBodyProps>;
function ListItemBody({ children, className }: OmittedListItemBodyProps) {
  const hoverable = useHoverable();
  const Filler = () =>
    // 부모 element에 relative 스타일이 필요하기 때문에 hoverable 검사가 필요하다.
    hoverable && <span className="absolute inset-x-0 -top-px bottom-0" />;

  return (
    <div className={clsx('flex-auto', className)}>
      {typeof children === 'function' && children({ Filler })}
      {typeof children !== 'function' && children}
    </div>
  );
}

// 참고: https://stackoverflow.com/questions/66049571/how-can-i-implement-a-as-prop-with-typescript-while-passing-down-the-props
type ListItemBodyTextProps<TTag extends React.ElementType> =
  React.PropsWithChildren<
    React.HTMLAttributes<TTag> & {
      as?: TTag;
    }
  >;
type OmittedListItemBodyTextProps<TTag extends React.ElementType> =
  ListItemBodyTextProps<TTag> &
    Omit<
      React.ComponentPropsWithoutRef<TTag>,
      keyof ListItemBodyTextProps<TTag>
    >;
function ListItemBodyText<TTag extends React.ElementType = 'p'>({
  as,
  children,
  className,
  ...props
}: OmittedListItemBodyTextProps<TTag>) {
  const BodyText = as ?? 'p';

  return (
    <BodyText
      className={clsx('text-sm font-medium leading-6 text-gray-800', className)}
      {...props}
    >
      {children}
    </BodyText>
  );
}

type ListItemTailProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {}
>;
function ListItemTail({ children, className }: ListItemTailProps) {
  return <div className={clsx('ml-6', className)}>{children}</div>;
}

export default Object.assign(ListRoot, {
  Item: ListItem,
  ItemBody: ListItemBody,
  ItemBodyText: ListItemBodyText,
  ItemTail: ListItemTail,
});
