import React, { FC, useEffect, useState } from 'react'
import style from './style.module.scss'
import Navbar from '../components/navbar'
import Image from 'next/image'
import img3 from '../assets/img3.jpg'
import { Button, FloatButton, Popover } from 'antd'
import route from 'next/router';
import { loginStatus } from '../constants'
import { PoweroffOutlined } from '@ant-design/icons'
import { useUser } from '../providers/user'


const Hydrated: FC<any> = () => {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => {
    if (!hydrated) {
      setHydrated(true)
    }
  }, [])
  const Index = () => {

    const [openLogout, setLogout] = useState(false);
    const { logOutUser } = useUser()

    const hide = () => {
      setLogout(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
      setLogout(newOpen);
    };
    return (
      <>
        <Navbar></Navbar>
        <div className={style.sectionMain}>
          <Button type='link' style={{ position: 'absolute', bottom: '0', width: '70px', color: 'white', margin: '0 0 30px 20px', fontSize: '20px' }} onClick={() => route.push('/admin/authentication/login')}>Admin</Button>
          <div className={style.path}></div>
          <div className={style.sectionA}>
            <Image src={img3} width={700} height={400} alt="" sizes=" 100vw" className={style.image} />

          </div>
          <div className={style.sectionB}>
            <div className={style.container}>
              <div className={style.title}>MINIMAL WAY OF APPLYING</div>
              <div className={style.text}>Simplifying Your College Application Process!
                Are you a current matriculant in public schools, tired of the hassle of creating multiple applications for different institutes? We have the solution for you! Our web application is designed to make your college application process a breeze with just a click of a button.
                Streamline Your Applications: Say goodbye to the tedious task of writing multiple applications. With our easy-to-use web app, you can now apply to multiple institutes seamlessly.</div>
              <div className={style.button}>{!loginStatus() ? <Button type='primary' className={style.btnHomeLogin} onClick={() => route.push('/authentication/login')}>LOGIN</Button> : <Button type='primary' className={style.btnHomeLogin} onClick={() => route.push('/dashboard')}>DASHBOARD</Button>}</div>
            </div>
          </div>
          <div className={style.warn}>
            NO APPLICATION FEE WILL BE CHARGED ON THIS PORTAL
          </div>
          <div className={style.info}>
            VERY IMPORTANT
            • Please read the instructions carefully and complete all applicable sections.
            • Incomplete forms will not be processed.
            • Only ONE application form per applicant.
            • Please allow 3 weeks before checking on the status of your application. You can do so
            by going to www.uj.ac.za/Apply where you will also be able to print a letter regarding
            your application status.
          </div>
        </div>
        <Popover
          content={<div><a onClick={hide}>Cancel</a> <Button onClick={()=> logOutUser()}>Yes</Button></div>}
          title="Confirm"
          trigger="click"
          open={openLogout}
          onOpenChange={handleOpenChange}
        >

          {loginStatus() ? <FloatButton style={{ color: 'red' }} icon={<PoweroffOutlined style={{ color: 'red' }} />} tooltip={<div>Log Out</div>} onClick={() => console.log('click')} /> : null}
        </Popover>
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