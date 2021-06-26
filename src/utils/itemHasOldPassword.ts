import parseDate from 'date-fns/parseISO';
import addDays from 'date-fns/addDays';
import isPast from 'date-fns/isPast';
import { IItem } from '~/services/getUserItems';

type Predicate<T> = (input: T) => boolean;

const AGE_THRESHOLD = 30; // days

const itemHasOldPassword: Predicate<IItem> = ({ createdAt }) => {
  const plus30 = addDays(parseDate(createdAt), AGE_THRESHOLD);

  return isPast(plus30);
};

export default itemHasOldPassword;
