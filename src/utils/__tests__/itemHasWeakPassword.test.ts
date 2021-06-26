import itemHasWeakPassword from '../itemHasWeakPassword';
import { IItem } from '~/services/getUserItems';

describe('should return true if password do not match requirements', () => {
  test.each`
    expectedResult | password          | description
    ${true}        | ${'pass'}         | ${'"pass" to be a weak password'}
    ${false}       | ${'Password123~'} | ${'"Password123~" NOT to be a weak password'}
    ${true}        | ${'Password'}     | ${'"Password" to be a weak password'}
  `('should consider $description', ({ expectedResult, password }) => {
    expect(itemHasWeakPassword({ password } as IItem)).toBe(expectedResult);
  });
});
