export type Item = {
  title: string,
  description: string,
  password: string,
  createdAt: string,
}

export type UserData = {
  id: string;
  username: string;
  email: string;
}

export type Predicate<T> = (input: T) => boolean;
