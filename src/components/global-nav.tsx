'use client';

import {
  BellIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentCheckIcon,
  DocumentPlusIcon,
} from '@heroicons/react/24/outline';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useState } from 'react';
import Button from 'src/components/button';
import SlideBar from 'src/components/slide-bar';

const NAV_ITEMS = [
  { name: '계획하기', slug: 'plan', icon: DocumentPlusIcon },
  {
    name: '실천하기',
    slug: 'routine',
    icon: DocumentCheckIcon,
  },
  { name: '점검하기', slug: 'statistics', icon: ChartPieIcon, disabled: true },
  { name: '설정하기', slug: 'setting', icon: Cog6ToothIcon },
];

function GlobalNavRoot() {
  const [opened, setOpened] = useState(false);
  const close = () => {
    setOpened(false);
  };

  const segment = useSelectedLayoutSegment();

  return (
    <>
      <header className="flex h-full items-center justify-between px-4 md:px-8">
        <div className="flex flex-1 justify-end gap-x-4">
          <Button size="md" variant="clear" className="-mx-3 -my-2" disabled>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
            <span className="sr-only">View notifications</span>
          </Button>
          <Button
            size="md"
            variant="clear"
            className="-mx-3 -my-2"
            onClick={() => {
              setOpened((show) => !show);
            }}
          >
            {opened ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
            <span className="sr-only">Toggle main menu open</span>
          </Button>
        </div>
      </header>
      <GlobalNavBar show={opened} onClose={close}>
        {NAV_ITEMS.map(({ icon: Icon, ...item }) => (
          <GlobalNavItem
            key={item.slug}
            href={`/${item.slug}`}
            selected={item.slug === segment}
            disabled={item.disabled}
            className="flex place-items-center gap-3 md:gap-1.5"
            onClick={close}
          >
            <Icon className="h-6 w-6" aria-hidden="true" />
            {item.name}
          </GlobalNavItem>
        ))}
      </GlobalNavBar>
    </>
  );
}

type GlobalNavBarProps = React.PropsWithChildren<{
  show: boolean;
  onClose: (open?: boolean) => void;
}>;

function GlobalNavBar({ children, ...props }: GlobalNavBarProps) {
  return (
    <SlideBar className="bg-theme-neutral-350" {...props}>
      <nav>{children}</nav>
    </SlideBar>
  );
}

type GlobalNavItemProps = React.PropsWithChildren<
  LinkProps & {
    disabled?: boolean;
    selected?: boolean;
    className?: string;
  }
>;

function GlobalNavItem({
  href,
  selected,
  disabled,
  className,
  onClick,
  children,
}: GlobalNavItemProps) {
  return (
    <Link
      href={href}
      aria-selected={selected}
      aria-disabled={disabled}
      className={clsx(
        '-mx-3 my-1.5 rounded-md p-3 text-base leading-7',
        {
          'text-active bg-theme-neutral-300/20': selected,
          'font-normal': !selected,
          'text-hover-disabled cursor-default': disabled,
          'text-hover-active hover:bg-theme-neutral-300/20': !disabled,
        },
        className,
      )}
      onClick={(e) => {
        if (disabled) e.preventDefault();
        else if (onClick !== undefined) onClick(e);
      }}
    >
      {children}
    </Link>
  );
}

export default Object.assign(GlobalNavRoot, {
  Bar: GlobalNavBar,
  Item: GlobalNavItem,
});
