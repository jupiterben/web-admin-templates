import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export type LogoConfig = {
  image: string;
  size: number;
  style: string;
}

export type MainLayoutConfig = {
  logo: LogoConfig;
  logo_collapsed: LogoConfig;
};


const SideBarLogo: React.FC<LogoConfig> = (props: LogoConfig) => {
  return (<div className={props.style}>
    <Link to='/' className='logo-url'>
      {<img alt='' src={props.image} width={props.size} />}
    </Link>
  </div>)
}


const LayoutStyle = {
  height: "100vh"
}

export const MainLayout: React.FC<MainLayoutConfig> = (props: MainLayoutConfig) => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();

  return (
    <Layout style={LayoutStyle}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <SideBarLogo {...collapsed ? props.logo_collapsed : props.logo}></SideBarLogo>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
