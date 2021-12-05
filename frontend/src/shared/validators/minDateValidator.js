/**
 * Validates if the input date is greater than the received one.
 * @param {*} minDate The minimun date possible as a string in the 'yyyy-mm-dd' format (defaults to today).
 * @returns true if the input date is greater or equal the minDate and false otherwise
 */
const minDateValidator = (minDate = (new Date()).toISOString().slice(0, 10)) => date => {
  return new Date(minDate) <= new Date(date);
}

export default minDateValidator;
