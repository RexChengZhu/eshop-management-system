import { IRouteComponentProps } from 'umi'

import { Layout } from 'antd';
import Header from '../components/header'
import LeftNav from '../components/left-nav'

const {  Footer, Content } = Layout;
export default function index({ children, location, route, history, match }: IRouteComponentProps) {
  if (location.pathname === '/') history.replace('/home')
  return (
    <div>
      <Layout style={{height:"100vh"}}>
        <LeftNav />
        <Layout>
          <Header />
          <Content>
            {children}
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </div>

  )
}
