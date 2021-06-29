import { logoutAndReload } from '../authentication';
import authorizedFetch from '../authorizedFetch';
import { getToken } from '../tokenStore';

jest.mock('../authentication');
jest.mock('../tokenStore');
global.fetch = jest.fn();

describe('authorizedFetch tests', () => {
  beforeEach(() => jest.resetAllMocks());

  test('injects authorization token', async () => {
    (getToken as jest.Mock).mockReturnValue('testToken');
    (fetch as jest.Mock).mockReturnValue(Promise.resolve({
      status: 200,
    }));

    await authorizedFetch('https://test');

    expect(fetch).toHaveBeenCalledWith(
      'https://test',
      { 'headers': { 'Authorization': 'Bearer testToken' } },
    );
  });

  test('performs logout and reload action on unauthorized response', async () => {
    (getToken as jest.Mock).mockReturnValue('testToken');
    (fetch as jest.Mock).mockReturnValue(Promise.resolve({
      status: 401,
    }));

    await authorizedFetch('https://test');

    expect(logoutAndReload).toHaveBeenCalled();
  });
});
