import React, { useEffect, useState ,useMemo} from 'react';
import { Card, Button, Table, Modal, Input,Breadcrumb } from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { getCategoryList, updateCategory } from '@/service/api';

const Category: React.FC = () => {
  const { data: result, run: listRun } = useRequest(() => getCategoryList());
  const { data: updateResult, run } = useRequest((category) => updateCategory(category), { manual: true });

  const changeCategory = (data: API.Category) => {
    setCategory({ ...data });
    setVisible(true);
  };
  const checkChild = (data: API.Category) => {
    setList([...data.subList || []]);
    const arr = [...selectList,data];
    debugger
    setSelectList(arr)
  };
  // 编辑分类选中的分类
  const [category, setCategory] = useState<API.Category>() || undefined;
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [curPage, setCurPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [list, setList] = useState<API.Category[]>([]) || [];
  // 被选中了的列表
  const [selectList,setSelectList] = useState<API.Category[]>([])
  useEffect(() => {
    listRun().then();
  }, []);
  useEffect(() => {

    setList([...result?.data?.list || []]);

  }, [result]);

  useEffect(() => {
    setConfirmLoading(false);
    setVisible(false);
    listRun().then();
  }, [updateResult]);
  const handleOk = () => {
    setConfirmLoading(true);
    run(category).then();
  };

  const Title = ()=>{

    let i = 0;
    let arr = selectList.map(item=>{
      ++i;
      if(selectList.length == 1){
        return(
          <>
            <Breadcrumb.Item>一级分类</Breadcrumb.Item>
          </>
        )
      }else{
        if (i === selectList.length){
          return (
            <>
              <Breadcrumb.Item>{item.name}</Breadcrumb.Item>
            </>
          )
        }else{
          return (
            <>
              <Breadcrumb.Item>
                <a href=''>{item.name}</a>
              </Breadcrumb.Item>
            </>
          )
        }
      }

    })
    arr = arr || ( <Breadcrumb.Item>一级分类</Breadcrumb.Item>)
    return (
      <Breadcrumb>
        {
          arr
        }
      </Breadcrumb>
    )
  };
  return (
    <>
      <Modal
        title={<Title/>}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <Input placeholder='请输入分类名称' onChange={(e) => setCategory({ ...category, name: e.target.value })} />
      </Modal>

      <Card  title={<Title />} extra={
        <Button type='primary' icon={<PlusOutlined />}>添加</Button>
      } style={{ height: '100vh' }}>
        <Table<API.Category> dataSource={list} rowKey={'id'}
                             pagination={{
                               current: 1,
                               defaultPageSize: 10,
                             }}
        >
          <Table.Column<API.Category> title='Name' dataIndex='name' />
          <Table.Column<API.Category> title='操作' render={(_, data) => {
            return (
              <>
                <Button onClick={() => changeCategory(data)}>修改分类</Button>
                <Button onClick={() => checkChild(data)}>查看子分类</Button>
              </>
            );
          }} />

        </Table>
      </Card>
    </>
  );
};

export default Category;
