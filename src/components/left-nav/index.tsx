import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  ScissorOutlined,
  BgColorsOutlined,
  HeatMapOutlined,
  CodeSandboxOutlined
} from '@ant-design/icons';
import './index.less'
import logo from '../../assets/images/logo.png'
import {Link} from 'umi'
import { useState } from 'react';
const { SubMenu } = Menu;
const {Sider} = Layout;
const LeftNav = () => {

  const [collapsed,setCollapsed] = useState(false);

  return (
    <Sider  collapsible collapsed={collapsed} onCollapse={setCollapsed} >
      <div className="logo">
        <img src={logo} />
        <h1 hidden={collapsed}>后台管理</h1>
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to={'/home'}>首页</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<CodeSandboxOutlined />} title="商品">
          <Menu.Item key="2" icon={<ScissorOutlined />}>
            <Link to={{pathname:'/category',state:{peter:'dsdsdsd'}}}>品类管理</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<BgColorsOutlined />}>
            <Link to={{pathname:'/brand',state:{peter:'haha'}}} >商品管理</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="4" icon={<UserOutlined />}>
          <Link to={'user'} >用户管理</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<HeatMapOutlined />}>
          <Link to={'role'}>角色管理</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<HeatMapOutlined />}>
          <Link to={'chart'}>图表管理</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default LeftNav;

