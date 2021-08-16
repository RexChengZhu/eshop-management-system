import { useRequest } from 'ahooks';
import { addBrand, brandList, delBrand } from '@/service/api';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, Modal, Switch, Table } from 'antd';
import TableSearch from '@/components/TableSearch';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import UploadTool from '@/components/Upload';

const Brand = () => {
  const { run } = useRequest(brandList, { manual: true });
  const {run:addR} = useRequest(addBrand,{manual:true})
  const {run:deleteR} = useRequest(delBrand,{manual:true})
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState<API.Page<API.Brand>>();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [logo, setLogo] = useState<string[]>();
  useEffect(() => {
    query();
  }, []);

  const query = () => {
    run({ page, pageSize, keyword }).then(onSuccess => {
      setData(onSuccess.data);
    }).catch(error => {

    });
  };
  const del = (id:number)=>{
    deleteR(id).then(success=>{
      query();
    })
  }

  const onFinish = (data:API.Brand)=>{
    data.status = data.status === true ? 1 : 0;
    if (logo != undefined){
      data.logoUrl = logo[0]
    }
    addR(data).then(_=>{
      setVisible(false)
      form.resetFields
      query();
    })
  }
  return (
    <>
      <Modal
        title={'添加品牌'}
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            label='品牌名'
            name='name'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label='品牌logo'

          >
            <UploadTool
              onIChange={(list: string[]) => {
                console.log("logo----",list)
                setLogo([...list]);
              }}
            >
              <Button icon={<UploadOutlined />}>上传图片</Button>
            </UploadTool>
          </Form.Item>

          <Form.Item
            label='介绍'
            name='desc'
            rules={[{ required: true, message: 'Please input desc!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='显示状态'
            name='status'
            valuePropName='checked'
          >
            <Switch defaultChecked  />
          </Form.Item>

          <Form.Item
            label='检索首字母'
            name='searchKey'
            rules={[{ required: true, message: 'Please input desc!' }]}
          >
            <Input />
          </Form.Item>


          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              添加
            </Button>
          </Form.Item>
        </Form>
      </Modal>


      <Card title={<TableSearch search={setKeyword} />} extra={
        <Button type='primary' icon={<PlusOutlined />} onClick={() => setVisible(true)}>添加</Button>
      } style={{ height: '100vh' }}>

        <Table<API.Brand> dataSource={data?.list} rowKey={'id'}
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
          <Table.Column<API.Brand> title='品牌id' dataIndex='id' />
          <Table.Column<API.Brand> title='品牌名称' dataIndex='name' />
          <Table.Column<API.Brand> title='品牌logo' dataIndex='logoUrl' render={(url)=>{
            return(
              <>
                <img src={url} alt='' style={{width:'100px'}} />
              </>
            )
          }}/>
          <Table.Column<API.Brand> title='描述' dataIndex='desc' />
          <Table.Column<API.Brand> title='状态' dataIndex='status' />
          <Table.Column<API.Brand> title='检索首字母' dataIndex='searchKey' />

          <Table.Column<API.Brand> title='操作' dataIndex='id' render={(_, data) => {
            return (
              <>
                <a href='javascript:;' onClick={() => {
                }}>修改</a>
                &nbsp;&nbsp;
                <a href='javascript:;' onClick={() => {
                  del(data.id!)
                }}>删除</a>
              </>
            );
          }} />
        </Table>
      </Card>
    </>
  );
};
export default Brand;
