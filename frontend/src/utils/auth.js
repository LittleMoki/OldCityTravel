// utils/auth.js
export const checkAuth = (login, password) => {
  const correctLogin = import.meta.env.VITE_ADMIN_LOGIN;
  const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  return login === correctLogin && password === correctPassword;
};


export const logIn = () => {
  localStorage.setItem('isAuthenticated', 'true');
};

export const logOut = () => {
  localStorage.removeItem('isAuthenticated');
};

export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};
