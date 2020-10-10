import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import 'antd/dist/antd.css';
import '../index.css';

import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    HomeOutlined,
    LoginOutlined,
    LogoutOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Nav = () => {
    const { token } = useContext(AuthContext);
    const [collapsed, setCollapsed] = useState(true)

    const onCollapse = collapsed => {
        // console.log(collapsed);
        setCollapsed(collapsed);
    };

    return (

        <div>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>

                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to={"/"} >
                            Home
                        </Link>
                    </Menu.Item>
                    
                    {token ? (
                        <>
                            <Menu.Item key="2" icon={<LogoutOutlined />}>
                                <Link to={"/logout"} >
                                    Log out
                                 </Link>
                            </Menu.Item>
                        </>
                    ) : (
                        <>
                            <Menu.Item key="2" icon={<LoginOutlined />}>
                                <Link to={"/login"} >
                                    Log in
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<DesktopOutlined />}>
                                <Link to={"/signup"}>
                                    Sign Up
                                    </Link>
                            </Menu.Item>
                        </>
                        )}
                </Menu>
            </Sider>
        </div>
    );
}

export default Nav;