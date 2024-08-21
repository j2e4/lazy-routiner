import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { revalidateTag } from 'next/cache';
import { permanentRedirect } from 'next/navigation';
import PlanForm, { PlanFieldValues } from 'src/app/plan/form';
import { getCategories } from 'src/services/server-state/category';
import {
  getRoutine,
  Routine,
  updateRoutine,
} from 'src/services/server-state/routine';

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

  async function update(formData: PlanFieldValues) {
    'use server';

    await updateRoutine(id, {
      name: formData.routineName,
      repeatDays: formData.repeatDays.map(Number),
      categoryId: formData.categoryId,
    });
    revalidateTag(id);
    revalidateTag('routines');
    permanentRedirect('/plan');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlanForm action={update} routine={routine} />
    </HydrationBoundary>
  );
}
