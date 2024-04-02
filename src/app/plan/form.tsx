'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Badge from 'src/components/badge';
import Form from 'src/components/form';
import Toast from 'src/components/toast';
import { useInputReducer } from 'src/hooks/useInputReducer';
import { getCategories } from 'src/services/server-state/category';
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

type RoutinePlanFormProps = {
  initialCategoryId: string;
  routine?: Routine;
} & React.FormHTMLAttributes<HTMLFormElement>;
export default function RoutinePlanForm({
  initialCategoryId,
  routine,
  onSubmit,
  ...props
}: RoutinePlanFormProps) {
  const router = useRouter();

  const { data: categories = [], isPending } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const initialDays: { [key: number]: boolean } = {};
  const initialName = routine?.name || '';
  routine?.repeatDays.forEach((day) => (initialDays[day] = true));

  const [category, categoryDispatcher] = useInputReducer<
    string,
    HTMLLegendElement
  >(initialCategoryId);
  const [days, daysDispatcher] = useInputReducer<
    { [key: number]: boolean },
    HTMLLegendElement
  >(initialDays);
  const [name, nameDispatcher] = useInputReducer<string, HTMLLabelElement>(
    initialName,
  );

  const validate = () => {
    return [
      categoryDispatcher.validate((v) => v !== ''),
      daysDispatcher.validate((v) => {
        for (const day in v)
          if (v[day]) {
            return true;
          }
        return false;
      }),
      nameDispatcher.validate((v) => v !== ''),
    ].every((valid) => valid);
  };

  const queryClient = useQueryClient();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!validate()) {
      e.preventDefault();
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ['routines'],
    });
    if (onSubmit !== undefined) onSubmit(e);
  };

  return (
    <Form onCancel={router.back} onSubmit={handleSubmit} {...props}>
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
