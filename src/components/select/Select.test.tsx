import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Size } from '@shared/types';
import { capitalize, convertToKeyValueArray } from '@shared/utils';
import { Select } from './Select';

const TEST_ITEMS = convertToKeyValueArray(['foo', 'bar', 'baz'], capitalize);

describe('<Select/>', () => {
  it('Placeholder changes', () => {
    const { rerender } = render(
      <Select items={TEST_ITEMS} placeholder='Choose something...' />
    );
    expect(screen.queryByTestId('test-placeholder')).toHaveTextContent(
      'Choose something...'
    );

    rerender(
      <Select items={TEST_ITEMS} placeholder='Choose something else...' />
    );
    expect(screen.queryByTestId('test-placeholder')).toHaveTextContent(
      'Choose something else...'
    );

    rerender(
      <Select
        selectedItem='foo'
        items={TEST_ITEMS}
        placeholder='Choose something...'
      />
    );
    expect(screen.queryByTestId('test-placeholder')).toBeNull();
  });

  it('Size changes', () => {
    const { rerender } = render(<Select items={TEST_ITEMS} />);
    expect(screen.getByTestId('select-container').className).toBe(
      'select select_large'
    );

    rerender(<Select items={TEST_ITEMS} size={Size.SMALL} />);
    expect(screen.getByTestId('select-container').className).toBe('select');

    rerender(<Select items={TEST_ITEMS} size={Size.LARGE} />);
    expect(screen.getByTestId('select-container').className).toBe(
      'select select_large'
    );
  });
});
