import { Button, Card, Form, Input, Modal, Switch, Table, TreeSelect } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { addBrand, addBrandCat, brandCatList, brandList, categoryList } from '@/service/api';
import UploadTool from '@/components/Upload';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { DataNode } from 'rc-tree/lib/interface';

interface IAddBrand {
  addSuccess: () => void
}

const AddBrand = ({ addSuccess }: IAddBrand) => {
  const [form] = Form.useForm();
  const { run } = useRequest(addBrand, {
    manual: true,
  });
  const onFinish = (form: any) => {
    run(form).then(_ => {
      addSuccess();
    });
  };
  return (
    <>
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
          rules={[{ required: true, message: '请输入品牌名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='品牌logo'
                   name={'logo'}
        >
          <UploadTool
            onIChange={(list: string[]) => {
              form.setFieldsValue({ logo: list });
            }}
          >
            <Button icon={<UploadOutlined />}>上传图片</Button>
          </UploadTool>
        </Form.Item>

        <Form.Item
          label='介绍'
          name='desc'
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='显示状态'
          name='status'
          valuePropName='checked'
          initialValue={true}
        >
          <Switch defaultChecked />
        </Form.Item>

        <Form.Item
          label='检索首字母'
          name='searchKey'
        >
          <Input />
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            添加
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const BrandCat = () => {
  const { data, run: listRun } = useRequest(brandCatList, {
    manual: true,
  });
  const { data:catlist } = useRequest(categoryList);

  useEffect(() => {
    listRun({ currentPage: 1, pageSize: 5 });
  }, []);
  const { run } = useRequest(addBrandCat, {
    manual: true,
  });
  const [list, setList] = useState<DataNode[]>();
  useEffect(() => {
    const list = getDataNode(catlist?.data?.list!);
    setList(list);
  }, [catlist]);
  const getDataNode = (list: API.Category[]): DataNode[] => {
    if (list == undefined) {
      return [];
    }
    return list.map(item => {
      const length = item.subList?.length || 0;
      const data: DataNode = { key: item.id + '', title: item.name };
      if (length > 0) {
        data['children'] = getDataNode(item.subList!);
      }
      return data;
    });
  };
  const [selectCatList,setSelectCatList] = useState<{id:number,name:string}[]>()
  return (
    <>
      <TreeSelect
        treeCheckable={true}
        showCheckedStrategy={'SHOW_PARENT'}
        style={{
          width: '400px',
        }}
        onChange={(value:string[],list:ReactNode[])=>{
          const mm:string[] = list.map((item:ReactNode)=>{
            return  item!.toString()
          });
          const arr = []
          for (let i = 0; i < mm.length; i++) {
            const name = mm[i];
            const id = Number(value[i]);
            arr.push({id,name})
          }
          setSelectCatList(arr)
        }}
        treeData={list}
      />
      <Button onClick={() => {
        debugger
        run({selectCatList}).then(_ => {
          listRun({ currentPage: 1, pageSize: 5 });
        });
      }}>添加关联</Button>
      <Table<API.BrandCat>
        dataSource={data?.data?.list} rowKey={'id'}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 5,
          total: data?.data?.totalCount,
          onChange: function(page, size) {
            listRun({ currentPage: page, pageSize: size });
          },
        }}
      >
        <Table.Column<API.BrandCat> title='关联分类' dataIndex='catName' />
      </Table>

    </>
  );
};

export default function() {
  const { data, run } = useRequest(brandList, {
    manual: true,
  });
  useEffect(() => {
    run({ currentPage: 1, pageSize: 5 });
  }, []);

  const [visible, setVisible] = useState(false);
  const [brandCatVisible, setBrandCatVisible] = useState(false);
  return (
    <>
      <Modal
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        destroyOnClose={true}
      >
        <AddBrand
          addSuccess={() => {
            setVisible(false);
            run({ currentPage: 1, pageSize: 5 });
          }}
        />
      </Modal>

      <Modal
        visible={brandCatVisible}
        footer={null}
        onCancel={() => setBrandCatVisible(false)}
        destroyOnClose={true}
      >
        <BrandCat />
      </Modal>

      <Card
        extra={
          <Button type='primary' icon={<PlusOutlined />} onClick={() => setVisible(true)}>添加</Button>
        }
      >
        <Table<API.Brand>
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
          <Table.Column<API.Brand> title='品牌id' dataIndex='id' />
          <Table.Column<API.Brand> title='品牌名称' dataIndex='name' />
          <Table.Column<API.Brand> title='品牌logo' dataIndex='logoUrl' render={(url) => {
            return (
              <>
                <img src={url} alt='' style={{ width: '100px' }} />
              </>
            );
          }} />
          <Table.Column<API.Brand> title='描述' dataIndex='desc' />
          <Table.Column<API.Brand> title='状态' dataIndex='status' render={(status) => {
            return (
              <>
                {status === 0 ? '上线' : '下线'}
              </>
            );
          }} />
          <Table.Column<API.Brand> title='检索首字母' dataIndex='searchKey' />

          <Table.Column<API.Brand> title='操作' dataIndex='id' render={(_, data) => {
            return (
              <>
                <a href='javascript:;' onClick={() => {
                  setBrandCatVisible(true);
                }}>关联分类</a>
                &nbsp;&nbsp;
                <a href='javascript:;' onClick={() => {

                }}>修改</a>
                &nbsp;&nbsp;
                <a href='javascript:;' onClick={() => {

                }}>删除</a>
              </>
            );
          }} />

        </Table>
      </Card>
    </>
  );
}
