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
import SlidePanel from 'src/components/slide-panel';

type NavItem = {
  name: string;
  slug: string;
  icon: typeof DocumentPlusIcon;
  description?: string;
  disabled?: boolean;
};
const NAV_ITEMS: NavItem[] = [
  { name: '계획하기', slug: 'plan', icon: DocumentPlusIcon },
  {
    name: '실천하기',
    slug: 'routine',
    icon: DocumentCheckIcon,
  },
  { name: '점검하기', slug: 'statistics', icon: ChartPieIcon, disabled: true },
  { name: '설정하기', slug: 'setting', icon: Cog6ToothIcon },
];

export default function GlobalNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 border-b border-theme-neutral-330 bg-theme-neutral-350">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-4 md:px-5 lg:px-8">
          <div className="flex flex-1 items-center gap-x-6">
            {/* TODO buttons like go back */}
          </div>
          <div className="flex flex-1 items-center justify-end gap-x-4">
            <Button size="md" variant="clear" className="-mx-3 -my-2" disabled>
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
            <Button
              size="md"
              variant="clear"
              className="-mx-3 -my-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Toggle main menu open</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </header>
      <SlidePanel
        show={isOpen}
        onClose={close}
        className="bg-theme-neutral-350"
      >
        <nav>
          {NAV_ITEMS.map((item) => (
            <GlobalNavItem key={item.slug} item={item} close={close} />
          ))}
        </nav>
      </SlidePanel>
    </>
  );
}

function GlobalNavItem({
  item: { name, slug, icon: Icon, disabled },
  close,
}: {
  item: NavItem;
  close: () => void;
}) {
  const segment = useSelectedLayoutSegment();
  const active = slug === segment;

  return (
    <Link
      aria-disabled={disabled}
      aria-selected={active}
      href={`/${slug}`}
      className={clsx(
        '-mx-3 my-1.5 flex place-items-center gap-3 rounded-md p-3 text-base leading-7 md:gap-1.5',
        {
          'text-active bg-theme-neutral-300/20': active,
          'font-normal': !active,
          'text-hover-disabled cursor-default': disabled,
          'text-hover-active hover:bg-theme-neutral-300/20': !disabled,
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
