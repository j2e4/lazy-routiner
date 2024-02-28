import clsx from 'clsx';
import { forwardRef } from 'react';
import Button from 'src/components/button';

function FormRoot({
  children,
  ...props
}: React.PropsWithChildren<React.FormHTMLAttributes<HTMLFormElement>>) {
  return (
    <form {...props}>
      <div className="space-y-8 px-10 pt-8">{children}</div>
    </form>
  );
}

function FormInputText({
  id,
  name,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={clsx(
        'flex w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-theme-neutral-200',
        className,
      )}
    >
      <input
        type="text"
        id={id}
        name={name || id}
        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
        {...props}
      />
    </div>
  );
}

function FormInputCheckable({
  id,
  name,
  className,
  ...props
}: React.PropsWithChildren<React.InputHTMLAttributes<HTMLInputElement>>) {
  return (
    <input
      id={id}
      name={name || id}
      className={clsx(
        'h-4 w-4 border-gray-300 text-theme-neutral-200 focus:ring-theme-neutral-200',
        className,
      )}
      {...props}
    />
  );
}

function FormInputCheckbox({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <FormInputCheckable type="checkbox" className="rounded" {...props} />;
}

function FormInputRadio({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <FormInputCheckable type="radio" {...props} />;
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

function FormFooter({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className="h-20" aria-hidden="true" />
      <div
        className={clsx(
          'absolute bottom-0 left-0 right-0 h-20 px-6',
          'flex items-center justify-end gap-x-6 border-t border-gray-900/10',
        )}
      >
        {children}
        <Button type="submit" size="md" variant="primary">
          저장
        </Button>
      </div>
    </>
  );
}

const Form = Object.assign(FormRoot, {
  InputText: FormInputText,
  InputCheckbox: FormInputCheckbox,
  InputRadio: FormInputRadio,
  Label: forwardRef(FormLabel),
  Legend: forwardRef(FormLegend),
  Footer: FormFooter,
});
export default Form;
