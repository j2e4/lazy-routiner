'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Badge from 'src/components/badge';
import Form from 'src/components/form';
import Toast from 'src/components/toast';
import { VALIDATION_TYPE, useInputReducer } from 'src/hooks/useInputReducer';
import { useCategories } from 'src/services/server-state/category';
import { Routine } from 'types/routine';

const RepeatDays = [
  { key: 'sun', label: '일', value: 7 },
  { key: 'mon', label: '월', value: 1 },
  { key: 'tue', label: '화', value: 2 },
  { key: 'wed', label: '수', value: 3 },
  { key: 'thu', label: '목', value: 4 },
  { key: 'fri', label: '금', value: 5 },
  { key: 'sat', label: '토', value: 6 },
];

interface RoutinePlanFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  initialCategoryId: string;
  routine?: Routine;
}
type OmittedRoutinePlanFormProps = Omit<RoutinePlanFormProps, 'onSubmit'>;

export default function RoutinePlanForm({
  initialCategoryId,
  routine,
  ...props
}: OmittedRoutinePlanFormProps) {
  const router = useRouter();

  const initialDays: { [key: number]: boolean } = {};
  routine?.repeatDays.forEach((day) => (initialDays[day] = true));

  const [category, categoryDispatcher] = useInputReducer(initialCategoryId, {
    type: VALIDATION_TYPE.NOT_EMPTY_STRING,
  });
  const [days, daysDispatcher] = useInputReducer(initialDays, {
    func: (v) => Object.values(v).some((b) => b),
  });
  const [name, nameDispatcher] = useInputReducer(routine?.name || '', {
    type: VALIDATION_TYPE.NOT_EMPTY_STRING,
  });

  const { data: categories = [], isPending } = useCategories();

  const queryClient = useQueryClient();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const invalid = [
      categoryDispatcher.validate(),
      daysDispatcher.validate(),
      nameDispatcher.validate(),
    ].some((b) => !b);

    if (invalid) {
      e.preventDefault();
      return;
    }
    return queryClient.invalidateQueries({ queryKey: ['routines'] });
  };

  return (
    <Form onSubmit={handleSubmit} {...props}>
      <fieldset>
        <Form.Legend ref={categoryDispatcher.setRef}>루틴 카테고리</Form.Legend>
        <Toast
          show={category.invalid}
          variant="error"
          options={{
            placement: 'right',
            reference: category.ref,
          }}
        >
          하나 이상 선택해야 해요.
        </Toast>
        <div className="mt-4 space-y-4">
          {isPending && (
            <div className="animate-pulse">
              <div className="h-3 rounded-lg bg-slate-200" />
            </div>
          )}
          {categories.map(({ id, name, theme }) => (
            <div key={id} className="flex items-center gap-x-3">
              <Form.InputRadio
                id={id}
                name="routiner-category-id"
                value={id}
                checked={category.value === id}
                onChange={(e) => {
                  categoryDispatcher.change(e.target.value);
                }}
              />
              <Form.Label htmlFor={id}>
                <Badge variant={theme}>{name}</Badge>
              </Form.Label>
            </div>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <Form.Legend ref={daysDispatcher.setRef}>
          루틴을 반복할 요일
        </Form.Legend>
        <Toast
          show={days.invalid}
          variant="error"
          options={{
            placement: 'right',
            reference: days.ref,
          }}
        >
          하나 이상 선택해야 해요.
        </Toast>
        <div className="mt-4 grid grid-cols-4 gap-x-6 gap-y-4 sm:grid-cols-7">
          {RepeatDays.map(({ key, label, value }) => (
            <div key={key} className="relative flex gap-x-3 sm:col-span-1">
              <div className="flex h-6 items-center">
                <Form.InputCheckbox
                  id={key}
                  name="routiner-repeat-days"
                  value={value}
                  checked={days.value[value] || false}
                  onChange={({ target: { value, checked } }) => {
                    daysDispatcher.change({
                      ...days.value,
                      [value]: checked,
                    });
                  }}
                />
              </div>
              <Form.Label htmlFor={key}>{label}</Form.Label>
            </div>
          ))}
        </div>
      </fieldset>
      <div>
        <Form.Label htmlFor="routiner-routine-name" ref={nameDispatcher.setRef}>
          실천할 내용
        </Form.Label>
        <Toast
          show={name.invalid}
          variant="error"
          options={{
            placement: 'right',
            reference: name.ref,
          }}
        >
          빈 값일 수 없어요.
        </Toast>
        <Form.InputText
          id="routiner-routine-name"
          placeholder="자기 전에 일기 쓰기"
          className="mt-4"
          value={name.value}
          onChange={(e) => {
            nameDispatcher.change(e.target.value);
          }}
        />
      </div>
    </Form>
  );
}
