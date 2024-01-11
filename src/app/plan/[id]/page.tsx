'use client';
import { useRouter } from 'next/navigation';
import Badge, { BadgeVariant } from 'src/components/badge';
import Button from 'src/components/button';
import Form from 'src/components/form';
import Toast from 'src/components/toast';
import { useInputReducer } from 'src/hooks/useInputReducer';

const MOCK_DATA: {
  id: string;
  name: string;
  variant: BadgeVariant;
}[] = [
  { id: '1', variant: 'blue', name: '생활' },
  { id: '2', variant: 'yellow', name: '상식' },
];

export default function DoPlanRoutine() {
  const router = useRouter();

  const [category, categoryDispatcher] = useInputReducer<
    string,
    HTMLLegendElement
  >('');
  const [days, daysDispatcher] = useInputReducer<
    { [key: string]: boolean },
    HTMLLegendElement
  >({});
  const [name, nameDispatcher] = useInputReducer<string, HTMLLabelElement>('');

  const validate = () => {
    return [
      categoryDispatcher.validate((v) => v !== ''),
      daysDispatcher.validate((v) => {
        for (let day in v)
          if (v[day]) {
            return true;
          }
        return false;
      }),
      nameDispatcher.validate((v) => v !== ''),
    ].every((valid) => valid);
  };

  return (
    <main>
      <Form
        onSubmit={() => {
          if (validate()) {
            console.log('##', category.value);
            console.log('##', days.value);
            console.log('##', name.value);
            router.back();
          }
        }}
      >
        <fieldset>
          <Form.Legend ref={categoryDispatcher.setRef}>
            루틴 카테고리
          </Form.Legend>
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
                  <Badge variant={badge.variant}>{badge.name}</Badge>
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
          <Form.Label htmlFor="name" ref={nameDispatcher.setRef}>
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
            id="name"
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
    </main>
  );
}
