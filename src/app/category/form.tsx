'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import Badge, { BADGE_STYLES, BadgeVariant } from 'src/components/badge';
import Form from 'src/components/form';
import Toast from 'src/components/toast';
import { useInputReducer } from 'src/hooks/useInputReducer';
import { Category, CategoryTheme } from 'types/category';

const PLACEHOLDER = '건강';
const BADGE_VARIANTS = Object.keys(BADGE_STYLES) as BadgeVariant[];

type RoutineCategoryFormProps = {
  category?: Category;
} & React.FormHTMLAttributes<HTMLFormElement>;
export default function RoutineCategoryForm({
  category,
  onSubmit,
  ...props
}: RoutineCategoryFormProps) {
  const router = useRouter();

  const [name, nameDispatcher] = useInputReducer<string, HTMLLabelElement>(
    category?.name || '',
  );
  const [theme, themeDispatcher] = useInputReducer<
    CategoryTheme,
    HTMLLegendElement
  >(category?.theme || BADGE_VARIANTS[0]);

  const [preview, setPreview] = useState(category?.name || PLACEHOLDER);
  const previewTimeoutId = useRef<NodeJS.Timeout>();

  const handleChangeName = (value: string) => {
    nameDispatcher.change(value);

    if (previewTimeoutId.current !== undefined)
      clearTimeout(previewTimeoutId.current);
    previewTimeoutId.current = setTimeout(() => {
      setPreview(value || PLACEHOLDER);
      previewTimeoutId.current = undefined;
    }, 300);
  };

  const validate = () => {
    return [
      nameDispatcher.validate((v) => v !== ''),
      themeDispatcher.validate((v) => BADGE_VARIANTS.includes(v)),
    ].every((valid) => valid);
  };

  const queryClient = useQueryClient();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!validate()) {
      e.preventDefault();
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ['categories'],
    });
    if (onSubmit !== undefined) onSubmit(e);
  };

  return (
    <Form onCancel={router.back} onSubmit={handleSubmit} {...props}>
      <div>
        <Form.Label
          htmlFor="routiner-category-name"
          ref={nameDispatcher.setRef}
        >
          카테고리 이름
        </Form.Label>
        <Form.InputText
          id="routiner-category-name"
          placeholder={PLACEHOLDER}
          value={name.value}
          className="mt-4"
          onChange={(e) => {
            handleChangeName(e.target.value);
          }}
        />
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
      </div>
      <fieldset>
        <Form.Legend ref={themeDispatcher.setRef}>루틴 카테고리</Form.Legend>
        <div className="mt-4 space-y-4">
          {BADGE_VARIANTS.map((badge) => (
            <div key={badge} className="flex items-center gap-x-3">
              <Form.InputRadio
                id={badge}
                name="routiner-routine-category"
                value={badge}
                checked={theme.value === badge}
                onChange={(e) => {
                  const newTheme = e.target.value as CategoryTheme;
                  themeDispatcher.change(newTheme);
                }}
              />
              <Form.Label htmlFor={badge}>
                <Badge variant={badge}>{preview}</Badge>
              </Form.Label>
            </div>
          ))}
        </div>
        <Toast
          show={theme.invalid}
          variant="error"
          options={{
            placement: 'right',
            reference: theme.ref,
          }}
        >
          하나 이상 선택해야 해요.
        </Toast>
      </fieldset>
    </Form>
  );
}
