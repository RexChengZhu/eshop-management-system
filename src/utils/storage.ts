import { UserType } from '@/pages/login/data';
import { history } from 'umi';

export const saveUser = (user: UserType) => {
  const ss = JSON.stringify(user);
  sessionStorage.setItem('user_', ss);
};

export const getUser = (): UserType => {
  const user = sessionStorage.getItem('user_' )
  if (user == null){
    history.replace("/login")
    return JSON.parse("{}");
  }else{
    return JSON.parse(user);
  }
};

export const deleteUser = () => {
  sessionStorage.removeItem('user_' );
};
