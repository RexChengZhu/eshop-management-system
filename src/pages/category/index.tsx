import { Card, Button, Table, Modal, Input, Breadcrumb } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { addCategory, categoryList } from '@/service/api';


const Category = () => {

  const [addVisible, setAddVisible] = useState(false);
  const [addConfirmLoading, setAddConfirmLoading] = useState(false);

  const { run: addRun } = useRequest(addCategory, {
    manual: true,
  });
  const { data, run } = useRequest(categoryList, {
    manual: true,
  });
  useEffect(() => {
    run({ currentPage: 1, pageSize: 5 });
  }, []);
  const [selectedList, setSelectedList] = useState<{ id: number, title: string }[]>([{ id: 0, title: '一级分类' }]);

  const CategoryList = () => {
    return (
      <Breadcrumb>
        {
          selectedList?.map(item => {
            return (
              <Breadcrumb.Item key={item.id}>
                <a href='javascript:;' onClick={() => {
                  while (true) {
                    // 从数组最后开始pop
                    const pop = selectedList.pop();
                    if (pop?.id === item.id) {
                      selectedList.push(pop);
                      debugger
                      run({ currentPage: 1, pageSize: 10, pid: item.id });
                      break;
                    }
                  }
                  setSelectedList([...selectedList]);
                }}>{item.title}</a>
              </Breadcrumb.Item>
            );
          })
        }
      </Breadcrumb>
    );
  };
  const inputEl = useRef<Input | null>(null)
  const addOk = () => {
    const pid = selectedList[selectedList.length - 1].id;
    addRun({name:inputEl.current?.input.value,pid}).then(_ => setAddVisible(false));
  };
  const AddModel = () => {
    return (
      <Modal
        title={'添加分类名称'}
        visible={addVisible}
        onOk={addOk}
        onCancel={() => setAddVisible(false)}
        confirmLoading={addConfirmLoading}
      >
        <Input placeholder='请输入分类名称' ref={inputEl} />
      </Modal>

    );
  };
  return (
    <>
      <AddModel />
      <Card
        title={<CategoryList />}
        extra={
          <Button type='primary' icon={<PlusOutlined />} onClick={() => setAddVisible(true)}>添加</Button>
        }
      >
        <Table<API.Category>
          dataSource={data?.data?.list} rowKey={'id'}
          pagination={{
            defaultCurrent: 1,
            defaultPageSize: 5,
            total: data?.data?.totalCount,
            onChange: function(page, size) {
              run({ currentPage: page, pageSize: size });
            },
          }}
        >
          <Table.Column<API.Category>  title='Name' dataIndex='name' />
          <Table.Column<API.Category> title='操作' render={(_, data) => {
            return (
              <>
                <Button onClick={() => {
                  setSelectedList([...selectedList, { id: data.id!, title: data.name! }]);
                }}>查看子分类</Button>
              </>
            );
          }} />
        </Table>
      </Card>

    </>
  );
};

export default Category;
