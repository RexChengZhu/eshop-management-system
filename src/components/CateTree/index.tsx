import { Tree } from 'antd';
import { DataNode, Key } from 'rc-tree/lib/interface';
import { Category } from '@/pages/category/data.t';
interface ICateTree{
  selected:(item:Category)=>void
  list?:Category[]
}
const CateTree = ({selected,list}:ICateTree) => {

  const getDataNode = (list?:Category[]) :DataNode[]=>{
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
  return (
    <>
      <Tree
        style={{height:'100vh'}}
        className='draggable-tree'
        treeData={getDataNode(list)}
        onSelect={(_,b)=>{
          if (b != undefined){
            const node = b.selectedNodes[0]
            selected({id:Number(node.key),name:node.title!.toString()})
          }
        }}
      />
    </>
  );
};
export default CateTree;
