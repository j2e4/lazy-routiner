import { permanentRedirect } from 'next/navigation';
import RoutinePlanForm from 'src/app/plan/form';
import { postFetch } from 'src/services/fetch';

export default function RoutinePlanCreatePage() {
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
    <RoutinePlanForm
      action={create}
      initialCategoryId={process.env.DEFAULT_CATEGORY_ID || ''}
    />
  );
}
