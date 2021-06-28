import parseDate from 'date-fns/parseISO';
import addDays from 'date-fns/addDays';
import isPast from 'date-fns/isPast';
import { Item, Predicate } from '~/types';

const AGE_THRESHOLD = 30; // days

const itemHasOldPassword: Predicate<Item> = ({ createdAt }) => {
  const plus30 = addDays(parseDate(createdAt), AGE_THRESHOLD);

  return isPast(plus30);
};

export default itemHasOldPassword;
