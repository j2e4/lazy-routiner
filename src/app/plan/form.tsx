'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Badge from 'src/components/badge';
import Button from 'src/components/button';
import Form from 'src/components/form';
import Toast from 'src/components/toast';
import { useCategories } from 'src/services/server-state/category';
import { Routine } from 'src/services/server-state/routine';

export type PlanFieldValues = {
  categoryId: string;
  repeatDays: string[];
  routineName: string;
};
interface PlanFormProps {
  action: SubmitHandler<PlanFieldValues>;
  routine?: Routine;
}

function PlanForm({ action, routine }: PlanFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<PlanFieldValues>({
    defaultValues: {
      categoryId: routine?.category.id,
      repeatDays: routine?.repeatDays.map(String),
      routineName: routine?.name,
    },
  });
  const onSubmit: SubmitHandler<PlanFieldValues> = async (plan) => {
    await action(plan);
  };

  type RefsMapKey = 'category' | 'days' | 'name';
  type RefsMap = Map<RefsMapKey, HTMLLegendElement | HTMLLabelElement>;
  const refs = useRef<RefsMap>();
  function getMap() {
    if (!refs.current) refs.current = new Map();
    return refs.current;
  }
  function setMap(
    key: RefsMapKey,
    node: HTMLLegendElement | HTMLLabelElement | null,
  ) {
    const map = getMap();
    if (node) map.set(key, node);
    else map.delete(key);
  }
  function getRef(key: RefsMapKey) {
    const map = getMap();
    return map.get(key) ?? null;
  }

  const categoriesQuery = useCategories();
  const categories = categoriesQuery.data ?? [];

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <Form.Legend ref={(node) => setMap('category', node)}>
          루틴 카테고리
        </Form.Legend>
        <div className="mt-4 space-y-4">
          {categories.map(({ id, name, theme }) => (
            <div key={id} className="flex items-center gap-x-3">
              <Form.InputRadio
                id={id}
                value={id}
                {...register('categoryId', { required: true })}
              />
              <Form.Label htmlFor={id}>
                <Badge variant={theme}>{name}</Badge>
              </Form.Label>
            </div>
          ))}
        </div>
        <Toast
          show={errors.categoryId !== undefined}
          variant="error"
          options={{
            placement: 'right',
            reference: getRef('category'),
          }}
        >
          하나 이상 선택해야 해요.
        </Toast>
      </fieldset>
      <fieldset>
        <Form.Legend ref={(node) => setMap('days', node)}>
          루틴을 반복할 요일
        </Form.Legend>
        <div className="mt-4 grid grid-cols-4 gap-x-6 gap-y-4 sm:grid-cols-7">
          {[
            { key: 'sun', label: '일', value: 7 },
            { key: 'mon', label: '월', value: 1 },
            { key: 'tue', label: '화', value: 2 },
            { key: 'wed', label: '수', value: 3 },
            { key: 'thu', label: '목', value: 4 },
            { key: 'fri', label: '금', value: 5 },
            { key: 'sat', label: '토', value: 6 },
          ].map(({ key, label, value }) => (
            <div key={key} className="flex items-center gap-x-3">
              <Form.InputCheckbox
                id={key}
                value={value}
                {...register('repeatDays', { required: true })}
              />
              <Form.Label htmlFor={key}>{label}</Form.Label>
            </div>
          ))}
          <Toast
            show={errors.repeatDays !== undefined}
            variant="error"
            options={{
              placement: 'right',
              reference: getRef('days'),
            }}
          >
            하나 이상 선택해야 해요.
          </Toast>
        </div>
      </fieldset>
      <div>
        <Form.Label htmlFor="routineName" ref={(node) => setMap('name', node)}>
          실천할 내용
        </Form.Label>
        <Form.InputText
          id="routineName"
          placeholder="자기 전에 일기 쓰기"
          className="mt-4"
          {...register('routineName', { required: true })}
        />
        <Toast
          show={errors.routineName !== undefined}
          variant="error"
          options={{
            placement: 'right',
            reference: getRef('name'),
          }}
        >
          빈 값일 수 없어요.
        </Toast>
      </div>
      <div
        className={clsx(
          'absolute bottom-0 left-0 right-0 h-20 px-6',
          'flex items-center justify-end gap-x-6 border-t border-gray-900/10',
        )}
      >
        <Button
          size="md"
          variant="secondary"
          onClick={() => {
            router.replace('/plan');
          }}
        >
          취소
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          onClick={() => {
            if (categories.length === 0)
              setError('categoryId', { type: 'required' });
          }}
        >
          저장
        </Button>
      </div>
      {/* form footer가 form content를 가리지 않도록 여백을 넣어준다. */}
      <div className="h-20" aria-hidden="true" />
    </Form>
  );
}

export default PlanForm;
