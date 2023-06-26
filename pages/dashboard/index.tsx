import React, { FC, useEffect, useState } from 'react'
import { Button, FloatButton, Popover } from 'antd';
import { useSubject } from '../../providers/details/subject';
import { useApplication } from '../../providers/application';
import router from 'next/router';
import Navbar from '../../components/navbar';
import style from './style.module.scss'
import { useUser } from '../../providers/user';
import WithToken from '../../hocs/withAuth';
import LayoutMain from '../../components/layoutMain';
import img1 from '../../assets/img4.jpg'
import Image from 'next/image'
import { PoweroffOutlined } from '@ant-design/icons';
import { loginStatus } from '../../constants';




const Index = () => {
    const { subjectsAps } = useSubject()
    const { getApplicationsTotalCount, applicationsTotalCount } = useApplication()
    const { setCurrentUser, currentUser, logOutUser } = useUser()
    const [openLogout, setLogout] = useState(false);

    const hide = () => {
        setLogout(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setLogout(newOpen);
        
    };

    useEffect(() => {
        getApplicationsTotalCount()
        setCurrentUser()
    }, [])

    if (applicationsTotalCount < 0) {
        return <p>loading!!!</p>
    }

    return (
        <LayoutMain>
            <div className={`${style.sectionMain} sectionMain`}>
                <div className={`${style.sectionA} sectionA`}>
                    <h1 className={`${style.head} head`}>DASHBOARD</h1>

                    <div>
                        <h2>Number of applications filled</h2>
                        {{ applicationsTotalCount } ? <p>{applicationsTotalCount}</p> : null}
                        <h2>APS SCORE</h2>
                        {{ subjectsAps } ? <p>{subjectsAps}</p> : null}
                        <h2>name</h2>
                        {currentUser ? <p>{currentUser.name}</p> : null}
                        <h2>Surname</h2>
                        {currentUser ? <p>{currentUser.surname}</p> : null}
                        <h2>Email Address</h2>
                        {currentUser ? <p style={{ textTransform: 'lowercase' }}>{currentUser.emailAddress}</p> : null}
                        <h2>Phone Number</h2>
                        {currentUser ? <p>{currentUser.phoneNumber}</p> : null}

                    </div>
                    <div className={style.btnGroup} >
                        <Button type='primary' onClick={() => router.push('/application')}>ADD APPLICATION</Button>
                        <Button type='default' onClick={() => router.push('/dashboard/details/personal')} style={{ marginLeft: '20px' }}>VIEW DETAILS</Button>
                    </div>
                </div>
                <div className={`${style.sectionB} sectionB`}>
                    <Image src={img1} width={700} height={400} alt="" sizes=" 100vw" className={`${style.image} image`} />
                    <div className={`${style.info} info`}>
                        <ol className={`${style.olTag} olTag`}>
                        Your Documents, Organized: No more scrambling to find and submit various documents. Our centralized repository keeps all your required documents in one secure location. Have peace of mind knowing that your information is private and shared only with the institutions you choose.

                        </ol>
                        <p>ADMISSION REQUIREMENTS</p>
                    </div>
                </div>
            </div>
            <Popover
                content={<div><a onClick={hide}>Cancel</a> <Button onClick={()=> logOutUser()}>Yes</Button></div>}
                title="Confirm"
                trigger="click"
                open={openLogout}
                onOpenChange={handleOpenChange}
            >

                {loginStatus() ? <FloatButton style={{color:'red'}} icon={<PoweroffOutlined style={{color:'red'}}/>} tooltip={<div>Log Out</div>} onClick={() => console.log('click')} /> : null}
            </Popover>
        </LayoutMain>
    )
}

export default WithToken(Index)