import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

const BUTTON_STYLES = {
  // TODO
  primary: '',
  secondary: '',
  clear: 'text-gray-500 hover:text-gray-600',
};
const DISABLED_BUTTON_STYLES = {
  // TODO
  primary: '',
  secondary: '',
  clear: 'text-gray-400',
};

const SIZE_STYLES = {
  md: 'p-2',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof BUTTON_STYLES;
  size?: keyof typeof SIZE_STYLES;
  fullWidth?: boolean;
}

export default function Button({
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth,
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
        SIZE_STYLES[size],
        {
          'block w-full': fullWidth,
          [BUTTON_STYLES[variant]]: !disabled,
          [DISABLED_BUTTON_STYLES[variant]]: disabled,
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
