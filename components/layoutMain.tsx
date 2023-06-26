import React, { ReactNode, useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import Navbar from './navbar';
import style from './layoutMainStyle.module.scss'
import route from 'next/router';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    path?: string
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        path
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem((
        <p rel="noopener noreferrer" onClick={() => route.push('/')}>
            Home
        </p>
    ), '1', (
        <p rel="noopener noreferrer" onClick={() => route.push('/')}>
            <PieChartOutlined />
        </p>
    ), undefined, '/'),
    getItem((<p rel="noopener noreferrer" onClick={() => route.push('/application')}>
        Application
    </p>), '2', (
        <p rel="noopener noreferrer" onClick={() => route.push('/application')}>
            <DesktopOutlined />
        </p>
    ), undefined, '/application'),
    getItem('Details', 'sub1', <UserOutlined />, [
        getItem((<p rel="noopener noreferrer" onClick={() => route.push('/details/address')}>
            Address
        </p>), '3'),
        getItem((<p rel="noopener noreferrer" onClick={() => route.push('/details/parent')}>
            Parent
        </p>), '4'),
        getItem((<p rel="noopener noreferrer" onClick={() => route.push('/details/subject')}>
            Subjects
        </p>), '5'),
        getItem((<p rel="noopener noreferrer" onClick={() => route.push('/details/qualification')}>
            Qualifications
        </p>), '6'),
        getItem((<p rel="noopener noreferrer" onClick={() => route.push('/details/file')}>
            Files
        </p>), '7'),
    ]),
    getItem('Dashboard', 'sub2', (<p rel="noopener noreferrer" onClick={() => route.push('/dashboard')}>
        <UserOutlined />
    </p>), [
        getItem((<p rel="noopener noreferrer" onClick={() => route.push('/dashboard/application')}>
            Applications
        </p>), '8'),
        getItem((<p rel="noopener noreferrer" onClick={() => route.push('/dashboard/details')}>
            Details
        </p>), 'sub3', (<p rel="noopener noreferrer" onClick={() => route.push('/dashboard/details')}>
            <FileOutlined />
        </p>), [
            getItem((<p rel="noopener noreferrer" onClick={() => route.push('/dashboard/details/personal')}>
            Personal Details
        </p>), '9'),
            getItem((<p rel="noopener noreferrer" onClick={() => route.push('/dashboard/details/password')}>
            Change Password
        </p>), '10')
        ]),
    ]),

];

type Props = {
    children?: ReactNode;
    title?: string;
};

const LayoutMain = ({ children, title }: Props) => {
    const [collapsed, setCollapsed] = useState(true);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout >
            {/* <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className={style.sider}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider> */}
            <Layout >
                <Header style={{ display: 'flex', justifyContent: 'flex-end' }}> <Navbar></Navbar></Header>

                <Content className={style.content}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <div className={style.path}></div>
                    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer}}>
                        {children}
                    </div>

                </Content>
                <Footer style={{ textAlign: 'center' }}>Dirty Apps ©2023 In Creation By Juice</Footer>
            </Layout>
        </Layout>
    )
}

export default LayoutMain