import './index.less'
import Header from '@/components/login-register-header';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {connect} from 'umi'
const RegisterForm = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
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
        rules={[
          { required: true, message: '请输入用户名!' },
          { min:4,message:"用户名不能少于4个字"},
          {
            pattern: /^[a-zA-Z0-9_]+$/,
            message:'账号只能已数字英文下划线'
          }
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>

      <Form.Item
        name="password"
        label=""
        rules={[
          {
            required: true,
            message: '请输入密码',
          }
        ]}
        hasFeedback
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"

        />
        {/*<Input.Password*/}
        {/*  prefix={<LockOutlined className="site-form-item-icon" }*/}
        {/*  placeholder={'请输入密码'}/>*/}
      </Form.Item>

      <Form.Item
        name="confirm"
        label=""
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '确认密码',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次密码不一致！'));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder={'请确认密码'}/>
      </Form.Item>



      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};


const index = ()=>{
  const register = ()=>{

  }
  return(
    <div className={'register'}>
      <Header />
      <div className='register-content'>
        <RegisterForm />
      </div>

    </div>
  )
}

export default connect((state)=>{

},(dispatch => {
  return {
    register:function(data:any){
      dispatch({
        type:'register/registerAsync',
        payload:data
      })
    }
  }
}))(index);
