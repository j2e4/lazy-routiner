import { ChevronRightIcon, PlusIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import Badge from 'src/components/badge';
import Button from 'src/components/button';

export default function PlanRoutine() {
  return (
    <main>
      <div className="flex justify-end px-6 pb-4">
        <Button
          variant="primary"
          rounded
          fullWidth
          disabled
          className="flex items-center justify-center gap-1 font-semibold"
        >
          <PlusIcon className="-ml-1 h-5 w-5" />
          루틴 등록하기
        </Button>
      </div>
      <ul className="divide-y border-y border-gray-200">
        <li className="relative flex justify-between gap-x-6 px-3.5 py-5 hover:bg-gray-50 md:px-8">
          <div className="min-w-0 flex-auto">
            <Badge variant="blue">생활</Badge>
            <p className="mt-1 truncate text-sm font-medium leading-6 text-gray-800">
              <Link href="/plan/new">
                챌린저스 기상 미션하기
                <span className="absolute inset-x-0 -top-px bottom-0"></span>
              </Link>
            </p>
          </div>
          <div className="flex shrink-0 items-center">
            <ChevronRightIcon className="h-5 w-5 text-gray-400" />
          </div>
        </li>
        {/*TODO*/}
        {false && (
          <li className="px-3.5 py-5 md:px-8">
            <p className="text-center text-sm leading-6 text-gray-800">
              등록한 루틴이 없어요.
            </p>
          </li>
        )}
      </ul>
    </main>
  );
}
