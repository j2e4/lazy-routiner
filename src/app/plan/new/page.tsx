import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { permanentRedirect } from 'next/navigation';
import PlanForm from 'src/app/plan/form';
import { postFetch } from 'src/services/fetch';
import { getCategories } from 'src/services/server-state/category';

export default async function PlanNewPage() {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  async function create(formData: FormData) {
    'use server';

    const response = await postFetch('/routine', {
      name: formData.get('routiner-routine-name'),
      repeatDays: formData.getAll('routiner-repeat-days').map(Number),
      categoryId: formData.get('routiner-category-id'),
    });
    if (response.ok) {
      permanentRedirect('/plan');
    } else throw new Error(await response.json());
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlanForm action={create} />
    </HydrationBoundary>
  );
}
