import React, { FC, useEffect, useState } from 'react'
import { ParentInputDto } from '../../../interfaces';
import { Button, Form, Input, Select, message } from 'antd';
import { ReflistTitle } from '../../../enums';
import { useParent } from '../../../providers/details/parent';
import router from 'next/router';
import LayoutMain from '../../../components/layoutMain';
import style from './style.module.scss'
import WithToken from '../../../hocs/withAuth';
import Image from 'next/image'
import img1 from '../../../assets/img7.jpg'

const Hydrated: FC<any> = () => {
    const [hydrated, setHydrated] = useState(false)
    useEffect(() => {
        if (!hydrated) {
            setHydrated(true)
        }
    }, [])


    const Index = () => {
        const { createParent, parentCreated } = useParent();
    
        const onFinish = (values: ParentInputDto) => {
            console.log('creating parent', values)
            createParent(values)
        };
    
        const onFinishFailed = (errorInfo: any) => {
            message.warning("Failed to login check your credentials and try again")
        };
    
        const titleOptions = Object.keys(ReflistTitle)
            .filter(key => typeof ReflistTitle[key] === 'number')
            .map(key => ({
                label: key,
                value: ReflistTitle[key]
            }));
    
    
        return (
            <LayoutMain>
                <div className={style.sectionMain}>
                    <div className={style.sectionA} >
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <h1 className={style.head}>PARENT/GUARDIAN/NEXT OF KIN</h1>
    
                            <Form.Item
                                name="title">
                                <Select placeholder="Title" className={`${style.select} select`} >
                                    {titleOptions.map(option => (
                                        <Select.Option value={option.value} key={option.value} className={`${style.select} select`}>
                                            {option.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="surname"
                                rules={[{ required: true, message: "Please input your surname!" }]}
                                noStyle={true}
                            >
                                <Input placeholder="Surname" className={style.input} />
                            </Form.Item>
    
                            <Form.Item
                                name="initials"
                                rules={[{ required: true, message: "Please input your initials!" }]}
                                noStyle={true}
                            >
                                <Input placeholder="Initials" className={style.input} />
                            </Form.Item>
                            <Form.Item
                                name="phoneNumber"
                                rules={[{ required: true, message: "Please input your phoneNumber!" }]}
                                noStyle={true}
                            >
                                <Input placeholder="Phone Number" className={style.input} />
                            </Form.Item>
                            <Form.Item
                                name="emailAddress"
                                rules={[{ required: true, message: "Please input your emailAddress!" }]}
                                noStyle={true}
                            >
                                <Input placeholder="Email Address" className={style.input} />
                            </Form.Item>
    
                            <Form.Item className="btn-group"
                                noStyle={true}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className={style.btnSubmit}
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
                <Button onClick={() => router.push('/details/subject')} disabled={parentCreated? false:true}>Next</Button>
            </LayoutMain>
        )
    }
    return (
        <>
            {hydrated ? <Index /> : null}
        </>
    )

}

export default WithToken(Hydrated);
