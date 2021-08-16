import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined,HeatMapOutlined,BlockOutlined,BugOutlined,TrademarkCircleOutlined,UsbOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
import { Link } from 'umi';
import './index.less';

const LeftMenu = () => {
  return (
    <>
      <Menu
        style={{ width: '100%' }}
        defaultSelectedKeys={['/home']}
        defaultOpenKeys={['/home']}
        mode='inline'
        theme="dark"
        className={'left-menu'}
      >
        <Menu.Item key='/home' icon={<HeatMapOutlined />}>
          <Link to={'/home'}>首页</Link>
        </Menu.Item>
        <SubMenu key='sub1' icon={<MailOutlined />} title='商品管理'>
          <Menu.Item key='/category' icon={<BlockOutlined />}>
            <Link to={'/category'}>分类管理</Link>
          </Menu.Item>
          <Menu.Item key='/product' icon={<BugOutlined />}>
            <Link to={'/product'}>商品管理</Link>
          </Menu.Item>
          <Menu.Item key='/brand' icon={<BugOutlined />}>
            <Link to={'/brand'}>品牌管理</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key='sub2' icon={<MailOutlined />} title='平台管理'>
          <Menu.Item key='/attr_group' icon={<BlockOutlined />}>
            <Link to={'/platform/attr_group'}>属性分组</Link>
          </Menu.Item>
          <Menu.Item key='/attr_param' icon={<BugOutlined />}>
            <Link to={'/platform/attr_param'}>参数规格</Link>
          </Menu.Item>
          <Menu.Item key='/attr_sku' icon={<BugOutlined />}>
            <Link to={'/platform/attr_sku'}>销售属性</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='/user' icon={<UsbOutlined />}>
          <Link to={'/user'}>用户管理</Link>
        </Menu.Item>
        <Menu.Item key='/role' icon={<TrademarkCircleOutlined />}>
          <Link to={'/role'}>角色管理</Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default LeftMenu;
