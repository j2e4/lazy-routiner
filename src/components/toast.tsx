import { offset, useFloating } from '@floating-ui/react';
import type { Placement } from '@floating-ui/utils';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import { createPortal } from 'react-dom';

const Body = {
  warn: 'bg-amber-300 text-slate-900',
  error: 'bg-red-500 text-slate-50',
};

type ToastProps = React.PropsWithChildren<{
  show: boolean;
  variant: 'warn' | 'error';
  options: {
    placement: Placement;
    reference: Element | null;
  };
  className?: string;
}>;

export default function Toast({
  show,
  variant,
  options,
  className,
  children,
}: ToastProps) {
  const { floatingStyles, y, refs } = useFloating({
    placement: options.placement,
    middleware: [
      offset({
        mainAxis: 10,
      }),
    ],
    elements: options && {
      reference: options.reference,
    },
  });
  const [trans, setTrans] = useState(false);

  // 안 보여야 하고 트랜지션 안 기다려도 되면 null
  if (!show && !trans) return null;
  return createPortal(
    <div
      role="alert"
      ref={refs.setFloating}
      style={floatingStyles}
      className="z-50"
    >
      <Transition
        show={show}
        as={Fragment}
        appear={true}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-3"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-3"
        beforeEnter={() => {
          setTrans(true);
        }}
        afterLeave={() => {
          setTrans(false);
        }}
      >
        <div
          className={clsx(
            'inline-flex items-center rounded-3xl px-3 py-1 text-xs',
            Body[variant],
            className,
          )}
        >
          {children}
        </div>
      </Transition>
    </div>,
    document.body,
  );
}
