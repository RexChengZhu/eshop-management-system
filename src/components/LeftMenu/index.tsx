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
          <Menu.Item key='/brand' icon={<BugOutlined />}>
            <Link to={'/brand'}>商品管理</Link>
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
