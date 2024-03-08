import { format } from 'src/utils/format';

describe('format function', () => {
  it('should handle non-padded numbers', () => {
    const str = format('%d and %d', [11, 222]);
    expect(str).toBe('11 and 222');
  });

  it('should format numbers with padding', () => {
    const str = format('%4d and %6d', [11, 222]);
    expect(str).toBe('0011 and 000222');
  });

  it('should handle missing numbers', () => {
    const str = format('%4d and %6d', [11]);
    expect(str).toBe('0011 and 000000');
  });

  it('should handle format string without %d', () => {
    const str = format('No padding here', [11, 222]);
    expect(str).toBe('No padding here');
  });
});
