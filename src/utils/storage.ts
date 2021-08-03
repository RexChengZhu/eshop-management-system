import { UserType } from '@/pages/login/data';

export const saveUser = (user: UserType) => {
  const ss = JSON.stringify(user);
  debugger
  sessionStorage.setItem('user_', ss);
};

export const getUser = (): UserType => {
  debugger
  const user = sessionStorage.getItem('user_' )  || '{}';
  return JSON.parse(user);
};

export const deleteUser = () => {
  sessionStorage.removeItem('user_' );
};
