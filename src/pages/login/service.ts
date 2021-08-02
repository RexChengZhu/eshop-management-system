import request from '@/utils/request';
import { LoginType } from '@/pages/login/data';

export const login = async (payload:LoginType)  =>{
  return  request.post('/api/users/create',{
    data:payload
  })
}
