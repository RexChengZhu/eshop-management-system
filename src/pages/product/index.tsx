import React, { useEffect, useState } from 'react';
import { Link } from 'umi';
import { Button, Card, Dropdown, Input, Menu, Table } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { productList } from '@/service/api';
import TableSearch from '@/components/TableSearch';



const Product = () => {

    const { run } = useRequest(productList, { manual: true });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [keyword, setKeyword] = useState('');
    const [data, setData] = useState<API.Page<API.Product>>();
    useEffect(() => {
      query();
    }, []);

    const query = () => {
      run({ page, pageSize, keyword }).then(onSuccess => {
        setData(onSuccess.data);
      }).catch(error => {

      });
    };
    const add = () => {

    };


    const changeStatus = (id: number, status: number) => {

    };

    return (
      <>
        <Card title={<TableSearch search={() => {
        }} />} extra={
          <Button type='primary' icon={<PlusOutlined />} onClick={add}>添加</Button>
        } style={{ height: '100vh' }}>

          <Table<API.Product> dataSource={data?.list} rowKey={'id'}
                              pagination={{
                                defaultCurrent: page,
                                defaultPageSize: pageSize,
                                total: data?.totalCount,
                                onChange: function(page,size){
                                  setPage(page);
                                  setPageSize(size!);
                                  query()
                                },
                              }}
          >
            <Table.Column<API.Product> title='商品名称' dataIndex='name' />
            <Table.Column<API.Product> title='商品描述' dataIndex='desc' />
            <Table.Column<API.Product> title='价格' dataIndex='price' render={(price) => {
              return (
                <>
                  ${price}
                </>
              );
            }} />
            <Table.Column<API.Product> title='状态' dataIndex='status' render={(_, data) => {
              const { status, id } = data;
              const btn = status === 1 ? (
                <Button onClick={() => changeStatus(id!, 0)}>下架</Button>
              ) : (
                <Button onClick={() => changeStatus(id!, 1)}>上架</Button>
              );
              return (
                <>
                  {
                    btn
                  }
                  {status === 1 ? '在售' : '下架'}
                </>
              );
            }} />
            <Table.Column<API.Product> title='状态' dataIndex='status' render={(_, { id }) => {
              return (
                <>
                  <Link to={'/product/addupdate/detail?' + id}>详情</Link>
                  <Link to={''}>修改</Link>
                </>
              );
            }} />
          </Table>
        </Card>
      </>
    );
  }
;

export default Product;
