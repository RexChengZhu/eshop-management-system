import { connect } from 'umi';
import { Button, Card, Form, Input, Layout, Modal, Switch, Table, TreeSelect } from 'antd';
import { AttrGroup, AttrGroupDispatchProps, AttrGroupStateType } from '@/pages/platform/attrGroup/data.t';
import { Category, CategoryStateType } from '@/pages/category/data.t';
import React, { useEffect, useState } from 'react';
import CateTree from '@/components/CateTree';
import TableSearch from '@/components/TableSearch';
import { PlusOutlined } from '@ant-design/icons';
import UploadTool from '@/components/Upload';
import { DataNode } from 'rc-tree/lib/interface';
import { Brand } from '@/pages/brand/data.t';

const { Sider } = Layout;


const Index = (props: any) => {

  const { cateTree, add, del, update, getList }: AttrGroupDispatchProps = props;
  const { totalCount, list }: AttrGroupStateType = props;
  useEffect(() => {
    cateTree();
  }, []);
  const { tree }: CategoryStateType = props;
  const [category, setCategory] = useState<Category>();
  const [visible, setVisible] = useState(false);
  const AddAttrGroup = () => {
    const [form] = Form.useForm();
    const getDataNode = (list?: Category[]): DataNode[] => {
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
    const [selectCat, setSelectCat] = useState<Category | null>(category || null);
    return (
      <>
        <Modal
          title={'新增属性分组'}
          onOk={() => {
            form.setFieldsValue({ catId: selectCat?.id });
            add({ ...form.getFieldsValue() }).then(_ => {
              getList({ catId: category?.id });
              setVisible(false);
            });
          }}
          onCancel={() => {
            setVisible(false);
          }}
          visible={visible}
        >
          <Form
            name='basic'
            form={form}
          >
            <Form.Item
              label='组名'
              name='attrGroupName'
              rules={[{ required: true, message: '请输入名称' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='排序'
              name='sort'
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='描述'
              name='descript'
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='组图标'
              name='icon'
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
              label='分类'
              name={'catId'}
              initialValue={category?.name || ''}
            >
              <TreeSelect
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={getDataNode(tree)}
                placeholder='Please select'
                treeDefaultExpandAll
                onChange={(item: string, node) => {
                  setSelectCat({ id: Number(item) });
                }}
              />
            </Form.Item>

          </Form>
        </Modal>
      </>
    );
  };
  return (
    <>
      <AddAttrGroup />
      <Layout>
        <Sider>
          <CateTree selected={(item) => {
            getList({ catId: item.id });
            setCategory(item);
          }} list={tree} />
        </Sider>
        <Layout>
          <Card
            title={<TableSearch search={(item) => {
            }} />}
            extra={
              <Button type='primary' icon={<PlusOutlined />} onClick={() => {
                setVisible(true);
              }}>添加</Button>
            }
          >
            <Table<AttrGroup>
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
              <Table.Column<AttrGroup> title='分组id' dataIndex='id' />
              <Table.Column<AttrGroup> title='组名' dataIndex='attrGroupName' />
              <Table.Column<AttrGroup> title='排序' dataIndex='sort' />
              <Table.Column<AttrGroup> title='描述' dataIndex='descript' />
              <Table.Column<AttrGroup> title='组图标' dataIndex='icon' />
              <Table.Column<AttrGroup> title='所属分类id' dataIndex='catId' />
              <Table.Column<Brand> title='操作' dataIndex='id' render={(_, data) => {
                return (
                  <>
                    <a href='#!' onClick={() => {

                    }}>关联分类</a>
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
                          del(data.id).then(_ => {
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
        </Layout>
      </Layout>
    </>
  );
};
const mapStateToProps = ({ attrGroup, category }: { attrGroup: AttrGroupStateType, category: CategoryStateType }) => {
  return { ...attrGroup, tree: category.tree };
};
const mapDispatchToProps = (dispatch: any): AttrGroupDispatchProps => ({
  getList: (data?: any) => dispatch({ type: 'attrGroup/getListAsync', payload: data }),
  add: (data?: any) => dispatch({ type: 'attrGroup/add', payload: data }),
  del: (data?: any) => dispatch({ type: 'attrGroup/del', payload: data }),
  update: (data?: any) => dispatch({ type: 'attrGroup/update', payload: data }),
  cateTree: (data?: any) => dispatch({ type: 'category/getCategoryTree', payload: data }),

});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
