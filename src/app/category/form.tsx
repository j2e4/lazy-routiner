'use client';

import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Badge from 'src/components/badge';
import Button from 'src/components/button';
import Form from 'src/components/form';
import Toast from 'src/components/toast';
import { useDebounce } from 'src/hooks/useDebounce';
import { useRefs } from 'src/hooks/useRefs';
import { Category, CategoryTheme } from 'src/services/server-state/category';

const PLACEHOLDER = '건강';
const CATEGORY_THEMES: CategoryTheme[] = [
  'GRAY',
  'RED',
  'YELLOW',
  'GREEN',
  'BLUE',
  'INDIGO',
  'PURPLE',
  'PINK',
];

export type CategoryFieldValues = {
  name: string;
  theme: CategoryTheme;
};
interface CategoryFormProps {
  action: SubmitHandler<CategoryFieldValues>;
  category?: Category;
}

function CategoryForm({ action, category }: CategoryFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CategoryFieldValues>({
    defaultValues: {
      name: category?.name || '',
      theme: category?.theme || 'GRAY',
    },
  });
  const qc = useQueryClient();
  const onSubmit: SubmitHandler<CategoryFieldValues> = async (category) => {
    await action(category);
    await qc.invalidateQueries({
      queryKey: ['categories'],
    });
    router.back();
    // TODO pending 처리
    // TODO 에러 처리, 지금은 아무 동작하지 않는다.
  };
  const { getRef, setRef } = useRefs();
  const [badgeText, setBadgeText] = useDebounce(category?.name, 300);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Form.Label htmlFor="categoryName" ref={(node) => setRef('name', node)}>
          카테고리 이름
        </Form.Label>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange } }) => (
            <Form.InputText
              id="categoryName"
              placeholder={PLACEHOLDER}
              className="mt-4"
              defaultValue={category?.name || ''}
              onChange={(e) => {
                onChange(e);
                setBadgeText(e.target.value);
              }}
            />
          )}
          rules={{ required: true }}
        />
        <Toast
          show={errors.name !== undefined}
          variant="error"
          options={{
            placement: 'right',
            reference: getRef('name'),
          }}
        >
          빈 값일 수 없어요.
        </Toast>
      </div>
      <fieldset>
        <Form.Legend ref={(node) => setRef('theme', node)}>
          루틴 카테고리
        </Form.Legend>
        <div className="mt-4 space-y-4">
          {CATEGORY_THEMES.map((ct) => (
            <div key={ct} className="flex items-center gap-x-3">
              <Form.InputRadio
                id={ct}
                value={ct}
                {...register('theme', { required: true })}
              />
              <Form.Label htmlFor={ct}>
                <Badge variant={ct}>{badgeText || PLACEHOLDER}</Badge>
              </Form.Label>
            </div>
          ))}
        </div>
        <Toast
          show={errors.theme !== undefined}
          variant="error"
          options={{
            placement: 'right',
            reference: getRef('theme'),
          }}
        >
          하나 이상 선택해야 해요.
        </Toast>
      </fieldset>
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
            router.back();
          }}
        >
          취소
        </Button>
        <Button type="submit" variant="primary" size="md">
          저장
        </Button>
      </div>
      {/* form footer가 form content를 가리지 않도록 여백을 넣어준다. */}
      <div className="h-20" aria-hidden="true" />
    </Form>
  );
}

export default CategoryForm;
