import React, { useState } from 'react';
import { Button, Card, Input } from 'antd';

interface ISearch<T>{
  search:(t:T)=>void
  searchAll?:(t:T)=>void
}
function TableSearch({search,searchAll}:ISearch<string>){
  const [keyword,setKeyword] = useState('');
  return(
    <>
      <Input
        placeholder={'关键字'}
        size='middle'
        style={{ width: '200px', margin: '10px' }}
        onChange={(e) => setKeyword(e.target.value)} />
      <Button type={'primary'} onClick={() => search(keyword)}>搜索</Button>
      &nbsp;&nbsp;&nbsp;
      <Button type={'primary'} onClick={() => searchAll!(keyword)}>搜索全部</Button>
    </>
  )
}



export default TableSearch;
