import clsx from 'clsx';
import React, { forwardRef } from 'react';

const BUTTON_STYLES = {
  primary:
    'bg-theme-neutral-200 text-white hover:bg-theme-neutral-200/90 focus-visible:outline-theme-neutral-200',
  secondary:
    'bg-white text-gray-900 hover:bg-gray-50 focus-visible:outline-gray-300',
  clear: 'text-hover-active',
};

const DISABLED_BUTTON_STYLES = {
  primary: 'bg-theme-neutral-200/80 text-white',
  secondary: 'bg-gray-100 text-hover-disabled',
  clear: 'text-hover-disabled',
};

const BORDER_STYLES = {
  primary: 'shadow-sm',
  secondary: 'shadow-sm ring-1 ring-inset ring-gray-300',
  clear: '',
};

const SIZE_STYLES = {
  sm: 'p-1.5 text-xs',
  md: 'px-3 py-2 text-sm',
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof BUTTON_STYLES;
  size?: keyof typeof SIZE_STYLES;
}

function ButtonRoot(
  { type, variant, size, className, children, ...props }: ButtonProps,
  ref: React.LegacyRef<HTMLButtonElement> | null,
) {
  return (
    <button
      type={type || 'button'}
      className={clsx(
        size !== undefined && SIZE_STYLES[size],
        variant !== undefined && BORDER_STYLES[variant],
        variant !== undefined && {
          [BUTTON_STYLES[variant]]: !props.disabled,
          [DISABLED_BUTTON_STYLES[variant]]: props.disabled,
        },
        'rounded-md',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
}

export default forwardRef(ButtonRoot);
