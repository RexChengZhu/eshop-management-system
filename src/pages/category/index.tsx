import { connect } from 'umi';
import React, { useEffect, useRef, useState } from 'react';
import { Category, CategoryDispatchProps, CategoryStateType } from '@/pages/category/data.t';
import { Button, Card, Input, Modal, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CategoryList from '@/components/CategoryList';


const Index = (props: any) => {

  const { getList, addCategory, deleteCategory, updateCategory }: CategoryDispatchProps = props;
  const { list, totalCount }: CategoryStateType = props;
  // 添加分类的弹窗显示
  const [visible, setVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  // 当前的父id
  const [pid, setPid] = useState(0);
  // 当前的id
  const [item, setItem] = useState<Category>();
  const [selectedList, setSelectedList] = useState<{ id: number, title: string }[]>([{ id: 0, title: '一级分类' }]);
  useEffect(() => {
    getList({ currentPage: 1, pageSize: 10 });
  }, []);

  const AddModel = () => {
    const inputEl = useRef<Input | null>(null);
    return (
      <Modal
        title={'添加分类名称'}
        visible={visible}
        onOk={() => {
          const name = inputEl.current?.input.value;
          addCategory({ pid, name }).then(_ => {
            getList({ pid });
          });
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
      >
        <Input placeholder='请输入分类名称' ref={inputEl} />
      </Modal>

    );
  };
  const UpdateModel = () => {
    const inputEl = useRef<Input | null>(null);
    return (
      <Modal
        title={'修改分类名称'}
        visible={addVisible}
        onOk={() => {
          const name = inputEl.current?.input.value;
          updateCategory({ id:item!.id, name }).then(_ => {
            getList({ data:pid });
          });
          setAddVisible(false);
        }}
        onCancel={() => setAddVisible(false)}
      >
        <Input placeholder='请输入分类名称' ref={inputEl} defaultValue={item?.name} />
      </Modal>

    );
  };

  return (
    <>
      <AddModel />
      <UpdateModel />
      <Card
        title={
          <CategoryList
            click={(item) => {
              getList({ data: item.id });
              setPid(item.id);
              setSelectedList([...selectedList]);
            }}
            selectedList={selectedList}
          />
        }
        extra={
          <Button type='primary' icon={<PlusOutlined />} onClick={() => setVisible(true)}>添加</Button>
        }
      >
        <Table<Category>
          dataSource={list} rowKey={'id'}
          pagination={{
            defaultCurrent: 1,
            defaultPageSize: 5,
            total: totalCount,
            onChange: function(page, size) {
              getList({ currentPage: page, pageSize: size, pid });
            },
          }}
        >
          <Table.Column<Category> title='Name' dataIndex='name' />
          <Table.Column<Category> title='操作' render={(_, data) => {
            return (
              <>
                <Button onClick={() => {
                  setSelectedList([...selectedList, { id: data.id!, title: data.name! }]);
                  setPid(data.id!);
                  getList({ data: data.id });
                }}>查看子分类</Button>
                &nbsp;&nbsp;
                <Button onClick={() => {
                  setItem(data);
                  setAddVisible(true);
                }}>修改</Button>
                &nbsp;&nbsp;
                <Button onClick={() => {
                  deleteCategory([data.id]).then(_ => {
                    getList({ pid });
                  });
                }}>删除</Button>


              </>
            );
          }} />
        </Table>
      </Card>
    </>
  );
};
const mapStateToProps = ({ category }: { category: CategoryStateType }) => {
  return { ...category };
};


const mapDispatchToProps = (dispatch: any): CategoryDispatchProps => ({
    getList: (data?: any) => dispatch({ type: 'category/getCategoryListAsync', payload: data }),
    addCategory: (data?: any) => dispatch({ type: 'category/addCategory', payload: data }),
    deleteCategory: (data?: any) => dispatch({ type: 'category/deleteCategory', payload: data }),
    updateCategory: (data?: any) => dispatch({ type: 'category/updateCategory', payload: data }),
  })
;


export default connect(mapStateToProps, mapDispatchToProps)(Index);
