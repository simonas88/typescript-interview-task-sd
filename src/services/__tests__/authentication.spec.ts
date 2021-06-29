import { login, logout } from '../authentication';
import { getToken, removeToken, saveToken } from '../tokenStore';

jest.mock('../tokenStore');
global.fetch = jest.fn();
process.env.API_URL = 'https://test.com';

describe('authentication service tests', () => {
  beforeEach(() => jest.resetAllMocks());

  describe('login', () => {
    test('stores token on successful login', async () => {
      (fetch as jest.Mock).mockReturnValue(Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ token: 'mockToken' }),
      }));

      await login('test', 'test');

      expect(saveToken).toHaveBeenCalledWith('mockToken');
    });

    test('throws error on status 401', async () => {
      (fetch as jest.Mock).mockReturnValue(Promise.resolve({ status: 401 }));

      try {
        await login('test', 'test');
      } catch (err) {
        expect(err.message).toMatch('Incorrect username or password');
      } finally {
        expect.assertions(1);
      }
    });
  });

  describe('logout', () => {
    test('sends token to backend', async () => {
      (getToken as jest.Mock).mockReturnValue('tokenToDestroy');

      await logout();

      expect(fetch).toHaveBeenCalledWith(
        'https://test.com/api/logout',
        {
          'method': 'POST',
          'headers': {
            'Authorization': 'Bearer tokenToDestroy',
          },
        },
      );
    });

    test('removes token from storage', async () => {
      await logout();

      expect(removeToken).toHaveBeenCalledTimes(1);
    });
  });
});
