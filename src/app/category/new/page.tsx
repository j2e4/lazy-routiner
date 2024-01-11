'use client';

import RoutineCategoryForm from 'src/app/category/form';
import { CategoryInput } from 'types/category';

export default function RoutineCategoryCreatePage() {
  const handleSubmit = (input: CategoryInput) => {
    console.log('create', input);
  };

  return (
    <main>
      <RoutineCategoryForm onSubmit={handleSubmit} />
    </main>
  );
}
