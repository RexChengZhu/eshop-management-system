import request from '@/utils/request';
import { RegisterType } from '@/pages/login/data';


export const register = (data:RegisterType)=>{
  return request.post('/register',{
    data
  })
}
