import { IItem } from '~/services/getUserItems';

type Predicate<T> = (input: T) => boolean;

const STRENGTH_THRESHOLD = 2;

const getPasswordStrength = (password: string): number => [
  password.match(/[a-z]/) != null,
  password.match(/[A-Z]/) != null,
  password.match(/[!@#$%^&*]/) != null,
  password.match(/[0-9]/) != null,
].filter(Boolean).length;

const itemHasWeakPassword: Predicate<IItem> = ({ password }) =>
  getPasswordStrength(password) <= STRENGTH_THRESHOLD;

export default itemHasWeakPassword;
