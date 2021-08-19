import { Button, Card, Input, Layout, Modal, Table } from 'antd';
import TableSearch from '@/components/TableSearch';
import React, { useEffect, useState } from 'react';
import CateTree from '@/components/CateTree';
import { useRequest } from 'ahooks';
import { addAttrGroups, delAttrGroups, getAttrGroups } from '@/service/api';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'umi';

const { Sider } = Layout;
const attrGroup = () => {
  const [key, setKey] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { run: list } = useRequest(getAttrGroups, { manual: true });
  const { run: addR } = useRequest(addAttrGroups, { manual: true });
  const { run: delR } = useRequest(delAttrGroups, { manual: true });

  const [data, setData] = useState<API.Page<API.AttrGroup>>();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [name, setName] = useState('');
  const query = () => {
    list({ page, pageSize,data: {catId:Number(key) } }).then(success => {
      setData(success.data);
    }).catch(error => {

    });
  };
  useEffect(query, []);
  useEffect(query,[key])
  const handleOk = () => {
    addR({ name, catId: key }).then(_ => {
      query();
      setVisible(false)
    });
  };
  const del = (id: number) => {

  };
  return (
    <>
      <Modal
        title={'添加分组名称'}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <Input placeholder='请输入分类名称' onChange={(e) => setName(e.target.value)} />
      </Modal>
      <Layout style={{ height: '100vh' }}>
        <Sider style={{ height: '100vh' }}>
          <CateTree selected={(key)=>{
            setKey(key);
          }
          } />
        </Sider>
        <Layout>
          <Card title={<TableSearch search={() => {

          }} />} extra={
            <Button type='primary' icon={<PlusOutlined />} onClick={() => setVisible(true)}>添加</Button>
          } style={{ height: '100vh' }}>

            <Table<API.AttrGroup> dataSource={data?.list} rowKey={'id'}
                                  pagination={{
                                    defaultCurrent: page,
                                    defaultPageSize: pageSize,
                                    total: data?.totalCount,
                                    onChange: function(page, size) {
                                      setPage(page);
                                      setPageSize(size!);
                                      query();
                                    },
                                  }}
            >
              <Table.Column<API.AttrGroup> title='id' dataIndex='id' />
              <Table.Column<API.AttrGroup> title='分类id' dataIndex='catId' />
              <Table.Column<API.AttrGroup> title='分组名称' dataIndex='name' />

              <Table.Column<API.Product> title='状态' dataIndex='status' render={(_, { id }) => {
                return (
                  <>
                    <a href='javaScript:;' onClick={() => del(id!)}>删除</a>
                  </>
                );
              }} />
            </Table>

          </Card>
        </Layout>
      </Layout>
    </>
  );

};
export default attrGroup;
