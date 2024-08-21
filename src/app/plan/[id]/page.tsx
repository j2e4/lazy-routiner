import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { revalidateTag } from 'next/cache';
import { permanentRedirect } from 'next/navigation';
import PlanForm from 'src/app/plan/form';
import { putFetch } from 'src/services/fetch';
import { getCategories } from 'src/services/server-state/category';
import { getRoutine, Routine } from 'src/services/server-state/routine';

export default async function PlanIdPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  const routine: Routine = await getRoutine(id);
  async function update(formData: FormData) {
    'use server';

    const response = await putFetch(`/routine/${id}`, {
      id,
      name: formData.get('routiner-routine-name'),
      repeatDays: formData.getAll('routiner-repeat-days').map(Number),
      categoryId: formData.get('routiner-category-id'),
    });

    if (response.ok) {
      revalidateTag(id);
      revalidateTag('routines');
      permanentRedirect('/plan');
    } else throw new Error(await response.json());
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlanForm action={update} routine={routine} />
    </HydrationBoundary>
  );
}
