function checkTypesError(arr, expectedType) {
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    if (el !== null && typeof el !== expectedType) {
      return true;
    }
  }

  return false;
}


module.exports = checkTypesError;