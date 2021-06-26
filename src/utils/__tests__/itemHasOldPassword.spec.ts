import itemHasOldPassword from '../itemHasOldPassword';

const itemBase = {
  'id': '000',
  'title': 'discord',
  'description': 'rumors',
  'password': 'discordPassword123.',
};

test.each`
  createDate      | now             | passwordIsOld | description
  ${'2019-01-01'} | ${'2019-02-01'} | ${true}       | ${'false because password is 31 days old'}
  ${'2019-01-01'} | ${'2019-01-31'} | ${false}      | ${'true because password is 30 days old'}
  ${'2019-01-01'} | ${'2019-01-30'} | ${false}      | ${'true because password is 29 days old'}
`('returns $description', ({ createDate, now, passwordIsOld }) => {
  jest
    .spyOn(global.Date, 'now')
    .mockImplementationOnce(() =>
      new Date(now).valueOf(),
    );

  const mockItem = {
    ...itemBase,
    createdAt: new Date(createDate).toISOString(),
  };

  expect(itemHasOldPassword(mockItem)).toBe(passwordIsOld);
});
