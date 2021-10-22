/**
 * Validates if the input date is greater than the received one.
 * @param {*} minDate The minimun date possible as a string in the 'yyyy-mm-dd' format
 * @returns true if the input date is greater or equal the minDate and false otherwise
 */
const minDateValidator = minDate => date => {
  return new Date(minDate) <= new Date(date);
}

export default minDateValidator;
