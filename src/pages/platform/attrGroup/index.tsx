import { Button, Card, Input, Layout, Modal, Table } from 'antd';
import CateTree from '@/components/CateTree';
import { useRequest } from 'ahooks';
import { addAttrGroups, categoryList, getAttrGroups } from '@/service/api';
import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;
export default function() {
  const { run, data } = useRequest(getAttrGroups, {
    manual: true,
  });
  const {  run:addRun } = useRequest(addAttrGroups, {
    manual: true,
  });
  const [addVisible, setAddVisible] = useState(false);
  const [relateVisible, setRelateVisible] = useState(false);
  const [addConfirmLoading, setAddConfirmLoading] = useState(false);
  const inputEl = useRef<Input | null>(null)
  const addOk = () => {
    addRun({name:inputEl.current?.input.value,catId}).then(_ => setAddVisible(false));
  };
  const [catId,setCatId] = useState(0)
  const AddModel = () => {
    return (
      <Modal
        title={'添加属性'}
        visible={addVisible}
        onOk={addOk}
        onCancel={() => setAddVisible(false)}
        confirmLoading={addConfirmLoading}
      >
        <Input placeholder='请输入属性名称' ref={inputEl} />
      </Modal>

    );
  };
  return (
    <>
      <AddModel />
      <Layout>
        <Sider style={{ height: '100vh', backgroundColor: 'white' }}>
          <CateTree selected={(key) => {
            run({ currentPage: 1, pageSize: 5, id: Number(key) });
            setCatId(Number(key))
          }} />
        </Sider>
        <Layout>
          <Card
            extra={
              <Button type='primary' icon={<PlusOutlined />} onClick={() => setAddVisible(true)}>添加</Button>
            }
          >
            <Table<API.AttrGroup>
              dataSource={data?.data?.list} rowKey={'id'}
              pagination={{
                defaultCurrent: 1,
                defaultPageSize: 5,
                total: data?.data?.totalCount,
                onChange: function(page, size) {
                  run({ currentPage: page, pageSize: size, id:catId });
                },
              }}
            >
              <Table.Column<API.AttrGroup> title='分组id' dataIndex='id' />
              <Table.Column<API.AttrGroup> title='Name' dataIndex='name' />
              <Table.Column<API.AttrGroup> title='所属分类ID' dataIndex='catId' />
              <Table.Column<API.AttrGroup> title='操作' render={()=>{
                return(
                  <>
                    <Button onClick={()=>{setRelateVisible(true)}}>关联</Button>
                  </>
                )
              }} />
            </Table>
          </Card>
        </Layout>
      </Layout>
    </>
  );
}
