import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import List from 'src/components/list';
import HoverableProvider from 'src/contexts/hoverable/hoverable-provider';

describe('List.Item', () => {
  it('without hoverable styles (default)', () => {
    const { getByText } = render(<List.Item>List Item</List.Item>);
    const item = getByText('List Item');

    expect(item).not.toHaveClass('hover:bg-gray-50');
  });

  it('with hoverable styles', () => {
    const { getByText } = render(<List.Item hoverable>List Item</List.Item>);
    const item = getByText('List Item');

    expect(item).toHaveClass('hover:bg-gray-50');
  });
});

describe('List.ItemBody', () => {
  describe('without hoverable context value', () => {
    it('renders default children', () => {
      const { getByText } = render(
        <List.ItemBody>List Item Body</List.ItemBody>,
      );
      const body = getByText('List Item Body');

      expect(body).toBeInTheDocument();
    });

    it('only renders the text content when received children function', () => {
      const { container, getByText } = render(
        <List.ItemBody>
          {({ Filler }) => (
            <>
              List Item Body
              <Filler />
            </>
          )}
        </List.ItemBody>,
      );
      const body = getByText('List Item Body');
      const pane = container.querySelector('span');

      expect(body).toBeInTheDocument();
      expect(pane).not.toBeInTheDocument();
    });
  });

  describe('with hoverable context value', () => {
    // the same as without hoverable context value
    it('renders default children', () => {
      const { getByText } = render(
        <List.Item hoverable>
          <List.ItemBody>List Item Body</List.ItemBody>
        </List.Item>,
      );
      const body = getByText('List Item Body');

      expect(body).toBeInTheDocument();
    });

    it('renders all of the execution output when received children function', () => {
      const { container, getByText } = render(
        <List.Item hoverable>
          <List.ItemBody>
            {({ Filler }) => (
              <>
                List Item Body
                <Filler />
              </>
            )}
          </List.ItemBody>
        </List.Item>,
      );

      const body = getByText('List Item Body');
      const pane = container.querySelector('span');

      expect(body).toBeInTheDocument();
      expect(pane).toBeInTheDocument();
    });
  });
});

describe('List.ItemBodyText', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <List.ItemBodyText>List Item Body Text</List.ItemBodyText>,
    );
    const body = getByText('List Item Body Text');
    expect(body).toBeInTheDocument();
  });

  it('renders with the default HTML tag', () => {
    const { getByText } = render(
      <List.ItemBodyText>List Item Body Text</List.ItemBodyText>,
    );
    const body = getByText('List Item Body Text');
    expect(body.tagName.toLowerCase()).toBe('p');
  });

  it('renders with the specified HTML tag', () => {
    const { getByText } = render(
      <List.ItemBodyText as="div">List Item Body Text</List.ItemBodyText>,
    );
    const body = getByText('List Item Body Text');
    expect(body.tagName.toLowerCase()).toBe('div');
  });
});
