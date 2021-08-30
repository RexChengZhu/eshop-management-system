import { Tree } from 'antd';
import { DataNode, Key } from 'rc-tree/lib/interface';
import { Category, CategoryDispatchProps, CategoryStateType } from '@/pages/category/data.t';
import { connect } from 'umi';
import { useEffect } from 'react';

interface ICateTree {
  selected: (item: Category) => void
}

const CateTree = (props: any) => {

  const { selected }: ICateTree = props;
  const { list ,getList} = props;
  useEffect(()=>{
    getList()
  },[])
  const getDataNode = (list?: Category[]): DataNode[] => {
    if (list == undefined) {
      return [];
    }
    return list.map(item => {
      const length = item.subList?.length || 0;
      const data: DataNode = { key: item.id + '', title: item.name };
      if (length > 0) {
        data['children'] = getDataNode(item.subList!);
      }
      return data;
    });
  };
  return (
    <>
      <Tree
        style={{ height: '100vh' }}
        className='draggable-tree'
        treeData={getDataNode(list)}
        onSelect={(_, b) => {
          if (b != undefined) {
            const node = b.selectedNodes[0];
            selected({ id: Number(node.key), name: node.title!.toString() });
          }
        }}
      />
    </>
  );
};
const mapStateToProps = ({ category }: { category: CategoryStateType }) => {
  return { list:category.tree };
};
const mapDispatchToProps = (dispatch: any) => ({
  getList: (data?: any) => dispatch({ type: 'category/getCategoryTree', payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(CateTree);
