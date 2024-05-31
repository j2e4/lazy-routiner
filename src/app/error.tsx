'use client';

import { useRouter } from 'next/navigation';
import Button from 'src/components/button';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <main className="text-center text-gray-900">
      <div className="my-8 space-y-2">
        <h2 className="my-8 text-6xl">
          {error.name === undefined && '888'}
          {error.name !== undefined && error.name}
        </h2>
        <p className="font-serif italic">{error.message}</p>
        <p>An unexpected error has occurred.</p>
      </div>
      <div className="space-x-2">
        <Button
          size="md"
          variant="secondary"
          onClick={() => router.replace('/')}
        >
          메인 페이지로 이동
        </Button>
        <Button size="md" variant="primary" onClick={() => reset()}>
          다시 시도
        </Button>
      </div>
    </main>
  );
}
