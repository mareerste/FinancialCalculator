import moment from "moment";

export function getMonthFromDate(date: Date) {
  return date.getMonth() + 1;
}

export function formatDateTime(date: Date) {
  const newDate = moment(date.toString());
  return newDate.format("MMMM D, YYYY, h:mm A");
}
