import Link from 'next/link'
import React from 'react'
import LayoutMain from '../../../components/layoutMain'
import style from './style.module.scss'

const index = () => {
    return (
        <LayoutMain>

            <div className={style.sectionMain}>
                <div className={style.sectionA} >
                    <h1 className={style.head}>VIEW/UPDATE PERSONAL DETAILS</h1>
                    <Link href={'/dashboard/details/personal'}><h2>Personal Details</h2></Link>
                    <Link href={'/details/address'}><h2>Address</h2></Link>
                    <Link href={'/details/subject'}><h2>Subjects</h2></Link>
                    <Link href={'/details/file'}><h2>Files</h2></Link>
                    <Link href={'/details/parent'}><h2>Parents Details</h2></Link>
                    <Link href={'/details/qualification'}><h2>Qualifications</h2></Link>
                </div>
                <div className={style.sectionB} >
                </div>
            </div>
        </LayoutMain>
    )
}

export default index