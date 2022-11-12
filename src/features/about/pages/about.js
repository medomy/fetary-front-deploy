import React from 'react'
import { useSelector } from 'react-redux'
import AboutBreadCrumbs from '../components/about_breadcrumbs/about_breadcrumbs';
import AboutFirstSec from '../components/first_sec/first_sec'
import AboutSocendSec from '../components/socend_sec/socend_sec'

function AboutPage() {
    const isDark = useSelector((state)=> state.theme.isDarkMode);
    return (
        <div className={`container-fluid ${isDark ? 'bg-dark' : ''}`}>
            <div className='row justify-content-center mt-2 mb-4'>
                <div className='col-md-10 col-12'>
                    <AboutBreadCrumbs />
                    <AboutFirstSec />
                    <AboutSocendSec />
                </div>
            </div>
        </div>
    )
}

export default AboutPage