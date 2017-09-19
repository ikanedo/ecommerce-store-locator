import find from 'lodash/find';
import moment from 'moment';
import { DTS, RLC } from '../deliveryOptions/deliveryOptionsConstants';
import { DATE_FORMAT, DATE_DISPLAY_FORMAT } from 'src/utils/intl';

export function getFormattedDate(date) {
  return moment(date, DATE_FORMAT).format(DATE_DISPLAY_FORMAT);
}

export function getIcon(type) {
  switch (type) {
    case RLC:
      return 'local-collect';
    case DTS:
      return 'beaverbrooks';
    default:
      return '';
  }
}

export function getDeliveryDateByType(type, deliveryDates) {
  const date = find(deliveryDates, dateObj => dateObj.deliveryModeCode === type);
  return date ? date.date : '';
}

export function getDatesByDeliveryModeCode(dates, deliveryCode) {
  const datesByDeliveryType =
    dates.filter(dateObj =>
      dateObj.deliveryModeCode === deliveryCode
    );
  return datesByDeliveryType;
}

export function getAllEntryDeliveryDates(entries) {
  return entries
    .map(entry => entry.deliveryDate)
    .reduce((prev, current) => prev.concat(current), []);
}

export function isMultipleItemsWithSameDates(cartEntries, deliveryCode) {
  const allDeliveryDates = getAllEntryDeliveryDates(cartEntries);
  const datesArray = getDatesByDeliveryModeCode(allDeliveryDates, deliveryCode).map(dateObj => dateObj.date);

  for (let i = 1; i < datesArray.length; i++) {
    if (!moment(datesArray[i]).isSame(moment(datesArray[0]), 'day')) {
      return false;
    }
  }

  return true;
}
