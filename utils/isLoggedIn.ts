export const isLoggedIn = () => {
  let result = true;
  if (!sessionStorage.getItem('jwtToken') || !sessionStorage.getItem('id')) {
    result = false;
  }
  return result;
};
