import getRepeatValues from '../getRepeatValues';

describe('getRepeatValues', () => {
  test('returns repeating values', () => {
    const input = [
      { key: 'one' },
      { key: 'one' },
      { key: 'one' },
      { key: 'two' },
      { key: 'two' },
      { key: 'three' },
    ];

    const result = getRepeatValues(input, item => item.key);

    expect(Array.from(result)).toEqual(['one', 'two']);
  });
});
