import React from 'react'
import { Link } from 'react-router-dom'

export default function HeaderLap() {
    return (
        <div className='header-lap'>
            <p className='header-jobs'>JobsNow</p>
            <div className="header-navs">
                <Link to='/' className='header-nav'>Home</Link>
                <nav className='header-nav'>Search</nav>
                <nav className='header-nav'>History</nav>
            </div>
        </div>
    )
}
