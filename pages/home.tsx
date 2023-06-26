import { Form, Input, Checkbox, Button, message } from 'antd'
import React from 'react'
import { useUser } from '../providers/user';
import { Login } from '../interfaces';

function home() {

  const { UserLogin, loginUser } = useUser();

  const onFinish = (values: Login) => {
    loginUser(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    message.warning("Failed to login check your credentials and try again")
  };

  return (
    <div >
      <Form

        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size='large'

      >
        <h1>LOGIN</h1>
        <div className="inner-form-container-update">


          <Form.Item
            label="Username"
            name="userNameOrEmailAddress"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
        </div>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="btn-group">
          <Button
            type="primary"
            htmlType="submit"
            className="submit-btn"
            style={{ backgroundColor: '' }}
          >
            Submit
          </Button>

          <Button type="link" className="signuplink-btn"
            href='/register'
          >
            Signup
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default home