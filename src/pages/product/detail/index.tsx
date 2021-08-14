import React, { useEffect } from 'react';

interface IProdDetail{
  id:number
}
const Detail:React.FC<IProdDetail> = ({id})=>{

  useEffect(()=>{
    // 请求详细信息
    console.log('detail---',id);
  },[])
  return(
    <>
      Detail
    </>
  )
}
export default Detail;
