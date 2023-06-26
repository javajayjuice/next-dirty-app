import React from 'react'
import style from './style.module.scss'
import Navbar from '../../components/navbar'
import LayoutMain from '../../components/layoutMain'
const Index = () => {
  return (
    <>
    <LayoutMain>
    <div className={`${style.container} container`}>
        <div className={`${style.upSection} upSection`}>
            <h1>About Dirty Apps Office Center</h1>
        </div>
        <div className={`${style.midSection} midSection`}>
            <p>Simplifying Your College Application Process!
Are you a current matriculant in public schools, tired of the hassle of creating multiple applications for different institutes? We have the solution for you! Our web application is designed to make your college application process a breeze with just a click of a button.
Streamline Your Applications: Say goodbye to the tedious task of writing multiple applications. With our easy-to-use web app, you can now apply to multiple institutes seamlessly. Simply fill in your information once, and we'll show you all the institutes you qualify for.
Interactive and User-Friendly Experience: We believe in simplicity and interactivity. Our modern and educational web application provides a seamless user experience. From the moment you register and log in, you'll embark on a journey that will transform your college application process.
Everything You Need in One Place: Our web app offers a range of features to guide you through the application process. Start by taking our survey to better understand your preferences. Then, explore course orientations to find the perfect fit for your future.</p>
        </div>
        <div className={`${style.lowSection} lowSection`}></div>
    </div>

    </LayoutMain>
    </>
  )
}

export default Index