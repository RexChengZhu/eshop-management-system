import React, { useEffect, useState, useMemo } from 'react';
import { Card, Button, Table, Modal, Input, Breadcrumb } from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { getCategoryList, updateCategory,addCategory } from '@/service/api';

type SelectType = {
  id?: number,
  name?: string
}

interface ITitle {
  list: SelectType[],
  click: (id: number) => void
}

const Title = ({ list, click }: ITitle) => {

  return (
    <Breadcrumb>
      {
        list.map(item => {
          return (<Breadcrumb.Item>
              <a href='javascript:;' onClick={() => click(item.id!)}>{item.name}</a>
            </Breadcrumb.Item>
          );
        })
      }
    </Breadcrumb>
  );
};


const Category: React.FC = () => {
  const { data: result, run: listRun } = useRequest(getCategoryList, { debounceInterval: 500, manual: true });
  const { data: updateResult, run } = useRequest((category) => updateCategory(category), {
    debounceInterval: 500,
    manual: true,
  });
  const { data: addResult, run: addRun } = useRequest(addCategory, {
    debounceInterval: 500,
    manual: true,
  });

  const reloadList = (id: number) => {
    const newList = [];
    for (let i = 0; i < selectList.length; i++) {
      const data = selectList[i];
      if (data.id !== id) {
        newList.push(data);
      } else {
        newList.push(data);
        break;
      }
    }
    setSelectList(newList);
  };


  const changeCategory = (data: API.Category) => {
    setCategory({ ...data });
    setVisible(true);
  };
  const checkChild = (data: API.Category) => {
    setSelectList([...selectList, { id: data.id, name: data.name }]);
    setList(data.subList!);
  };
  // 编辑分类选中的分类
  const [category, setCategory] = useState<API.Category>() || undefined;
  const [changeVisible, setChangeVisible] = useState(false);
  const [changeConfirmLoading, setChangeConfirmLoading] = useState(false);

  // 添加分类选中的分类
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);


  const [curPage, setCurPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<API.Category[]>([]) || [];
  // 被选中了的列表
  const [selectList, setSelectList] = useState<SelectType[]>([{ id: 0, name: '一级分类' }]);
  useEffect(() => {
    listRun().then();

  }, []);
  useEffect(() => {
    setList([...result?.data?.list || []]);
    setTotal(result?.data?.totalCount!);
  }, [result]);

  useEffect(() => {
    setChangeConfirmLoading(false);
    setChangeVisible(false);
    listRun().then();
  }, [updateResult]);
  const changeHandleOk = () => {
    setChangeConfirmLoading(true);
    run(category).then();
  };
  const handleOk = () => {
    setChangeConfirmLoading(true);
    category!.pid = selectList[selectList.length - 1].id;
    addRun(category).then();
  };
  useEffect(() => {
    setChangeConfirmLoading(false);
    setVisible(false);
    listRun().then();
  }, [addResult]);

  return (
    <>
      <Modal
        title={'修改分类名称'}
        visible={changeVisible}
        onOk={changeHandleOk}
        confirmLoading={changeConfirmLoading}
        onCancel={() => setChangeVisible(false)}
      >
        <Input placeholder='请输入分类名称' onChange={(e) => setCategory({ ...category, name: e.target.value })} />
      </Modal>

      <Modal
        title={'添加分类名称'}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <Input placeholder='请输入分类名称' onChange={(e) => setCategory({ ...category, name: e.target.value })} />
      </Modal>


      <Card title={<Title
        list={selectList}
        click={reloadList}
      />} extra={
        <Button type='primary' icon={<PlusOutlined />} onClick={() => setVisible(true)}>添加</Button>
      } style={{ height: '100vh' }}>
        <Table<API.Category> dataSource={list} rowKey={'id'}
                             pagination={{
                               defaultCurrent: 1,
                               defaultPageSize: pageSize,
                               total: total,
                             }}
        >
          <Table.Column<API.Category> title='Name' dataIndex='name' />
          <Table.Column<API.Category> title='操作' render={(_, data) => {
            return (
              <>
                <Button onClick={() => changeCategory(data)}>修改分类</Button>
                <Button onClick={() => checkChild(data)}>查看子分类</Button>
              </>
            );
          }} />

        </Table>
      </Card>
    </>
  );
};

export default Category;
