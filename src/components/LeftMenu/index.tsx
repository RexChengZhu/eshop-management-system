import { Menu } from 'antd';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  HeatMapOutlined,
  BlockOutlined,
  BugOutlined,
  TrademarkCircleOutlined,
  UsbOutlined,
} from '@ant-design/icons';
import { IRouteComponentProps, withRouter } from 'umi';

const { SubMenu } = Menu;
import { Link } from 'umi';
import './index.less';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useHistoryTravel } from 'ahooks';
import logo from "@/assets/images/logo.png"
/**
 * 定义侧边栏数据
 */
type LeftMenuItem = {
  key: string,
  icon: React.ReactNode,
  title: string,
  children?: LeftMenuItem[],
  parent?: string
}
const list: LeftMenuItem[] = [
  {
    key: '/home',
    title: '首页',
    icon: <HeatMapOutlined />,
  },
  {
    key: '/product_parent',
    title: '商品管理',
    icon: <MailOutlined />,
    children: [
      {
        key: '/category',
        title: '分类管理',
        icon: <BlockOutlined />,
        parent: '/product_parent',
      },
      {
        key: '/product',
        title: '商品管理',
        icon: <BugOutlined />,
        parent: '/product_parent',
      },
      {
        key: '/brand',
        title: '品牌管理',
        icon: <BugOutlined />,
        parent: '/product_parent',

      },
    ],
  },
  {
    key: '/platform_parent',
    title: '平台管理',
    icon: <MailOutlined />,
    children: [
      {
        key: '/attr_group',
        title: '属性分组',
        icon: <BlockOutlined />,
        parent: '/platform_parent',
      },
      // {
      //   key: '/attr_param',
      //   title: '参数规格',
      //   icon: <BugOutlined />,
      //   parent: '/platform_parent',
      // },
      {
        key: '/attr_sku',
        title: '销售属性',
        icon: <BugOutlined />,
        parent: '/platform_parent',
      },
    ],
  },
  {
    key: '/user',
    title: '用户管理',
    icon: <HeatMapOutlined />,
  },
  {
    key: '/role',
    title: '角色管理',
    icon: <HeatMapOutlined />,
  },
];

const LeftMenu = () => {
  const history = useHistory();
  const location = useLocation();

  const items = list.map(item => {
    if (item.children != undefined && item.children.length > 0) {
      return (<SubMenu key={item.key} icon={item.icon} title={item.title}>
          {
            item.children.map(inner => {
              return (
                <Menu.Item key={inner.key} icon={inner.icon}>
                  <Link to={inner.key}>{inner.title}</Link>
                </Menu.Item>
              );
            })
          }
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.key}>{item.title}</Link>
        </Menu.Item>
      );
    }
  });
  const path = "/" + location.pathname.split("/")[1]
  const selectKey = () => {


     const data = list.flatMap(item => item.children)
      .find(item => item != undefined && path === item.key);
     return  data?.parent || ''
  };
  return (
    <>
      <header className={'left-header'}>
        <img src={logo} alt=''  />
        <h1>后台管理</h1>
      </header>
      <Menu
        style={{ width: '100%' }}
        selectedKeys={[path]}
        defaultOpenKeys={[selectKey()]}
        mode='inline'
        theme='dark'
        className={'left-menu'}
      >
        {items}
      </Menu>
    </>
  );
};

export default LeftMenu;
