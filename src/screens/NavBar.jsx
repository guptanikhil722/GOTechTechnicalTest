import Breadcrumb from 'react-bootstrap/Breadcrumb';

import React from 'react'

const  NavBar=() =>{
  return (
    <Breadcrumb>
    <Breadcrumb.Item className='navbarText' active>Dashboard</Breadcrumb.Item>
    <Breadcrumb.Item className='navbarText' active>
      Stores
    </Breadcrumb.Item>
    <Breadcrumb.Item className='navbarText' active>
      Stores Menu
    </Breadcrumb.Item>
    <Breadcrumb.Item className='navbarText' active={true} >Create Menu</Breadcrumb.Item>
  </Breadcrumb>
  )
}

export default NavBar