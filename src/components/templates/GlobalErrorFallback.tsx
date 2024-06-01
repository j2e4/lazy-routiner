'use client';

import Link from 'next/link';
import Button from 'src/components/button';

const ErrorDescription = {
  400: '잘못된 요청입니다.',
  401: '권한이 없습니다.',
  403: '접근이 금지되었습니다.',
  404: '요청하신 페이지를 찾을 수 없습니다.',
  408: '요청 시간이 초과되었습니다.',
  500: '서버에 오류가 발생했습니다.',
  502: '서버가 다운되었습니다.',
  503: '서비스를 사용할 수 없습니다.',
  504: '게이트웨이 타임아웃입니다.',
};

type GlobalErrorFallbackProps = {
  code?: keyof typeof ErrorDescription;
  message: string;
  description?: string;
  reset?: () => void;
};

export default function GlobalErrorFallback({
  code,
  message,
  reset,
}: GlobalErrorFallbackProps) {
  return (
    <main className="text-center text-gray-900">
      <div className="my-8 space-y-2">
        <h2 className="my-8 text-6xl">{code}</h2>
        <p className="font-serif italic">{message}</p>
        <p className="tracking-tight">
          {code !== undefined && ErrorDescription[code]}
          {code === undefined && '알 수 없는 오류가 발생했습니다.'}
        </p>
      </div>
      <div className="space-x-2">
        <Link href="/" className="btn btn-md btn-secondary inline-block">
          메인 페이지로 이동
        </Link>
        {reset !== undefined && (
          <Button size="md" variant="primary" onClick={reset}>
            다시 시도
          </Button>
        )}
      </div>
    </main>
  );
}
