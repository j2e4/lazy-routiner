import { permanentRedirect } from 'next/navigation';
import RoutineCategoryForm from 'src/app/category/form';
import { postFetch } from 'src/services/fetch';
import { CategoryTheme } from 'types/category';

export default function RoutineCategoryCreatePage() {
  async function create(formData: FormData) {
    'use server';

    const response = await postFetch('/category', {
      name: formData.get('routiner-category-name') as string,
      theme: formData.get('routiner-routine-category') as CategoryTheme,
    });

    if (response.ok) {
      permanentRedirect('/setting');
    } else throw new Error(await response.json());
  }

  return (
    <main>
      <RoutineCategoryForm action={create} />
    </main>
  );
}
