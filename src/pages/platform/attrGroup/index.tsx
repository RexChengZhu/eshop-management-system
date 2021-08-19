import { Button, Layout, Table } from 'antd';
import CateTree from '@/components/CateTree';
import { useRequest } from 'ahooks';
import { getAttrGroups } from '@/service/api';
import React, { useState } from 'react';

const { Header, Footer, Sider, Content } = Layout;
export default function() {
  const { run, data } = useRequest(getAttrGroups, {
    manual: true,
  });
  const [catId,setCatId] = useState(0)
  return (
    <>
      <Layout>
        <Sider style={{ height: '100vh', backgroundColor: 'white' }}>
          <CateTree selected={(key) => {
            run({ currentPage: 1, pageSize: 5, pid: Number(key) });
            setCatId(Number(key))
          }} />
        </Sider>
        <Layout>
          <Table<API.AttrGroup>
            dataSource={data?.data?.list} rowKey={'id'}
            pagination={{
              defaultCurrent: 1,
              defaultPageSize: 5,
              total: data?.data?.totalCount,
              onChange: function(page, size) {
                run({ currentPage: page, pageSize: size, pid:catId });
              },
            }}
          >
            <Table.Column<API.AttrGroup> title='Name' dataIndex='name' />
          </Table>
        </Layout>
      </Layout>
    </>
  );
}
