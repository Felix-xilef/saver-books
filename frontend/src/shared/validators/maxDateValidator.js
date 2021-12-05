/**
 * Validates if the input date is lesser than the received one.
 * @param {*} maxDate The maximum date possible as a string in the 'yyyy-mm-dd' format (defaults to today).
 * @returns true if the input date is lesser or equal the minDate and false otherwise
 */
 const maxDateValidator = (maxDate = (new Date()).toISOString().slice(0, 10)) => date => {
  return new Date(maxDate) >= new Date(date);
}

export default maxDateValidator;
