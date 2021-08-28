import { connect } from 'umi';
import {
  CategoryBrandRelate,
  CategoryBrandRelateDispatchProps,
  CategoryBrandRelateStateType,
} from '@/pages/brand/categoryRelate/data.t';
import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Table, TreeSelect } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Brand } from '@/pages/brand/data.t';
import { Category, CategoryStateType } from '@/pages/category/data.t';


const Index = (props: any) => {
  const { getList, add, del, update, getNodes }: CategoryBrandRelateDispatchProps = props;
  const { nodes }: CategoryStateType = props;
  const { totalCount, list }: CategoryBrandRelateStateType = props;
  const { id } = props.location.query;
  const { name }  = props.location.state ;
  const [visible, setVisible] = useState(false);
  let cate:CategoryBrandRelate[] = [];
  const AddModel = () => {
    return (
      <>
        <Modal
          visible={visible}
          onCancel={() => {
            setVisible(false);
          }}
          onOk={()=>{
            add([...cate!]).then(()=>{
              setVisible(false)
              getList({ brandId: id })
            })
          }}
          title={'关联分类'}
        >
          <TreeSelect
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={nodes}
            placeholder='Please select'
            treeDefaultExpandAll
            multiple
            onChange={(item: string[], node) => {
              const arr:CategoryBrandRelate[] = []
              for (let i = 0; i < item.length; i++) {
                const catelogName = String(node[i]);
                const catelogId = Number(item[i]);
                const brandId = id;
                const brandName = name;
                arr.push({brandId,catelogId,brandName,catelogName})
              }
              cate = arr
            }}
          />
        </Modal>
      </>
    );
  };
  useEffect(() => {
    getList({ brandId: id });
    getNodes();
  }, []);
  return (
    <>
      <AddModel />
      <Card
        title={name}
        extra={
          <Button type='primary' icon={<PlusOutlined />} onClick={() => {
            setVisible(true);
          }}>添加</Button>
        }
      >
        <Table<CategoryBrandRelate>
          dataSource={list} rowKey={'id'}
          pagination={{
            defaultCurrent: 1,
            defaultPageSize: 10,
            total: totalCount,
            onChange: function(currentPage, pageSize) {
              getList({ currentPage, pageSize });
            },
          }}
        >
          <Table.Column<CategoryBrandRelate> title='关联id' dataIndex='id' />
          <Table.Column<CategoryBrandRelate> title='品牌名称' dataIndex='brandName' />
          <Table.Column<CategoryBrandRelate> title='分类名称' dataIndex='catelogName' />
          <Table.Column<CategoryBrandRelate> title='操作' render={(_, data) => {
            return (
              <>
                <a href='#!' onClick={() => {
                  debugger
                  del({ id: data.id }).then(_ => {
                  });
                }}> 移除</a>
              </>
            );
          }} />
        </Table>
      </Card>
    </>
  );
};
const mapStateToProps = ({
                           categoryBrandRelate,
                           category,
                         }: { categoryBrandRelate: CategoryBrandRelateStateType, category: CategoryStateType }) => {
  return { ...categoryBrandRelate, nodes: category.nodes };
};
const mapDispatchToProps = (dispatch: any): CategoryBrandRelateDispatchProps => ({
  getList: (data?: any) => dispatch({ type: 'categoryBrandRelate/getListSync', payload: data }),
  add: (data?: any) => dispatch({ type: 'categoryBrandRelate/add', payload: data }),
  del: (data?: any) => dispatch({ type: 'categoryBrandRelate/del', payload: data }),
  update: (data?: any) => dispatch({ type: 'categoryBrandRelate/update', payload: data }),
  getNodes: () => dispatch({ type: 'category/getCategoryTree' }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
