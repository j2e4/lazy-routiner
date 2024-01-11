import React, { Fragment, useState } from 'react';
import {
  Dialog,
  DialogProps,
  DialogTitleProps,
  MenuItemProps,
  Transition,
} from '@headlessui/react';
import Button from 'src/components/button';
import { CallableChildren } from 'types/props';
import clsx from 'clsx';

type DialogRootProps = React.PropsWithChildren<{
  open: boolean;
  onClose(value: boolean): void;
}>;
function DialogRoot({ open, children, ...props }: DialogRootProps) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" {...props}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

type DialogHeaderProps<TTag extends React.ElementType> =
  React.PropsWithChildren<{ className?: string } & DialogTitleProps<TTag>>;
function DialogHeader<TTag extends React.ElementType>({
  children,
  className,
  ...props
}: DialogHeaderProps<TTag>) {
  return (
    <Dialog.Title
      className={clsx(
        'mb-6 text-lg font-medium leading-6 text-gray-900',
        className,
      )}
      {...props}
    >
      {children}
    </Dialog.Title>
  );
}

type DialogActionProps = React.PropsWithChildren<{ className?: string }>;
function DialogFooter({ children, className }: DialogActionProps) {
  return <div className={clsx('mt-6', className)}>{children}</div>;
}

export default Object.assign(DialogRoot, {
  Header: DialogHeader,
  Footer: DialogFooter,
});
