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
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useState } from 'react';
import Button from 'src/components/button';

type NavItem = {
  name: string;
  slug: string;
  icon: typeof DocumentPlusIcon;
  description?: string;
  disabled?: boolean;
};
const NavItems: NavItem[] = [
  { name: '계획하기', slug: 'plan', icon: DocumentPlusIcon },
  {
    name: '실천하기',
    slug: 'routine',
    icon: DocumentCheckIcon,
  },
  { name: '점검하기', slug: 'statistics', icon: ChartPieIcon, disabled: true },
  { name: '설정하기', slug: 'setting', icon: Cog6ToothIcon, disabled: true },
];

export default function GlobalNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <header className="border-theme-neutral-330 bg-theme-neutral-350 fixed inset-x-0 top-0 z-50 flex h-16 border-b">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-4 md:px-5 lg:px-8">
        <div className="flex flex-1 items-center gap-x-6">
          {/* TODO buttons like go back */}
        </div>
        <div
          className={clsx('lg:static lg:block', {
            'bg-theme-neutral-350 fixed inset-x-0 bottom-0 top-14 mt-2 overflow-y-auto':
              isOpen,
          })}
        >
          <nav
            className={clsx(
              'md:flex md:gap-x-11 md:text-sm md:font-semibold md:leading-6 md:text-gray-900',
              {
                'space-y-2 px-5 pb-24 pt-3': isOpen,
                hidden: !isOpen,
              },
            )}
          >
            {NavItems.map((item) => (
              <GlobalNavItem key={item.slug} item={item} close={close} />
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-4">
          <Button variant="clear" className="-m-2" disabled>
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </Button>
          <Button
            variant="clear"
            className="-m-2 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

function GlobalNavItem({
  item: { name, slug, icon, disabled },
  close,
}: {
  item: NavItem;
  close: () => void;
}) {
  const Icon = icon;
  const segment = useSelectedLayoutSegment();
  const active = slug === segment;
  const selectable = !disabled && !active;

  return (
    <Link
      aria-disabled={disabled}
      href={`/${slug}`}
      className={clsx(
        '-mx-3 my-1.5 flex place-items-center gap-3 rounded-md p-3 text-base leading-7 md:gap-1.5',
        {
          'cursor-default text-gray-400': disabled,
          'hover:bg-theme-neutral-300/20 text-gray-500 hover:text-gray-600':
            selectable,
          'font-normal': !active,
          'font-medium text-gray-800': active,
        },
      )}
      onClick={(e) => {
        if (disabled) e.preventDefault();
        else close();
      }}
    >
      <Icon className="h-6 w-6" />
      {name}
    </Link>
  );
}
