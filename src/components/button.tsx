import clsx from 'clsx';
import React, { forwardRef } from 'react';

const BUTTON_STYLES = {
  primary:
    'bg-theme-neutral-200 text-white hover:bg-theme-neutral-200/90 focus-visible:outline-theme-neutral-200',
  secondary:
    'bg-white text-gray-900 hover:bg-gray-50 focus-visible:outline-gray-300',
  clear: 'text-gray-500 hover:text-gray-600',
};

const DISABLED_BUTTON_STYLES = {
  primary: 'bg-theme-neutral-200/80 text-white',
  secondary: 'bg-gray-100 text-gray-400',
  clear: 'text-gray-400',
};

const BORDER_STYLES = {
  primary: 'shadow-sm',
  secondary: 'shadow-sm ring-1 ring-inset ring-gray-300',
  clear: '',
};

const SIZE_STYLES = {
  sm: 'p-1.5 text-xs',
  md: 'p-2 text-sm',
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof BUTTON_STYLES;
  size?: keyof typeof SIZE_STYLES;
  fullWidth?: boolean;
  rounded?: boolean;
  screenReader?: string;
}

function ButtonRoot(
  {
    type,
    variant = 'primary',
    size = 'md',
    fullWidth,
    rounded,
    screenReader,
    className,
    children,
    disabled,
    ...props
  }: ButtonProps,
  ref: React.LegacyRef<HTMLButtonElement> | null,
) {
  return (
    <button
      type={type || 'button'}
      disabled={disabled}
      className={clsx(
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        {
          'block w-full': fullWidth,
          'rounded-md': rounded,
        },
        disabled ? DISABLED_BUTTON_STYLES[variant] : BUTTON_STYLES[variant],
        BORDER_STYLES[variant],
        SIZE_STYLES[size],
        className,
      )}
      ref={ref}
      {...props}
    >
      {screenReader && <span className="sr-only">{screenReader}</span>}
      {children}
    </button>
  );
}

export default forwardRef(ButtonRoot);
