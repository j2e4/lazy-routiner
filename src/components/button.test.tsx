import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import Button from 'src/components/button';

it('calls a function on button click', () => {
  const onClick = jest.fn();
  const { getByText } = render(<Button onClick={onClick}>버튼</Button>);
  const button = getByText('버튼');

  fireEvent.click(button);
  expect(onClick).toHaveBeenCalled();
});

it('not call a function on disabled button click', () => {
  const onClick = jest.fn();
  const { getByText } = render(
    <Button disabled onClick={onClick}>
      버튼
    </Button>,
  );
  const button = getByText('버튼');

  fireEvent.click(button);
  expect(onClick).not.toHaveBeenCalled();
});
