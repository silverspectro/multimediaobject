export default string => {
  if (string === '') {
    return true;
  }
  if (typeof string === 'undefined' || string === 'false' || Boolean(string) === false) {
    return false;
  }
  return Boolean(string);
};