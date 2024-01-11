'use client';

import RoutineCategoryForm from 'src/app/category/form';
import { CategoryInput } from 'types/category';

export default function RoutineCategoryUpdatePage() {
  const handleSubmit = (input: CategoryInput) => {
    console.log('update', input);
  };

  return (
    <main>
      <RoutineCategoryForm
        category={{
          id: '1',
          theme: 'blue',
          name: '생활',
        }}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
