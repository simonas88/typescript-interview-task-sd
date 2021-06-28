const TOKEN_KEY = 'token';

export const saveToken = (token: string): void => void sessionStorage.setItem(TOKEN_KEY, token);
export const removeToken = (): void => void sessionStorage.removeItem(TOKEN_KEY);
export const getToken = (): string | null => sessionStorage.getItem(TOKEN_KEY);
export const tokenExists = (): boolean => getToken() !== null;
