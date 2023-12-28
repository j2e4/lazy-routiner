import '@testing-library/jest-dom';
import { fireEvent, prettyDOM, render } from '@testing-library/react';
import RoutineList from 'src/components/routine-list';
import HoverableProvider from 'src/contexts/hoverable/hoverable-provider';
import { useHoverable } from 'src/hooks/useHoverable';

describe('RoutineList.Item', () => {
  it('without hoverable styles (default)', () => {
    const { getByText } = render(
      <RoutineList.Item>List Item</RoutineList.Item>,
    );
    const item = getByText('List Item');

    expect(item).not.toHaveClass('hover:bg-gray-50');
  });

  it('with hoverable styles', () => {
    const { getByText } = render(
      <RoutineList.Item hoverable>List Item</RoutineList.Item>,
    );
    const item = getByText('List Item');

    expect(item).toHaveClass('hover:bg-gray-50');
  });
});

describe('RoutineList.ItemBody', () => {
  describe('without hoverable context value', () => {
    it('renders default children', () => {
      const { getByText } = render(
        <RoutineList.ItemBody>List Item Body</RoutineList.ItemBody>,
      );
      const body = getByText('List Item Body');

      expect(body).toBeInTheDocument();
    });

    it('only renders the text content when received children function', () => {
      const { getByText, queryByTestId } = render(
        <RoutineList.ItemBody>
          {({ ExpandedPane }) => (
            <>
              List Item Body
              <ExpandedPane data-testid="expanded-pane" />
            </>
          )}
        </RoutineList.ItemBody>,
      );
      const body = getByText('List Item Body');
      const pane = queryByTestId('expanded-pane');

      expect(body).toBeInTheDocument();
      expect(pane).not.toBeInTheDocument();
    });
  });

  describe('with hoverable context value', () => {
    // the same as without hoverable context value
    it('renders default children', () => {
      const { getByText } = render(
        <HoverableProvider hoverable={true}>
          <RoutineList.ItemBody>List Item Body</RoutineList.ItemBody>
        </HoverableProvider>,
      );
      const body = getByText('List Item Body');

      expect(body).toBeInTheDocument();
    });

    it('renders all of the execution output when received children function', () => {
      const { getByText, queryByTestId } = render(
        <HoverableProvider hoverable={true}>
          <RoutineList.ItemBody>
            {({ ExpandedPane }) => (
              <>
                List Item Body
                <ExpandedPane data-testid="expanded-pane" />
              </>
            )}
          </RoutineList.ItemBody>
        </HoverableProvider>,
      );

      const body = getByText('List Item Body');
      const pane = queryByTestId('expanded-pane');

      expect(body).toBeInTheDocument();
      expect(pane).toBeInTheDocument();
    });
  });
});
