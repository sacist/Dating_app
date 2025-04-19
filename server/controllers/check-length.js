function checkStringLengthError(arr, maxLength) {

  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    if (typeof el === 'string' && el.length > maxLength) {
      return true;
    }
  }

  return false;
}
  
  module.exports = checkStringLengthError;