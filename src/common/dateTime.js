/**
 * Convert a given Gregorian date and time string to a Persian date and time string.
 *
 * @param {string} stringGregorianDateTime - The Gregorian date and time string to be converted
 * @return {string} The Persian date and time string
 */
export default function getPersianDateTimeFromString(stringGregorianDateTime) {
  return new Intl.DateTimeFormat('fa-IR', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(Date.parse(stringGregorianDateTime))
}
