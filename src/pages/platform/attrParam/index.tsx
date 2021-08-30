import { connect } from 'umi';
import { AttrGroup, AttrGroupStateType } from '@/pages/platform/attrGroup/data.t';
import { Category, CategoryStateType } from '@/pages/category/data.t';
import { AttrParam, AttrParamDispatchProps, AttrParamStateType } from '@/pages/platform/attrParam/data.t';
import { Button, Card, Form, Input, Layout, Modal, Table, TreeSelect, Select, Switch } from 'antd';
import CateTree from '@/components/CateTree';
import TableSearch from '@/components/TableSearch';
import { PlusOutlined } from '@ant-design/icons';
import { Brand } from '@/pages/brand/data.t';
import React, { useEffect, useState } from 'react';
import UploadTool from '@/components/Upload';

const { Option } = Select;
const { Sider } = Layout;
const Index = (props: any) => {
  const { nodes, }: CategoryStateType = props;
  const { groupList,list,totalCount } = props;
  const { add, getList }: AttrParamDispatchProps = props;
  useEffect(() => {
    getList();
  }, []);

  const [category, setCategory] = useState<Category>();
  const [visible, setVisible] = useState(false);
  const AddAttrGroup = () => {
    const [form] = Form.useForm();
    const [selectCat, setSelectCat] = useState<Category | null>(category || null);

    return (
      <>
        <Modal
          title={'新增规格参数'}
          onOk={() => {
            console.log(form.getFieldsValue());
            add(form.getFieldsValue()).then(_ => {
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
              label='属性名'
              name='attrName'
              rules={[{ required: true, message: '请输入名称' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='属性类型'
              name='attrType'
              rules={[{ required: true, message: '请输入名称' }]}
              initialValue={1}

            >
              <Select defaultValue='规格参数' style={{ width: 120 }} onChange={() => {

              }}>
                <Option value={1}>规格参数</Option>
                <Option value={2}>销售属性</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label='只能单值'
              name='single'
              rules={[{ required: true, message: '请输入名称' }]}
              initialValue={1}
            >
              <Switch defaultChecked={true} onChange={(showStatus) => {
                form.setFieldsValue({ single: showStatus ? 1 : 0 });
              }} />
            </Form.Item>

            <Form.Item
              label='可选值'
              name='valueSelect'
              rules={[{ required: true, message: '请输入名称' }]}
            >
              <Select mode='tags' style={{ width: '100%' }} onChange={() => {

              }} tokenSeparators={[',']}>

              </Select>
            </Form.Item>

            <Form.Item
              label='属性图标'
              name='icon'
              rules={[{ required: true, message: '请输入名称' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='分类'
              name={'catelogId'}
              initialValue={category?.name || ''}
            >
              <TreeSelect
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={nodes}
                placeholder='Please select'
                treeDefaultExpandAll
                onChange={(item: string, node) => {
                  setSelectCat({ id: Number(item) });
                }}
              />
            </Form.Item>

            <Form.Item
              label={'所属分组'}
            >
              <Select mode='tags' style={{ width: '100%' }} onChange={() => {

              }} tokenSeparators={[',']}>
                {
                  groupList?.map((item:any) => {
                    return <Option value={item.id!}>{item.attrGroupName}</Option>;
                  })
                }
              </Select>
            </Form.Item>

            <Form.Item
              label={'可检索'}
              name={'searchType'}
              initialValue={1}
            >
              <Switch defaultChecked={true} onChange={(showStatus) => {
                form.setFieldsValue({ searchType: showStatus ? 1 : 0 });
              }} />
            </Form.Item>

            <Form.Item
              label={'快速展示'}
              name={'showDesc'}
              initialValue={1}
            >
              <Switch defaultChecked={true} onChange={(showStatus) => {
                form.setFieldsValue({ showDesc: showStatus ? 1 : 0 });
              }} />
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
          <CateTree selected={(item:Category) => {
            setCategory(item);
          }} />
        </Sider>
        <Layout>
          <Card
            title={<TableSearch
              search={(item) => {

              }}
              searchAll={(item) => {

              }}
            />}
            extra={
              <Button type='primary' icon={<PlusOutlined />} onClick={() => {
                setVisible(true);
              }}>添加</Button>
            }
          >
            <Table<AttrParam>
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
              <Table.Column<AttrParam> title='id' dataIndex='id' />
              <Table.Column<AttrParam> title='属性名' dataIndex='attrName' />
              <Table.Column<AttrParam> title='可检索' dataIndex='searchType' />
              {/*<Table.Column<AttrGroup> title='值类型' dataIndex='' />*/}
              <Table.Column<AttrParam> title='图标' dataIndex='icon' />
              <Table.Column<AttrParam> title='可选值' render={(item)=>{
                return (
                  <>
                    {
                      item.valueSelect.join(',')
                    }
                  </>
                )
              }} />
              <Table.Column<AttrParam> title='启用' dataIndex='enable' />
              <Table.Column<AttrParam> title='所属分类' dataIndex='catName' />
              <Table.Column<AttrParam> title='所属分组' dataIndex='groupName' />

            </Table>

          </Card>
        </Layout>
      </Layout>
    </>
  );
};
const mapStateToProps = ({ attrGroup, category ,attrParam}: { attrGroup: AttrGroupStateType, category: CategoryStateType,attrParam:AttrParamStateType }) => {
  return {
    ...attrParam,
    nodes: category.nodes,
    tree: category.tree,
    groupList: attrGroup.list
  };
};
const mapDispatchToProps = (dispatch: any): AttrParamDispatchProps => ({
  getList: (data?: any) => dispatch({ type: 'attrParam/getListAsync', payload: data }),
  add: (data?: any) => dispatch({ type: 'attrParam/add', payload: data }),
  del: (data?: any) => dispatch({ type: 'attrParam/del', payload: data }),
  update: (data?: any) => dispatch({ type: 'attrParam/update', payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
