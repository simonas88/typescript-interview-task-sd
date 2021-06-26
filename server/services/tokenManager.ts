import faker from 'faker';

interface IToken {
    token: string,
    userId: string,
}

let tokens: Array<IToken> = [];

export const addToken = (token: string, userId: string): void => {
  tokens.push({ token, userId });
};

export const removeToken = (token: string): void => {
  tokens = tokens.filter(({ token: t }) => t !== token);
};

export const isTokenValid = (token: string): boolean => (
  tokens.some(({ token: t }) => t === token)
);

export const getTokenOwner = (token: string): IToken['userId'] => (
  tokens.find(({ token: t }) => t === token)?.userId
);

export const generateToken = (): string => faker.random.alphaNumeric(24);
