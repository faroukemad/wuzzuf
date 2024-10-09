import React from 'react'
import './header.scss'
import HeaderRes from './HeaderRes'
import HeaderLap from './HeaderLap'


export default function Header() {
    return (
        <>
        <div className='header '>
            <div className="header-wrapper">
               <HeaderLap/>
               <HeaderRes/>
            </div>
        </div>
       
        </>
    )
}
