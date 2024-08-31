import clsx from 'clsx';
import { forwardRef } from 'react';

type FormRootProps = React.PropsWithChildren<
  React.FormHTMLAttributes<HTMLFormElement>
>;
function FormRoot({ children, ...props }: FormRootProps) {
  return (
    <form {...props}>
      <div className="space-y-8 px-10 pt-8">{children}</div>
    </form>
  );
}

function FormInputText(
  { className, ...props }: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.LegacyRef<HTMLInputElement> | null,
) {
  return (
    <div
      className={clsx(
        'flex w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-theme-neutral-200',
        className,
      )}
    >
      <input
        ref={ref}
        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
        {...props}
      />
    </div>
  );
}

function FormInputCheckbox(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.LegacyRef<HTMLInputElement> | null,
) {
  return (
    <input
      type="checkbox"
      ref={ref}
      className="h-4 w-4 rounded border-gray-300 text-theme-neutral-200 focus:ring-theme-neutral-200"
      {...props}
    />
  );
}

function FormInputRadio(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.LegacyRef<HTMLInputElement> | null,
) {
  return (
    <input
      type="radio"
      ref={ref}
      className="h-4 w-4 border-gray-300 text-theme-neutral-200 focus:ring-theme-neutral-200"
      {...props}
    />
  );
}

function FormLabel(
  {
    children,
    ...props
  }: React.PropsWithChildren<React.LabelHTMLAttributes<HTMLLabelElement>>,
  ref: React.LegacyRef<HTMLLabelElement> | null,
) {
  return (
    <label
      className="inline-block text-sm font-medium leading-6 text-gray-900"
      ref={ref}
      {...props}
    >
      {children}
    </label>
  );
}

function FormLegend(
  {
    children,
    ...props
  }: React.PropsWithChildren<React.HTMLAttributes<HTMLLegendElement>>,
  ref: React.LegacyRef<HTMLLegendElement> | null,
) {
  return (
    <legend
      className="text-sm font-medium leading-6 text-gray-900"
      ref={ref}
      {...props}
    >
      {children}
    </legend>
  );
}

const Form = Object.assign(FormRoot, {
  InputText: forwardRef(FormInputText),
  InputCheckbox: forwardRef(FormInputCheckbox),
  InputRadio: forwardRef(FormInputRadio),
  Label: forwardRef(FormLabel),
  Legend: forwardRef(FormLegend),
});
export default Form;
