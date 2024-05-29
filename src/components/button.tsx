import clsx from 'clsx';
import React, { forwardRef } from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md';
  variant?: 'primary' | 'secondary' | 'clear';
  squared?: boolean;
}

function ButtonRoot(
  { type, variant, size, squared, className, children, ...props }: ButtonProps,
  ref: React.LegacyRef<HTMLButtonElement> | null,
) {
  return (
    <button
      type={type || 'button'}
      className={clsx(
        'btn',
        {
          'btn-sm': size === 'sm',
          'btn-md': size === 'md',
          'btn-primary': variant === 'primary',
          'btn-secondary': variant === 'secondary',
          'btn-clear': variant === 'clear',
          'btn-squared': squared,
        },
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
