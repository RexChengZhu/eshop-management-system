import { connect, Link } from 'umi';

import React, { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { getList } from '@/pages/platform/attrGroup/attrGroupRelate/service';
import { AttrParam } from '@/pages/platform/attrParam/data.t';
import { Button, Card, Modal, Table } from 'antd';
import { AttrGroup } from '@/pages/platform/attrGroup/data.t';
import { Brand } from '@/pages/brand/data.t';
import TableSearch from '@/components/TableSearch';
import { PlusOutlined } from '@ant-design/icons';

const Index = (props: any) => {
  const { id } = props.location.query;
  const { name } = props.location.state;
  const { run } = useRequest(getList);
  const [list, setList] = useState<AttrParam[]>();
  useEffect(() => {
    run(id).then(result => {
      const { data } = result;
      setList(data);
    });
  }, []);
  return (
    <>
      <Card
        title={<TableSearch search={(item) => {
        }} />}
        extra={
          <Button type='primary' icon={<PlusOutlined />} onClick={() => {

          }}>添加</Button>
        }
      >
        <Table<AttrParam>
          dataSource={list} rowKey={'id'}

        >
          <Table.Column<AttrParam> title='属性id' dataIndex='id' />
          <Table.Column<AttrParam> title='属性名' dataIndex='attrName' />
          <Table.Column<AttrParam> title='可选值' dataIndex={'valueSelect'} render={(list) => {
            return (
              <>
                {
                  list.map((item: string) => {
                    return item + ',';
                  })
                }
              </>
            );
          }} />
          <Table.Column<AttrParam> title='操作' render={(_, data) => {
            return (
              <>

              </>
            );
          }} />


        </Table>
      </Card>
    </>

  );
};
const mapStateToProps = (state: any) => {
  return { ...state };
};
const mapDispatchToProps = (dispatch: any) => ({
  getList: (data?: any) => dispatch({ type: 'attrGroupRelate/getListAsync', payload: data }),
  add: (data?: any) => dispatch({ type: 'attrGroupRelate/add', payload: data }),
  del: (data?: any) => dispatch({ type: 'attrGroupRelate/del', payload: data }),
  update: (data?: any) => dispatch({ type: 'attrGroupRelate/update', payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);

