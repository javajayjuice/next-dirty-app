import { message, Form, Input, Checkbox, Button } from 'antd';
import React from 'react'
import styles from './styles.module.scss'
import Navbar from '../../../../components/navbar';
import { Login } from '../../../../interfaces';
import { useUser } from '../../../../providers/user';

const index = () => {

    const {loginAdmin}=useUser()

    const onFinish = (values: Login) => {
        loginAdmin(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        message.warning("Failed to login check your credentials and try again")
    };

    return (
        <div >
                <Navbar></Navbar>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"

                >
                    <div className={styles.sectionMain}>
                        <div className={styles.sectionA}>
                            <h1 className={styles.sectionHead}>ADMIN</h1>

                            <Form.Item
                                name="userNameOrEmailAddress"
                                rules={[
                                    { required: true, message: "Please input your email address!" },
                                ]}
                                noStyle={true}
                            >
                                <Input placeholder="Email Address" className={styles.input} />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: "Please input your password!" }]}
                                noStyle={true}
                            >
                                <Input.Password placeholder="Password" className={styles.input} />
                            </Form.Item>

                            <Form.Item  >
                                <div className={styles.btnGroup}>

                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className={styles.submitBtn}
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        type="primary" className={styles.registerBtn}
                                        href='/authentication/register'
                                    >
                                        Register instead
                                    </Button>
                                </div>
                            </Form.Item>
                        </div>
                    </div>

                </Form>
            </div>
            
    )
}

export default index