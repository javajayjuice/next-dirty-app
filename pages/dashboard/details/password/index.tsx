import { Form, Input, Button } from 'antd';
import React from 'react'
import { ApplicantInputDto } from '../../../../interfaces';
import { useUser } from '../../../../providers/user';
import LayoutMain from '../../../../components/layoutMain';

const Index = () => {
    const [form] = Form.useForm();

    const { CreateUser, createUser } = useUser();

    const onFinish = (values: ApplicantInputDto) => {
        console.log('Success:', values);
        createUser(values);
        console.log(CreateUser)
        form.resetFields();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <LayoutMain>
            <div className='sectionMain' >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                >
                    <div className='sectionHeader'>
                        <h1>CHANGE PASSWORD</h1>
                    </div>
                    <div className='sectionSubMain' style={{ display: 'flex', justifyContent: "space-around" }}>
                        <div className='sectionA' style={{ width: '400px' }}>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your old password!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder='Old Password' />
                            </Form.Item>
                            <Form.Item
                                name="newPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your new password!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder='New Password' />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your new password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The new password that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder='Confirm New Password' />
                            </Form.Item>
                        </div>
                    </div>
                    <div className='sectionFooter'>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="btn-group">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="btn-update"
                            >
                                Update
                            </Button>
                            <Button
                                type="default" className="btn-cancel"
                                href='/authentication/login'
                            >
                                Cancel
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </LayoutMain>
    )
}

export default Index