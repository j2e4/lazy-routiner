'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Badge, { BADGE_STYLES, BadgeVariant } from 'src/components/badge';
import Form from 'src/components/form';
import Toast from 'src/components/toast';
import { useDebounce } from 'src/hooks/useDebounce';
import { useInputReducer } from 'src/hooks/useInputReducer';
import { Category, CategoryTheme } from 'types/category';

const PLACEHOLDER = '건강';
const BADGE_VARIANTS = Object.keys(BADGE_STYLES) as BadgeVariant[];

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

  const [name, nameDispatcher] = useInputReducer<string, HTMLLabelElement>(
    category?.name || '',
  );
  const [theme, themeDispatcher] = useInputReducer<
    CategoryTheme,
    HTMLLegendElement
  >(category?.theme || BADGE_VARIANTS[0]);
  const [badgeText, setBadgeTextDebounced] = useDebounce(
    category?.name || PLACEHOLDER,
    300,
  );

  const queryClient = useQueryClient();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const invalid = [
      nameDispatcher.validate((v) => v !== ''),
      themeDispatcher.validate((v) => BADGE_VARIANTS.includes(v)),
    ].some((b) => !b);

    if (invalid) {
      e.preventDefault();
      return;
    }
    return queryClient.invalidateQueries({ queryKey: ['categories'] });
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
            nameDispatcher.change(e.target.value);
            setBadgeTextDebounced(e.target.value || PLACEHOLDER);
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
                <Badge variant={badge}>{badgeText}</Badge>
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
