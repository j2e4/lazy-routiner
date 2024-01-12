'use client';

import RoutinePlanForm from 'src/app/plan/form';
import { RoutineInput } from 'types/routine';

export default function RoutinePlanCreatePage() {
  const handleSubmit = (input: RoutineInput) => {
    console.log('create', input);
  };

  return (
    <main>
      <RoutinePlanForm onSubmit={handleSubmit} />
    </main>
  );
}
