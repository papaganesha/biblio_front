import jwt_decode from 'jwt-decode';

const setToken = (token) => {
  localStorage.setItem('token', token);
};

const unsetToken = () => {
  localStorage.removeItem('token');
};

const getToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      unsetToken();
      return null;
    }
    return decodedToken;
  }
  return null;
};

export { setToken, unsetToken, getToken };