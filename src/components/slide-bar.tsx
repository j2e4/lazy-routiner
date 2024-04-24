import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react';

type SlideBarProps = React.PropsWithChildren<{
  show: boolean;
  direction?: 'horizontal' | 'vertical'; // TODO
  className?: string;
  onClose: (open?: boolean) => void;
}>;
export default function SlideBar({
  show,
  children,
  className,
  onClose,
}: SlideBarProps) {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pt-16">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="pointer-events-auto relative w-screen max-w-full md:max-w-sm">
              <div
                className={clsx(
                  'flex h-full flex-col overflow-y-auto px-5 py-3 shadow-xl',
                  className,
                )}
              >
                {children}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
