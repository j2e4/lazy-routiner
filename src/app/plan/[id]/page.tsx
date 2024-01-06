'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Badge, { BadgeVariant } from 'src/components/badge';
import Button from 'src/components/button';
import Form from 'src/components/form';
import Toast from 'src/components/toast';

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

  const [category, setCategory] = useState<string>('');
  const [days, setDays] = useState<{ [key: string]: boolean }>({});
  const [name, setName] = useState<string>('');

  const [catRef, setCatRef] = useState<HTMLLegendElement | null>(null);
  const [daysRef, setDaysRef] = useState<HTMLLegendElement | null>(null);
  const [nameRef, setNameRef] = useState<HTMLLabelElement | null>(null);

  const [categoryInvalid, setCategoryInvalid] = useState(false);
  const [daysInvalid, setDaysInvalid] = useState(false);
  const [nameInvalid, setNameInvalid] = useState(false);

  const validate = () => {
    let daysInvalid = true;
    for (let day in days)
      if (days[day]) {
        daysInvalid = false;
      }
    const categoryInvalid = category === '';
    const nameInvalid = name === '';

    setCategoryInvalid(categoryInvalid);
    setDaysInvalid(daysInvalid);
    setNameInvalid(nameInvalid);
    return !(categoryInvalid || daysInvalid || nameInvalid);
  };

  return (
    <main>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (validate()) {
            console.log('##', category);
            console.log('##', days);
            console.log('##', name);
            router.back();
          }
        }}
      >
        <div className="space-y-8 px-10 pt-4">
          <fieldset>
            <Form.Legend ref={setCatRef}>루틴 카테고리</Form.Legend>
            <Toast
              show={categoryInvalid}
              variant="error"
              options={{
                placement: 'right',
                reference: catRef,
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
                    checked={category === badge.id}
                    onChange={(e) => {
                      setCategory(e.target.value);
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
            <Form.Legend ref={setDaysRef}>루틴을 반복할 요일</Form.Legend>
            <Toast
              show={daysInvalid}
              variant="error"
              options={{
                placement: 'right',
                reference: daysRef,
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
                      checked={days[i] || false}
                      onChange={({ target: { value, checked } }) => {
                        setDays((prevDays) => ({
                          ...prevDays,
                          [value]: checked,
                        }));
                      }}
                    />
                  </div>
                  <Form.Label htmlFor={d}>{d}</Form.Label>
                </div>
              ))}
            </div>
          </fieldset>
          <div>
            <Form.Label htmlFor="name" ref={setNameRef}>
              실천할 내용
            </Form.Label>
            <Toast
              show={nameInvalid}
              variant="error"
              options={{
                placement: 'right',
                reference: nameRef,
              }}
            >
              빈 값일 수 없어요.
            </Toast>
            <Form.InputText
              id="name"
              placeholder="자기 전에 일기 쓰기"
              className="mt-4"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </div>
        {/* TODO 위 블록이 충분히 길어지면 absolute 스타일을 제외히자. */}
        {/* <div className="mt-8 flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 pt-4"> */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-end gap-x-6 border-t border-gray-900/10 p-4">
          <Button
            variant="secondary"
            size="wmd"
            rounded
            onClick={() => router.back()}
          >
            취소
          </Button>
          <Button type="submit" variant="primary" size="wmd" rounded>
            저장
          </Button>
        </div>
      </form>
    </main>
  );
}
