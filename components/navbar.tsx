import React from 'react';
import { Layout, Menu } from 'antd';
import SideDrawer from './topMenu';
import router from 'next/router';
import { loginStatus } from '../constants';

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" style={{ display: 'flex', justifyContent: 'flex-end', zIndex: '0' }}>
        <Menu.Item onClick={() => router.push('/')}>Home</Menu.Item>
        <Menu.Item onClick={() => router.push('/about')}>About</Menu.Item>
        {/* {loginStatus() ? <Menu.Item onClick={() => router.push('/dashboard')}>Dashboard</Menu.Item> : null} */}
      </Menu>
    </Header>
  );
};

export default Navbar;
