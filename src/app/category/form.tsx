'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Badge from 'src/components/badge';
import Form from 'src/components/form';
import Toast from 'src/components/toast';
import { useDebounce } from 'src/hooks/useDebounce';
import { VALIDATION_TYPE, useInputReducer } from 'src/hooks/useInputReducer';
import { Category, CategoryTheme } from 'types/category';

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

interface RoutineCategoryFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  category?: Category;
}
type OmittedRoutineCategoryFormProps = Omit<
  RoutineCategoryFormProps,
  'onSubmit'
>;

export default function RoutineCategoryForm({
  category,
  ...props
}: OmittedRoutineCategoryFormProps) {
  const router = useRouter();

  const [name, nameDispatcher] = useInputReducer(category?.name || '', {
    type: VALIDATION_TYPE.NOT_EMPTY_STRING,
  });
  const [theme, themeDispatcher] = useInputReducer(
    category?.theme || CATEGORY_THEMES[0],
    {
      func: (v) => CATEGORY_THEMES.includes(v),
    },
  );
  const [badgeText, setBadgeTextDebounced] = useDebounce(category?.name, 300);

  const queryClient = useQueryClient();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const invalid = [
      nameDispatcher.validate(),
      themeDispatcher.validate(),
    ].some((b) => !b);

    if (invalid) {
      e.preventDefault();
      return;
    }
    return queryClient.invalidateQueries({ queryKey: ['categories'] });
  };

  return (
    <Form onSubmit={handleSubmit} {...props}>
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
            nameDispatcher.change(e.target.value);
            setBadgeTextDebounced(e.target.value);
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
          {CATEGORY_THEMES.map((ct) => (
            <div key={ct} className="flex items-center gap-x-3">
              <Form.InputRadio
                id={ct}
                name="routiner-routine-category"
                value={ct}
                checked={theme.value === ct}
                onChange={(e) => {
                  const newTheme = e.target.value as CategoryTheme;
                  themeDispatcher.change(newTheme);
                }}
              />
              <Form.Label htmlFor={ct}>
                <Badge variant={ct}>{badgeText || PLACEHOLDER}</Badge>
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
