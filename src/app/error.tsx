'use client';

import GlobalErrorFallback from 'src/components/templates/GlobalErrorFallback';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <GlobalErrorFallback message={error.message} reset={reset} />;
}
