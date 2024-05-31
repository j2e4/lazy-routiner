'use client';

import GlobalErrorFallback from 'src/components/templates/GlobalErrorFallback';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <GlobalErrorFallback
      // TODO API 응답 에러
      code={888}
      message={error.message}
      reset={reset}
    />
  );
}
