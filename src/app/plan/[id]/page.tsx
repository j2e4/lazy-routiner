'use client';

import RoutinePlanForm from 'src/app/plan/form';
import { RoutineInput } from 'types/routine';

export default function RoutinePlanUpdatePage() {
  const handleSubmit = (input: RoutineInput) => {
    console.log('update', input);
  };

  return (
    <main>
      <RoutinePlanForm
        routine={{
          id: '1',
          name: '챌린저스 기상 미션하기',
          repeatDays: [1, 2, 3, 4, 5],
          categoryId: '1',
        }}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
