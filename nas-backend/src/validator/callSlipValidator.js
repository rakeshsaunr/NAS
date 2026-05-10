/**
 * Checks if the given value is present and not empty.
 * @param {*} value 
 * @returns {boolean}
 */
function isPresent(value) {
  return value !== undefined && value !== null && value !== '';
}

/**
 * Validates the call slip object for required fields.
 * @param {Object} callSlip
 * @returns {Object} { valid: boolean, errors: array }
 */
function validateCallSlip(callSlip) {
  const errors = [];

  if (!isPresent(callSlip.name)) {
    errors.push('Name is required.');
  }

  if (!isPresent(callSlip.phone)) {
    errors.push('Phone is required.');
  }

  if (!isPresent(callSlip.date)) {
    errors.push('Date is required.');
  }

  // Add more fields as necessary

  return {
    valid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validateCallSlip,
};