import { Tree } from 'antd';
import { useRequest } from 'ahooks';
import { categoryList } from '@/service/api';
import { useEffect, useState } from 'react';
import { DataNode, Key } from 'rc-tree/lib/interface';
interface ICateTree{
  selected:(key:string)=>void
}
const CateTree = ({selected}:ICateTree) => {
  const { data } = useRequest(categoryList);
  const [list, setList] = useState<DataNode[]>();
  useEffect(() => {
    setList(getDataNode(data?.data?.list!));
  }, [data]);
  const getDataNode = (list:API.Category[]) :DataNode[]=>{
    if (list == undefined){
      return [];
    }
    return  list.map(item=>{
      const length = item.subList?.length || 0
      const data:DataNode = {key:item.id+"",title:item.name}
      if (length > 0){
        data['children'] = getDataNode(item.subList!);
      }
      return data;
    })
  }
  const onSelect = (keys:Key[])=>{
    const key = keys[0]
    if (key == undefined){
    }else{
      selected(key.toString())
    }
  }
  return (
    <>
      <Tree
        style={{height:'100vh'}}
        className='draggable-tree'
        treeData={list}
        onSelect={onSelect}
      />
    </>
  );
};
export default CateTree;
