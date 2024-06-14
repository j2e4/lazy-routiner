import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import Button from 'src/components/button';

function SuspenseFallback() {
  return (
    <div className="relative h-32">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="animate-ping-slow">
            <div className="h-1.5 w-1.5 rounded-full bg-theme-neutral-300 shadow-sm" />
          </div>
          <div className="animate-delay-300 animate-ping-slow">
            <div className="h-1.5 w-1.5 rounded-full bg-theme-neutral-300 shadow-sm" />
          </div>
          <div className="animate-delay-600 animate-ping-slow">
            <div className="h-1.5 w-1.5 rounded-full bg-theme-neutral-300 shadow-sm" />
          </div>
        </div>
      </div>
      <p className="sr-only">데이터를 불러오는 중입니다.</p>
    </div>
  );
}

function ErrorFallback({
  // error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className="flex h-32 flex-col items-center justify-center gap-3">
      <div className="text-center tracking-tight">
        <p>잠시 후 다시 시도해주세요.</p>
        <p>이용에 불편을 드려 죄송합니다.</p>
      </div>
      <div>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            resetErrorBoundary();
          }}
        >
          다시 시도
        </Button>
      </div>
    </div>
  );
}

export default function SuspenseQueryBoundary({
  children,
}: React.PropsWithChildren) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
          <Suspense fallback={<SuspenseFallback />}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
