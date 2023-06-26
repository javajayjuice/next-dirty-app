import React, { FC, useEffect, useState } from 'react'
import { AddressDto } from '../../../interfaces';
import { Button, Form, Input, Select, message } from 'antd';
import { ReflistProvince } from '../../../enums';
import { useAddress } from '../../../providers/details/address';
import router from 'next/router';
import LayoutMain from '../../../components/layoutMain';
import style from './style.module.scss'
import Image from 'next/image'
import img1 from '../../../assets/img6.jpg'
import { useUser } from '../../../providers/user';
import WithToken from '../../../hocs/withAuth';



    const Index = () => {
        const { createAddress, addressCreated } = useAddress();
        const {setCurrentUser, currentUser} = useUser()
    
        useEffect(() => {
            // setCurrentUser()
        }, [addressCreated])
        
        const onFinish = (values: AddressDto) => {
            createAddress(values);
        };
    
        const onFinishFailed = (errorInfo: any) => {
            message.warning("Check your inputs and try again.")
        };
    
        const provinceOptions = Object.keys(ReflistProvince)
            .filter(key => typeof ReflistProvince[key] === 'number')
            .map(key => ({
                label: key,
                value: ReflistProvince[key]
            }));
    
            console.log('create', addressCreated)
        return (
            <LayoutMain>
                <div className={`${style.sectionMain} sectionMain`}>
                    <div className={`${style.sectionA} sectionA`} >
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
    
    
                            <h1 className={`${style.head} head`}>ADDRESS</h1>
    
                            <Form.Item
                                name="street"
                                rules={[{ required: true, message: "Please input your street!" }]}
                                noStyle={true}
                            >
                                <Input placeholder="Street" className={`${style.input} input`} />
                            </Form.Item>
    
                            <Form.Item
                                name="town"
                                rules={[{ required: true, message: "Please input your town!" }]}
                                noStyle={true}
                            >
                                <Input placeholder="Town" className={`${style.input} input`} />
                            </Form.Item>
                            <Form.Item
                                name="city"
                                rules={[{ required: true, message: "Please input your city!" }]}
                                noStyle={true}
                            >
                                <Input placeholder="City" className={`${style.input} input`} />
                            </Form.Item>
                            <Form.Item
                                name="suburb"
                                rules={[{ required: true, message: "Please input your suburb!" }]}
                                noStyle={true}
                            >
                                <Input placeholder="Suburb" className={`${style.input} input`} />
                            </Form.Item>
                            <Form.Item
                                name="postalCode"
                                rules={[{ required: true, message: "Please input your postalCode!" }]}
                                noStyle={true}
                            >
                                <Input placeholder="Postal Code" className={`${style.input} input`} />
                            </Form.Item>
    
                            <Form.Item
                                name="province"
                            >
                                <Select placeholder="Province" className={`${style.select} select`}>
                                    {provinceOptions.map(option => (
                                        <Select.Option value={option.value} key={option.value} className={`${style.select} select`}>
                                            {option.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item className="btn-group" >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className={`${style.btnSubmit} btnSubmit`}
                                >
                                    Submit
                                </Button>
                                
                            </Form.Item>
                        </Form>
                    </div>
                    <div className={`${style.sectionB} sectionB`} >
                        <Image src={img1} width={700} height={400} alt="" sizes=" 100vw" className={`${style.image} image`} />
                    </div>
                </div>
                <Button onClick={() => router.push('/details/parent')} className={`${style.btnNext} btnNext`} disabled={addressCreated?false:true}>Next</Button>
            </LayoutMain>
        )
    }


export default WithToken(Index);
