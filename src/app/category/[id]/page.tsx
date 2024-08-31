import { revalidateTag } from 'next/cache';
import RoutineCategoryForm, {
  CategoryFieldValues,
} from 'src/app/category/form';
import {
  Category,
  getCategory,
  updateCategory,
} from 'src/services/server-state/category';

export default async function CategoryIdPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const category: Category = await getCategory(id);

  async function update(formData: CategoryFieldValues) {
    'use server';

    await updateCategory(id, formData);
    revalidateTag(id);
  }

  return <RoutineCategoryForm action={update} category={category} />;
}
