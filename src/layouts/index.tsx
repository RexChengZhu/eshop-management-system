import { IRouteComponentProps } from 'umi';

import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
import LeftMenu from '@/components/LeftMenu';

export default function Main({ children, location, route, history, match }: IRouteComponentProps) {

  if (location.pathname === '/') history.push('/home')
  return (
    <>
      <Layout style={{height:'100vh'}}>
        <Sider>
          <LeftMenu />
        </Sider>
        <Layout>
          {/*<Header>Header</Header>*/}
          {/*<Content>{children}</Content>*/}
          {/*<Footer>Footer</Footer>*/}
        </Layout>
      </Layout>
    </>
  );
}
