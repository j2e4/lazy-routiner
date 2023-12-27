import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

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
  secondary: 'ring-1 ring-inset ring-gray-300 ring-offset-0',
  clear: '',
};

const SIZE_STYLES = {
  md: 'p-2 text-sm',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof BUTTON_STYLES;
  size?: keyof typeof SIZE_STYLES;
  fullWidth?: boolean;
  rounded?: boolean;
}

export default function Button({
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth,
  rounded,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        {
          'block w-full': fullWidth,
          'rounded-md': rounded,
          [BUTTON_STYLES[variant]]: !disabled,
          [DISABLED_BUTTON_STYLES[variant]]: disabled,
        },
        BORDER_STYLES[variant],
        SIZE_STYLES[size],
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
