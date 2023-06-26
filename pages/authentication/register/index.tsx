import { Form, Input, Button, DatePicker, Select, Radio, Checkbox } from 'antd';
import style from './styles.module.scss';
import form from 'antd/es/form';
import React, { FC, useEffect, useState } from 'react'
import { ApplicantInputDto } from '../../../interfaces';
import { useUser } from '../../../providers/user';
import { ReflistActivity, ReflistHomeLanguage, ReflistNatureOfDisability, ReflistPopulationGroup, ReflistTitle } from '../../../enums';
import Navbar from '../../../components/navbar';
import FooterCustom from '../../../components/footer';
import router from 'next/router';
import moment from 'moment';



const Hydrated: FC<any> = () => {
    const [hydrated, setHydrated] = useState(false)
    useEffect(() => {
        if (!hydrated) {
            setHydrated(true)
        }
    }, [])

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
    
        const languageOptions = Object.keys(ReflistHomeLanguage)
            .filter(key => typeof ReflistHomeLanguage[key] === 'number')
            .map(key => ({
                label: key,
                value: ReflistHomeLanguage[key]
            }));
    
        const natureOfDisabilityOptions = Object.keys(ReflistNatureOfDisability)
            .filter(key => typeof ReflistNatureOfDisability[key] === 'number')
            .map(key => ({
                label: key,
                value: ReflistNatureOfDisability[key]
            }));
    
        const titleOptions = Object.keys(ReflistTitle)
            .filter(key => typeof ReflistTitle[key] === 'number')
            .map(key => ({
                label: key,
                value: ReflistTitle[key]
            }));
    
        const populationGroupOptions = Object.keys(ReflistPopulationGroup)
            .filter(key => typeof ReflistPopulationGroup[key] === 'number')
            .map(key => ({
                label: key,
                value: ReflistPopulationGroup[key]
            }));
    
        const activityOptions = Object.keys(ReflistActivity)
            .filter(key => typeof ReflistActivity[key] === 'number')
            .map(key => ({
                label: key,
                value: ReflistActivity[key]
            }));
    
        const validateIdentityNumber = (_: any, value: string) => {
            if (/^\d{13}$/.test(value)) {
                const year = Number(value.substr(0, 2));
                const month = Number(value.substr(2, 2));
                const day = Number(value.substr(4, 2));
                const genderDigit = Number(value.substr(6, 4));
    
                const currentYear = new Date().getFullYear() % 100;
                const prefix = year < currentYear ? '20' : '19';
                const fullYear = Number(prefix + value.substr(0, 2));
    
                form.setFieldsValue({
                    dateOfBirth: moment(`${fullYear}-${month}-${day}`, 'YYYY-MM-DD'),
                    gender: genderDigit < 5000 ? 2 : 1 // 1 for male, 2 for female
                });
            }
            return Promise.resolve();
        };
    
        const validateEmail = (_: any, value: string) => {
            // Regular expression pattern for email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
            if (!emailPattern.test(value)) {
                return Promise.reject(new Error('Please enter a valid email address.'));
            }
    
            return Promise.resolve();
        };
    
        const validatePhoneNumber = (_: any, value: string) => {
            const phoneNumberPattern = /^\d{10}$/;
    
            if (!phoneNumberPattern.test(value)) {
                return Promise.reject(new Error('Please enter a valid phone number.'));
            }
    
            return Promise.resolve();
        };
    
        return (
            <>
                <Navbar></Navbar>
                <div className={`${style.sectionMain}`} >
                    <div className={`${style.path}`}></div>
                    <div className={style.regContainer}>
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            form={form}
                            className={style.form}
                        >
                            <h1 className={`${style.head} head`}>REGISTER</h1>
                            <div className={`${style.column} column`}>
                                <div className={`${style.part1} part1`}>
                                    <Form.Item
                                        name="name"
                                        rules={[{ required: true, message: "Please input your name!" }]}
    
                                    >
                                        <Input placeholder="Name" className={`${style.input} input`} />
                                    </Form.Item>
    
                                    <Form.Item
                                        name="surname"
                                        rules={[{ required: true, message: "Please input your last name!" }]}
    
                                    >
                                        <Input placeholder="Surname" className={`${style.input} input`} />
                                    </Form.Item>
    
                                    <Form.Item
                                        name="emailAddress"
                                        rules={[
                                            { required: true, message: "Please input your email address!" },
                                            { validator: validateEmail }, { type: 'email' }
                                        ]}
                                    >
                                        <Input placeholder="Email Address" className={`${style.input} input`} />
                                    </Form.Item>
    
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
    
                                        hasFeedback
                                    >
                                        <Input.Password placeholder='Password' className={`${style.input} input`} />
                                    </Form.Item>
    
                                    <Form.Item
                                        name="confirm"
                                        dependencies={['password']}
    
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please confirm your password!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password placeholder='Confirm Password' className={`${style.input} input`} />
                                    </Form.Item>
    
                                    <Form.Item
                                        name="phoneNumber"
                                        rules={[
                                            { required: true, message: "Please input your phone number!" },
                                            { validator: validatePhoneNumber }
                                        ]}
    
                                    >
                                        <Input placeholder="Phone Number" className={`${style.input} input`} size='large' />
                                    </Form.Item>
                                </div>
    
                                <div className={`${style.part2} part2`}>
                                    <Form.Item
                                        // label="Identity Number"
                                        name="identityNumber"
                                        rules={[{ required: true, message: "Please input your identityNumber!" }, { validator: validateIdentityNumber }]}
    
                                    >
                                        <Input placeholder='Identity Number' className={`${style.input} input`} />
                                    </Form.Item>
    
                                    <Form.Item
                                        name="dateOfBirth"
    
                                    >
                                        <DatePicker placeholder='Date of Birth' className={`${style.input} input`} disabled />
                                    </Form.Item>
    
                                    <Form.Item
                                        name="title"
                                    >
                                        <Select placeholder="Title" size='large'>
                                            {titleOptions.map(option => (
                                                <Select.Option value={option.value} key={option.value}>
                                                    {option.label}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="gender"
                                    >
                                        <Select placeholder="Gender" disabled size='large'>
                                            <Select.Option value={1}>Male</Select.Option>
                                            <Select.Option value={2}>Female</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="homeLanguage" >
                                        <Select placeholder="Home Language" size='large' >
                                            {languageOptions.map(option => (
                                                <Select.Option value={option.value} key={option.value}>
                                                    {option.label}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="populationGroup">
                                        <Select placeholder="Population Group" size='large'>
                                            {populationGroupOptions.map(option => (
                                                <Select.Option value={option.value} key={option.value}>
                                                    {option.label}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </div>
    
                                <div className={`${style.part3} part3`}>
                                    <Form.Item name="diability" valuePropName="checked" style={{ marginTop: '8px' }}
                                    >
                                        <Checkbox  >Disability</Checkbox>
                                    </Form.Item>
                                    <Form.Item
                                        name="natureOfDisability" >
                                        <Select placeholder="Nature of Disability" size='large'>
                                            {natureOfDisabilityOptions.map(option => (
                                                <Select.Option value={option.value} key={option.value}>
                                                    {option.label}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="natureOfDisability" >
                                        <p stylt>Prospective students are encouraged to disclose the status of their disability, as the university needs to determine reasonable accommodation
                                            required in order to support the applicant. Further information can be obtained from the Disability Unit at 011 559 3745.
                                            Please note: Selection is based on academic performance and not on your disability.</p>
                                    </Form.Item>
                                    <Form.Item
                                        name="currentActivity">
                                        <Select placeholder="Current Activity" size='large'>
                                            {activityOptions.map(option => (
                                                <Select.Option value={option.value} key={option.value}>
                                                    {option.label}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="previousActivity">
                                        <Select placeholder="Previous Activity" size='large'>
                                            {activityOptions.map(option => (
                                                <Select.Option value={option.value} key={option.value}>
                                                    {option.label}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
    
                                </div>
                            </div>
                            <Form.Item className={`${style.btnGroup} btnGroup`}
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className={`${style.btnSubmit} btnSubmit`}
                                >
                                    Submit
                                </Button>
                                <Button
                                    type="link" className="loginlink-btn"
                                    onClick={() => router.push('/authentication/login')}
                                >
                                    Login instead
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <FooterCustom />
            </>
        )
    }
    return (
        <>
            {hydrated ? <Index /> : null}
        </>
    )

}

export default Hydrated;