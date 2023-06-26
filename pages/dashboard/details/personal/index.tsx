import { Form, Input, Button, DatePicker, Select, Radio, Checkbox } from 'antd';
import style from './styles.module.scss';
import React, { FC, useEffect, useState } from 'react'
import { ApplicantInputDto } from '../../../../interfaces';
import { useUser } from '../../../../providers/user';
import { ReflistHomeLanguage, ReflistNatureOfDisability, ReflistTitle, ReflistPopulationGroup, ReflistActivity } from '../../../../enums';
import LayoutMain from '../../../../components/layoutMain';
import router from 'next/router';
import WithToken from '../../../../hocs/withAuth';



    const Index = () => {
        const [form] = Form.useForm();
    
        const {updateUser ,userUpdated , currentUser, setCurrentUser } = useUser();
    
        useEffect(() => {
            setCurrentUser()
        }, [])
    
    
        console.log('current user in details:', currentUser)
    
        const onFinish = (values: ApplicantInputDto) => {
            console.log('Success:', values);
            console.log('current user:::', currentUser)
            const mergedData = { ...currentUser, ...values };
    
            // Filter out properties with undefined values
            const filteredData = Object.entries(mergedData).reduce((acc, [key, value]) => {
                if (value !== undefined) {
                    acc[key] = value;
                }
                return acc;
            }, {});
    
            const update = {...currentUser, ...filteredData }
    
            console.log(update);
            const updateContact:any = {
                emailAddress: update.emailAddress,
                phoneNumber: update.phoneNumber
            }
    
            updateUser(updateContact)
    
            // form.resetFields();
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
        console.log('current', currentUser)
        return (
            <LayoutMain>
                <div className={`${style.sectionMain} sectionMain`} >
                    <div className={style.regContainer}>
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
                            <h1 className={`${style.head} head`}>PERSONAL DETAILS</h1>
                            <div className={`${style.warnText} warnText`}>NB! You can only update your number phone and email address:</div>
                            <div className={`${style.column} column`}>
                                <div className={`${style.part1} part1`}>
                                    <Form.Item
                                        name="name"
                                        
                                    >
                                        <Input disabled placeholder={currentUser ? currentUser.name : 'Name'} value={currentUser ? currentUser.name : null} />
                                    </Form.Item>
    
                                    <Form.Item
                                        name="surname"
    
                                    >
                                        <Input disabled placeholder={currentUser ? currentUser.surname : 'Surname'} />
                                    </Form.Item>
    
                                    <Form.Item
                                        name="username"
                                    >
                                        <Input disabled placeholder={currentUser ? currentUser.userName : 'Username'} />
                                    </Form.Item>
    
                                    <Form.Item
                                        name="emailAddress"
                                    >
                                        <Input placeholder={currentUser ? currentUser.emailAddress : 'Email Address'} />
                                    </Form.Item>
    
    
    
                                    <Form.Item
                                        name="phoneNumber"
                                    >
                                        <Input placeholder={currentUser ? currentUser.phoneNumber : 'Phone Number'} />
                                    </Form.Item>
                                </div>
    
                                <div className={`${style.part2} part2`}>
                                    <Form.Item
                                        name="identityNumber"
                                    >
                                        <Input disabled placeholder={currentUser ? currentUser.identityNumber : 'ID number'} />
                                    </Form.Item>
    
                                    <Form.Item
                                        name="dateOfBirth"
                                    >
                                        <DatePicker disabled={true} style={{width:'100%'}} placeholder={currentUser ? currentUser.dateOfBirth : 'Date of Birth'} />
                                    </Form.Item>
    
                                    <Form.Item
                                        name="title">
                                        <Select disabled placeholder={currentUser ? currentUser.title : 'Title'}>
                                            {titleOptions.map(option => (
                                                <Select.Option value={option.value} key={option.value}>
                                                    {option.label}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="gender">
                                        <Select disabled placeholder={currentUser ? currentUser.gender : 'Gender'} >
                                            <Select.Option value={1}>Male</Select.Option>
                                            <Select.Option value={2}>Female</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="homeLanguage" >
                                        <Select disabled placeholder={currentUser ? currentUser.homeLanguage : 'Home Language'} >
                                            {languageOptions.map(option => (
                                                <Select.Option value={option.value} key={option.value}>
                                                    {option.label}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="populationGroup" >
                                        <Select disabled placeholder={currentUser ? currentUser.populationGroup : 'Population Group'} >
                                            {populationGroupOptions.map(option => (
                                                <Select.Option value={option.value} key={option.value}>
                                                    {option.label}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
    
                                </div>
                                <div className={`${style.part3} part3`}>
                                    <Form.Item name="diability" valuePropName={currentUser ? currentUser.diability : null} >
                                        <Checkbox>Disability</Checkbox>
                                    </Form.Item>
                                    <Form.Item
                                        name="natureOfDisability" >
                                        <Select disabled placeholder={currentUser ? currentUser.natureOfDisability : 'Nature of Disability'} >
                                            {natureOfDisabilityOptions.map(option => (
                                                <Select.Option value={option.value} key={option.value}>
                                                    {option.label}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="currentActivity">
                                        <Select disabled placeholder={currentUser ? currentUser.currentActivity : 'Current Activity'} >
                                            {activityOptions.map(option => (
                                                <Select.Option value={option.value} key={option.value}>
                                                    {option.label}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="previousActivity" >
                                        <Select disabled placeholder={currentUser ? currentUser.previousActivity : 'Previous Activity'} >
                                            {activityOptions.map(option => (
                                                <Select.Option value={option.value} key={option.value}>
                                                    {option.label}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
    
                                </div>
                            </div>
                            <Form.Item className={`${style.btnGroup} btnGroup`} noStyle={true}
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className={`${style.btnUpdate} btnUpdate`}
                                >
                                    Update
                                </Button>
                                <Button
                                    type="default"
                                    className={`${style.btnCancel} btnCancel`}
                                    onClick={() => router.push('/dashboard')}
                                >
                                    Cancel
                                </Button>
                                {/* <Button
                                    type="link"
                                    className={`${style.btnCancel} btnCancel`}
                                    onClick={() => router.push('/details/address')}
                                >
                                    Update Address
                                </Button> */}
                                
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </LayoutMain>
        )
    }
   

export default WithToken(Index);