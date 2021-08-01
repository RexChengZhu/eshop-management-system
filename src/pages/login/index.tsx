import './index.less'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Header from '../../components/login-register-header'
import {connect} from 'umi'
interface ILogin{
  login:Function
}
const LoginForm = (props:ILogin) => {
  const onFinish = (values: any) => {
    props.login(values)
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住密码</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          忘记密码？
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登陆
        </Button>
        Or <a href="/register">点击注册</a>
      </Form.Item>
    </Form>
  );
};

const index = (props:any)=>{



  return(
    <div className={'login'}>
      <Header />
      <div className={'login-content'}>
        <h1>用户登陆</h1>
        <LoginForm login={props.login}/>
      </div>
    </div>
  )
}
// 容器组件和ui组件链接
export default connect((state)=>{
  //
  return {...state}
},(dispatch)=>{
  return {
    login:function(data:any){
      dispatch({
        type:'login/loginAsync',
        payload:  data
      })
    }
  }
})(index);
