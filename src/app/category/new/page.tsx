import RoutineCategoryForm, {
  CategoryFieldValues,
} from 'src/app/category/form';
import { createCategory } from 'src/services/server-state/category';

export default function CategoryNewPage() {
  async function create(formData: CategoryFieldValues) {
    'use server';

    await createCategory(formData);
  }

  return <RoutineCategoryForm action={create} />;
}
