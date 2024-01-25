import { revalidateTag } from 'next/cache';
import { permanentRedirect } from 'next/navigation';
import RoutineCategoryForm from 'src/app/category/form';
import { getFetch, putFetch } from 'src/services/fetch';
import { CategoryTheme } from 'types/category';

export default async function RoutineCategoryUpdatePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const category = await getFetch(`/category/${id}`, {
    next: {
      tags: ['category', id],
    },
  });
  async function update(formData: FormData) {
    'use server';

    const response = await putFetch(`/category/${id}`, {
      id,
      name: formData.get('routiner-category-name') as string,
      theme: formData.get('routiner-routine-category') as CategoryTheme,
    });

    if (response.ok) {
      revalidateTag(id);
      revalidateTag('categories');
      permanentRedirect('/setting');
    } else throw new Error(await response.json());
  }

  return (
    <main>
      <RoutineCategoryForm action={update} category={category} />
    </main>
  );
}
