// Import các thư viện cần thiết
import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  SelectOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
const { Header, Sider, Content } = Layout;

const LayoutApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigator = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigator('/login');
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
            color: 'white',
            marginLeft: 9,
          }}
        />
        <Menu
          onClick={({ key }) => {
            if (key === 'logout') {
              handleLogout();
            } else {
              navigator(key);
            }
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          items={[
            {
              key: '/',
              icon: <HomeOutlined />,
              label: 'Home',
            },
            {
              key: '/employeesmanager',
              icon: <UserOutlined />,
              label: 'Employees Manager',
            },
            {
              key: '/bookingmanagement',
              icon: <SelectOutlined />,
              label: 'Booking Management',
            },
            {
              key: 'logout',
              icon: <LogoutOutlined />,
              label: 'Logout',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: 'dark',
          }}
        >
          <p style={{ color: 'white', fontSize: 20, marginLeft: 24, marginTop: 0 }}>
            <b>Website booking room meeting</b>
          </p>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 600,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;