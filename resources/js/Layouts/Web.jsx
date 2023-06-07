import React, { useState, useEffect } from 'react'
import './web-layout.css'
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function WebLayout(props) {
    //define states
    const [isMobileNavbarExpand, setIsMobileNavbarExpand] = useState(false);
    const [isNavbarSticky, setIsNavbarSticky] = useState(false);


    useEffect(() => {
        //make navbar sticky on top when scrolling
        window.onscroll = function () {
            if (window.pageYOffset > 120) {
                setIsNavbarSticky(true)
            } else {
                setIsNavbarSticky(false)
            }
        }
    }, [])
    return (
        <div className='home-container'>
            <div className='home__background'></div>
            <div className='home__top-content'>
                <div className='logo-top' onClick={()=>Inertia.visit('/')}>
                    <img alt="home-logo" src="/assets/images/logo.png" />
                    <div className='invait'>invait</div>
                </div>
                <ul className={`home__navbar ${isNavbarSticky && 'home__navbar--fixed'}`}>
                    <li className='navbar__item'>
                        <Link href='/'> Home </Link>
                    </li>
                    <div className='dot-spacer'></div>
                    <li className='navbar__item'>
                        <Link href='/tema'> Tema </Link>
                    </li>
                    <div className='dot-spacer'></div>
                    <li className='navbar__item'>
                        <Link href='/tema'>Cara Order</Link>
                    </li>
                </ul>
                <ul className={`home__navbar home__navbar--mobile ${isNavbarSticky && 'home__navbar--fixed'}`} >
                    <img className='logo-invait' src="/assets/images/logo.png" onClick={()=>Inertia.visit('/')}/>
                    <div className='navbar__item--menu' onClick={() => setIsMobileNavbarExpand(true)}>Menu</div>
                    {
                        isMobileNavbarExpand === true &&
                        <>
                            <li className='navbar__item'>
                                <Link href='/'> Home </Link>
                            </li>
                            <li className='navbar__item'>
                                <Link href='/tema'> Tema </Link>
                            </li>
                            <li className='navbar__item'>
                                <Link href='/tema'>Cara Order</Link>
                            </li>
                            <i className='x bx bx-x' onClick={() => setIsMobileNavbarExpand(false)} />
                        </>
                    }
                </ul>
                <div className='w-100'>
                    {props.children}
                </div>

                <div className='footer-section'>
                    <div className='left'>
                        <img className='logo-with-text' alt="logo-with-text" src='/assets/images/logo.png' />
                    </div>
                    <div className='right'>
                        <div className='footer-link'>Blog</div>
                        <div className='footer-link'>Tentang</div>
                        <div className='footer-link'>Kontak</div>
                        <div className='footer-link'>Kebijakan Privasi</div>
                    </div>
                </div>
                <div className='copyright-section'>
                    Copyright @2023 Invait.id
                </div>
            </div>
        </div>
    )

}