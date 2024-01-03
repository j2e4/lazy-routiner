'use client';
import Badge, { BadgeVariant } from 'src/components/badge';
import Button from 'src/components/button';
import Form from 'src/components/form';

const MOCK_DATA: {
  id: string;
  name: string;
  variant: BadgeVariant;
}[] = [
  { id: '1', variant: 'blue', name: '생활' },
  { id: '2', variant: 'yellow', name: '상식' },
];

export default function DoPlanRoutine() {
  return (
    <main>
      <form>
        <div className="space-y-8 px-10 pt-4">
          <fieldset>
            <Form.Legend>루틴 카테고리</Form.Legend>
            <div className="mt-4 space-y-4">
              {MOCK_DATA.map((badge) => (
                <div key={badge.id} className="flex items-center gap-x-3">
                  <Form.InputRadio id={badge.id} name="category" />
                  <Form.Label htmlFor={badge.id}>
                    <Badge variant={badge.variant}>{badge.name}</Badge>
                  </Form.Label>
                </div>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <Form.Legend>루틴을 반복할 요일</Form.Legend>
            <div className="mt-4 grid grid-cols-4 gap-x-6 gap-y-4 sm:grid-cols-7">
              {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                <div key={day} className="relative flex gap-x-3 sm:col-span-1">
                  <div className="flex h-6 items-center">
                    <Form.InputCheckbox id={day} name={day} />
                  </div>
                  <Form.Label htmlFor={day}>{day}</Form.Label>
                </div>
              ))}
            </div>
          </fieldset>
          <div>
            <Form.Label htmlFor="name">실천할 내용</Form.Label>
            <Form.InputText
              id="name"
              placeholder="자기 전에 일기 쓰기"
              className="mt-4"
            />
          </div>
        </div>
        {/* TODO 위 블록이 충분히 길어지면 absolute 스타일을 제외히자. */}
        {/* <div className="mt-8 flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 pt-4"> */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-end gap-x-6 border-t border-gray-900/10 p-4">
          <Button variant="secondary" size="wmd" rounded>
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
