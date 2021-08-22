import { connect,Link } from 'umi';
import { Brand, BrandDispatchProps, BrandStateType } from '@/pages/brand/data.t';
import { CategoryDispatchProps, CategoryStateType } from '@/pages/category/data.t';
import { Button, Card, Modal, Table, Switch, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import TableSearch from '@/components/TableSearch';
import UploadTool from '@/components/Upload';


const Index = (props: any) => {
  const { getList, addBrand, deleteBrand, updateBrand }: BrandDispatchProps = props;
  const { list, totalCount }: BrandStateType = props;
  const [visible, setVisible] = useState(false);
  const AddModel = () => {
    const [form] = Form.useForm();
    return (
      <>
        <Modal
          visible={visible}
          title={'新增商品'}
          onCancel={() => setVisible(false)}
          onOk={() => {
            addBrand({ ...form.getFieldsValue() }).then(_ => {
              setVisible(false);
              getList();
            });
          }}
          destroyOnClose={true}
        >
          <Form
            name='basic'
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            form={form}
          >
            <Form.Item
              label='品牌名称'
              name='name'
              rules={[{ required: true, message: '请输入品牌名称' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='品牌logo'
              name='logo'
            >
              <UploadTool
                onIChange={(list: string[]) => {
                  console.log(list);
                  if (list.length > 0) {
                    form.setFieldsValue({ logo: list[0] });
                  }
                }}
              />
            </Form.Item>

            <Form.Item
              label='品牌描述'
              name='descript'
            >
              <Input />
            </Form.Item>


            <Form.Item
              label='显示状态'
              name='showStatus'
              valuePropName={'checked'}
              initialValue={1}
            >
              <Switch defaultChecked={true} onChange={(showStatus) => {
                form.setFieldsValue({ showStatus: showStatus ? 1 : 0 });
              }} />
            </Form.Item>
            <Form.Item
              label='首字母检索'
              name='firstLetter'
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='排序'
              name='sort'
            >
              <Input />
            </Form.Item>

          </Form>
        </Modal>
      </>
    );
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <AddModel />
      <Card
        title={
          <TableSearch search={(data) => {
            getList({ data });
          }} />
        }
        extra={
          <Button type='primary' icon={<PlusOutlined />} onClick={() => setVisible(true)}>添加</Button>
        }
      >
        <Table<Brand>
          dataSource={list} rowKey={'id'}
          pagination={{
            defaultCurrent: 1,
            defaultPageSize: 10,
            total: totalCount,
            onChange: function(currentPage, pageSize) {
              getList({ currentPage, pageSize });
            },
          }}
        >
          <Table.Column<Brand> title='品牌id' dataIndex='id' />
          <Table.Column<Brand> title='品牌名称' dataIndex='name' />
          <Table.Column<Brand> title='品牌logo' dataIndex='logo' render={(url) => {
            return (
              <>
                <img src={url} alt='' style={{ width: '100px' }} />
              </>
            );
          }} />
          <Table.Column<Brand> title='描述' dataIndex='descript' />
          <Table.Column<Brand> title='显示状态' dataIndex='showStatus' render={(status) => {
            return (
              <Switch checked={status === 1} />
            );
          }} />
          <Table.Column<Brand> title='检索首字母' dataIndex='firstLetter' />
          <Table.Column<Brand> title='排序' dataIndex='sort' />
          <Table.Column<Brand> title='操作' dataIndex='id' render={(_, data) => {
            return (
              <>
                <Link to={{
                  pathname:"/brand/category-relation/",
                  search:"id="+data.id
                }}  >
                  关联分类
                </Link>

                &nbsp;&nbsp;
                <a href='#!' onClick={() => {

                }}>修改</a>
                &nbsp;&nbsp;
                <a href='#!' onClick={() => {
                  const modal = Modal.confirm({
                    title: '提示',
                    okText: '确定',//默认为确认
                    cancelText: '取消',//默认为取消
                    //默认false。默认关闭后状态不会自动清空, 如果希望每次打开都是新内容需要设置true
                    content: '是否删除该商品',
                    onOk() {
                      //调用点击确定时回调的方法
                      deleteBrand(data.id).then(_ => {
                        getList();
                      });
                    },
                    onCancel() {
                      modal.destroy();//这是调用Modal.confirm()后返回的引用，可以通过该引用更新和关闭弹窗
                    },
                  });
                }}>删除</a>
              </>
            );
          }} />

        </Table>
      </Card>
    </>
  );
};
const mapStateToProps = ({ brand }: { brand: BrandStateType }) => {
  return { ...brand };
};
const mapDispatchToProps = (dispatch: any): BrandDispatchProps => ({
  getList: (data?: any) => dispatch({ type: 'brand/getListSync', payload: data }),
  addBrand: (data?: any) => dispatch({ type: 'brand/add', payload: data }),
  deleteBrand: (data?: any) => dispatch({ type: 'brand/delete', payload: data }),
  updateBrand: (data?: any) => dispatch({ type: 'brand/update', payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
