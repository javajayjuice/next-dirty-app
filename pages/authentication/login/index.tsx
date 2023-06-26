import { message, Form, Input, Checkbox, Button, Modal, App } from 'antd';
import React, { FC, useEffect, useState } from 'react'
import { Login } from '../../../interfaces';
import { useUser } from '../../../providers/user';
import style from './styles.module.scss'
import LayoutMain from '../../../components/layoutMain';
import Navbar from '../../../components/navbar';
import Image from 'next/image'
import img1 from '../../../assets/img3.jpg'
import FooterCustom from '../../../components/footer';
import router from 'next/router';




    const Index = () => {

        const { loginUser } = useUser();
        const [isModalOpen, setIsModalOpen] = useState(false);
    
        const showModal = () => {
            setIsModalOpen(true);
        };
    
        const handleOk = () => {
            setIsModalOpen(false);
            router.push('/authentication/register')
        };
    
        const handleCancel = () => {
            setIsModalOpen(false);
        };
    
        const onFinish = (values: Login) => {
            loginUser(values);
        };
    
        const onFinishFailed = (errorInfo: any) => {
            message.warning("Failed to login fill in all fields and try again", errorInfo)
        };
    
        return (
            <div >
                <Navbar></Navbar>
                <div className={`${style.sectionMain}`} >
                    <div className={`${style.path}`}></div>
                    <div className={style.regContainer}>
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="on"
    
                        >
                            <h1 className={`${style.sectionHead} sectionHead`}>LOGIN</h1>
    
                            <Form.Item
                                name="userNameOrEmailAddress"
                                rules={[
                                    { required: true, message: "Please input your email address!" },
                                ]}
                                noStyle={true}
                            >
                                <Input placeholder="Email Address" className={style.input} />
                            </Form.Item>
    
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: "Please input your password!" }]}
                                noStyle={true}
                            >
                                <Input.Password placeholder="Password" className={style.input} />
                            </Form.Item>
    
                            <Form.Item  >
                                <div className={style.btnGroup}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className={style.submitBtn}
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        type="link" className={style.registerBtn}
                                        onClick={showModal}
                                    >
                                        Register Instead
                                    </Button>
                                    <Modal title="POPIA Disclaimer" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={'I Agree'}>
                                        <p>1. The Universities here are public higher
    education institution which performs public functions in terms of the
    Higher Education Act, 1997. The University is committed to protecting
    your right to privacy, as data subject, and recognises that it needs
    to comply with statutory requirements when processing personal
    information. The Constitution of the Republic of South Africa provides
    that everyone has the right to privacy. The Protection of Personal
    Information Act, 2013 (POPIA) was enacted as a mechanism to protect
    your constitutional right to privacy. POPIA also includes the right to
    protection against unlawful collection, retention, dissemination and
    use of personal information.
    2. There are 8 conditions of lawful processing stipulated in Chapter 3
    of POPIA, which the University, as a responsible party, must follow
    in respect of all personal information which it processes. The
    conditions of lawful processing are Accountability, Processing
    Limitation, Purpose Specification, Further Processing Limitation,
    Information Quality, Openness, Security Safeguards and Data Subject
    Participation.
    3. In terms of section 18 of POPIA, if personal information is collected,
    the University must take reasonably practical steps to ensure that
    a data subject is made aware of the personal information which is
    being collected.
    4. You understand that you will be required to provide the University with
    some of your personal information when you apply to study at the
    University and when you register as a student. You acknowledge that
    the University will use the personal information which you provide to
    carry out its mission as a public university to provide teaching and
    learning, conduct research and engage with communities.
    5. The University will processes your personal information, as a data
    subjects, in accordance with the provisions of POPIA and any other
    relevant data protection laws, and in accordance with its Privacy
    Notice, which is available on the University’s website under the Privacy Notice tab, or which
    you may request direct from the University. We advise that you read
    the University’s privacy notice so that you are aware of your rights as
    a data subject.
    6. When you apply to study at the University, register as a student, or
    graduate from the University you understand that the University:
    6.1 needs to consider your personal information when it determines
    whether you meet the selection and admission requirements to
    study at the University;
    6.2 requires your personal information to provide you with an
    education and to carry out its academic administration relating
    to the programme for which you register. the University uses
    electronic learning platforms to provide a range of learning
    options. This may include from time-to-time platforms like
    Blackboard Collaborate, Zoom, Microsoft Teams, YouTube and
    WhatsApp. Since it is voluntary for you to share video, audio and
    text on these platforms, the privacy risk for you is limited;
    6.3 collects analysis data when you use the platforms mentioned
    above to improve the services which it provides to students and
    in the interest of my academic progress and support;
    6.4 will need your personal information to keep in contact with you as
    an alumnus and to verify that you have obtained the qualifications
    or have undertaken the studies that you represent to others that
    you have obtained from the University or undertaken with the
    University; and
    6.5 requires your personal information when its records are being
    audited and when the University carries out its statutory reporting
    duties.
    B. CONSENT
    7. In light of the above, you, as the data subject, or as competent
    person who represents the data subject, as the case may be, hereby
    consents to the collection, use, disclosure and processing by the
    University of the data subject’s personal information for the purposes
    of the University providing services to you, including but not limited to
    registering you as a student and/or enrolling you in a course and you
    confirm that:
    7.1 the information is supplied voluntarily, without undue influence
    from any party and not under any duress. You understand that the
    University has to have your personal information to process your
    application and to provide education to you. You also understand
    that the University cannot deal you’re your application or provide
    education to you if you do not give it the personal information it
    requires;
    7.2 the University may obtain personal information about you from
    other parties, for example, the Department of Basic Education,
    other educational institutions and the Department of Home
    Affairs for the purposes of allowing the University to consider
    my application and that when the University obtains information
    from other parties, it will need to give them some of my personal
    information; and
    7.3 the information which is supplied herewith is mandatory for the
    fulfilment of the purposes specified above.
    8. You acknowledge that you are aware that you have the following
    rights about such personal information which is being collected,
    namely the right to:
    8.1 access the information at any reasonable time for purposes of
    rectification thereof;
    8.2 object to the processing of the information in which case this
    agreement will terminate in accordance with the provisions
    contained herein;
    8.3 lodge a complaint to the Information Regulator.
    * This agreement can either be accepted online or be printed and
    submitted to the relevant Faculty/College if required. This agreement
    will be linked to your student profile.</p>
                                    </Modal>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className={`${style.imgConatiner}`}>
                        <Image src={img1} width={700} height={400} alt="" sizes=" 100vw" className={`${style.image} image`} />
    
                    </div>
                    <div className={style.info}>
                        COMMUNICATION TO APPLICANTS<br/>
                        You will receive separate email and/or sms communication with regard to the outcome of your academic 
                        application. It is therefore required that you complete both email and cellphone contact details on this application form
                    </div>
                    <div className={`${style.colorContainer}`}></div>
                </div>
                <FooterCustom />
            </div>
    
        )
    }



export default Index;