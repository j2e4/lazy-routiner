import { useRouter } from 'next/navigation';
import Badge from 'src/components/badge';
import Button from 'src/components/button';
import Form from 'src/components/form';
import Toast from 'src/components/toast';
import { useInputReducer } from 'src/hooks/useInputReducer';
import { Category } from 'types/category';
import { RoutineInput } from 'types/routine';

const MOCK_DATA: Category[] = [
  { id: '1', theme: 'BLUE', name: '생활' },
  { id: '2', theme: 'YELLOW', name: '상식' },
];

type RoutinePlanFormProps = {
  routine?: RoutineInput;
  onSubmit: (input: RoutineInput) => void;
};
export default function RoutinePlanForm({
  routine,
  onSubmit,
}: RoutinePlanFormProps) {
  const router = useRouter();

  const initialCategory = routine?.categoryId || MOCK_DATA[0].id;
  const initialDays: { [key: number]: boolean } = {};
  const initialName = routine?.name || '';
  routine?.repeatDays.forEach((day) => (initialDays[day] = true));

  const [category, categoryDispatcher] = useInputReducer<
    string,
    HTMLLegendElement
  >(initialCategory);
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

  const handleSubmit = () => {
    const valid = validate();
    if (!valid) return;

    const repeatDays: number[] = [];
    for (const day in days.value)
      if (days.value[day]) {
        repeatDays.push(+day);
      }

    onSubmit({
      name: name.value,
      repeatDays,
      categoryId: category.value,
    });
    router.back();
  };

  return (
    <Form onSubmit={handleSubmit}>
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
          {MOCK_DATA.map((badge) => (
            <div key={badge.id} className="flex items-center gap-x-3">
              <Form.InputRadio
                id={badge.id}
                name="category"
                value={badge.id}
                checked={category.value === badge.id}
                onChange={(e) => {
                  categoryDispatcher.change(e.target.value);
                }}
              />
              <Form.Label htmlFor={badge.id}>
                <Badge variant={badge.theme}>{badge.name}</Badge>
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
          {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
            <div key={d} className="relative flex gap-x-3 sm:col-span-1">
              <div className="flex h-6 items-center">
                <Form.InputCheckbox
                  id={d}
                  name={d}
                  value={i}
                  checked={days.value[i] || false}
                  onChange={({ target: { value, checked } }) => {
                    daysDispatcher.change({
                      ...days.value,
                      [value]: checked,
                    });
                  }}
                />
              </div>
              <Form.Label htmlFor={d}>{d}</Form.Label>
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
      <Form.Footer>
        <Button
          variant="secondary"
          size="wmd"
          rounded
          onClick={() => router.back()}
        >
          취소
        </Button>
      </Form.Footer>
    </Form>
  );
}
