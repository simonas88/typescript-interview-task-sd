import getRepeatValues from '../getRepeatValues';

describe('getRepeatValues', () => {
  test('returns repeating values', () => {
    const input = [
      { key: 'one' },
      { key: 'two' },
      { key: 'one' },
      { key: 'two' },
      { key: 'three' },
      { key: 'one' },
    ];

    const result = getRepeatValues(input, item => item.key);

    expect(Array.from(result)).toEqual(['one', 'two']);
  });
});
