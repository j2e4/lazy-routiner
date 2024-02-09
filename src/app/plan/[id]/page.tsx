import { revalidateTag } from 'next/cache';
import { permanentRedirect } from 'next/navigation';
import RoutinePlanForm from 'src/app/plan/form';
import { getFetch, putFetch } from 'src/services/fetch';
import { Routine } from 'types/routine';

export default async function RoutinePlanUpdatePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const routine: Routine = await getFetch(`/routine/${id}`, {
    next: {
      tags: ['routine', id],
    },
  });
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
    <main>
      <RoutinePlanForm
        action={update}
        initialCategoryId={routine.category.id}
        routine={routine}
      />
    </main>
  );
}
