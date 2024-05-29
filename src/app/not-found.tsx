import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="text-center text-gray-900">
      <div className="my-8 space-y-2">
        <h2 className="my-8 text-6xl">404</h2>
        <p className="font-serif italic">Not Found</p>
        <p>This page could not be found.</p>
      </div>
      <Link href="/" className="btn btn-md btn-secondary">
        메인 페이지로 이동
      </Link>
    </main>
  );
}
