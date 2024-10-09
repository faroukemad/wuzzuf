import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'

export default function HeaderRes() {
  return (


    <Menu right>
      <Link to='/' className="header-menu-title">
        Home
      </Link>
      <div className="header-menu-title">
        Search
      </div>
      <div className="header-menu-title">
        History
      </div>

    </Menu>

  )
}
