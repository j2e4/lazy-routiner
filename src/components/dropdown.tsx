import { Menu, MenuItemProps, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, type PropsWithChildren } from 'react';
import Button, { ButtonProps } from 'src/components/button';

function DropdownRoot({ children }: React.PropsWithChildren) {
  return (
    <Menu as="div" className="relative inline-block">
      {children}
    </Menu>
  );
}

function DropdownButton({ children, ...props }: ButtonProps) {
  return (
    <Menu.Button as={Fragment}>
      <Button {...props}>{children}</Button>
    </Menu.Button>
  );
}

function DropdownMenu({ children }: React.PropsWithChildren) {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items
        as="ul"
        // TODO flipped - Third-party 라이브러리 고려해보자. (참고: https://github.com/tailwindlabs/headlessui/issues/30)
        // https://floating-ui.com/
        // https://github.com/ycs77/headlessui-float
        className="absolute right-0 z-10 mt-1 w-auto origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        {children}
      </Menu.Items>
    </Transition>
  );
}

function DropdownItem<TTag extends React.ElementType>({
  children,
  disabled,
  ...props
}: PropsWithChildren<MenuItemProps<TTag>>) {
  return (
    <Menu.Item disabled={disabled} {...props}>
      {({ active }) => (
        <li
          className={clsx(
            'block whitespace-nowrap px-4 py-1.5 text-sm',
            disabled && 'cursor-default text-gray-400',
            !disabled && 'cursor-pointer',
            !disabled && {
              'bg-gray-100 text-gray-900': active,
              'text-gray-700': !active,
            },
          )}
        >
          {children}
        </li>
      )}
    </Menu.Item>
  );
}

const Dropdown = Object.assign(DropdownRoot, {
  Button: DropdownButton,
  Menu: DropdownMenu,
  Items: DropdownMenu,
  Item: DropdownItem,
});
export default Dropdown;
