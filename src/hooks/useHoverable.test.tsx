import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import HoverableProvider from 'src/contexts/hoverable/hoverable-provider';
import { useHoverable } from 'src/hooks/useHoverable';

it('useHoverable returns the context value', () => {
  const HoverableComponent = () => {
    const hoverable = useHoverable();
    return <div>{hoverable ? 'true' : 'false'}</div>;
  };

  const { getByText } = render(
    <HoverableProvider hoverable={true}>
      <HoverableComponent />
    </HoverableProvider>,
  );

  const text = getByText('true');
  expect(text).toBeInTheDocument();
});
