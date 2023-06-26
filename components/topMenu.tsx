import React, { useState } from 'react';
import type { DrawerProps, MenuProps, RadioChangeEvent } from 'antd';
import { Button, Drawer, Dropdown, Radio, Space } from 'antd';
import { DownOutlined, MenuOutlined, SmileOutlined } from '@ant-design/icons';

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item (disabled)
            </a>
        ),
        icon: <SmileOutlined />,
        disabled: true,
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item (disabled)
            </a>
        ),
        disabled: true,
    },
    {
        key: '4',
        danger: true,
        label: 'a danger item',
    },
];

const SideDrawer: React.FC = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };




    return (
        <>
            <Space>

                <Button type="primary" onClick={showDrawer}>
                    <MenuOutlined />
                </Button>
            </Space>
            <Drawer
                title="Navigation"
                placement={"left"}
                closable={true}
                onClose={onClose}
                open={open}
                key={"left"}
                width={300}
                
            >
                <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space style={{width:'100%'}}>
                            Details
                            <DownOutlined/>
                        </Space>
                    </a>
                </Dropdown>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </>
    );
};

export default SideDrawer;