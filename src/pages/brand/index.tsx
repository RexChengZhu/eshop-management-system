import React from 'react';
import { useRequest } from 'ahooks';


const Category:React.FC = () => {
  useRequest("/api/users/create",{onSuccess(){
    debugger
    }})
  return (
    <>
      brand
    </>
  );
};

export default Category;
