'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import Button from 'src/components/button';
import Toast from 'src/components/toast';

type FormFooterProps = React.PropsWithChildren<{
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
}>;
function FormFooter({ onCancel }: FormFooterProps) {
  const { pending } = useFormStatus();
  const [submitBtnRef, setSubmitBtnRef] = useState<HTMLButtonElement | null>(
    null,
  );

  return (
    <>
      <div className="h-20" aria-hidden="true" />
      <div
        className={clsx(
          'absolute bottom-0 left-0 right-0 h-20 px-6',
          'flex items-center justify-end gap-x-6 border-t border-gray-900/10',
        )}
      >
        <Button size="md" variant="secondary" onClick={onCancel}>
          취소
        </Button>
        <Button
          type="submit"
          size="md"
          variant="primary"
          ref={setSubmitBtnRef}
          disabled={pending}
        >
          저장
        </Button>
        <Toast
          show={pending}
          variant="warn"
          options={{
            placement: 'top',
            reference: submitBtnRef,
          }}
          className="animate-bounce"
        >
          잠시만요, 저장하고 있어요.
        </Toast>
      </div>
    </>
  );
}

export default FormFooter;
