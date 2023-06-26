import React, { ReactNode, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

export type LogoConfig = {
  image: string;
  size: number;
  style: string;
}

export type MainLayoutProps = {
  logo: LogoConfig;
  logo_collapsed: LogoConfig;
  menuItems?: MenuItem[]
  defaultPath: string;
  children?: ReactNode;
};

export type MenuItem = {
  key: string;
  icon?: ReactNode;
  label: string;
  children?: MenuItem[]
}


const SideBarLogo: React.FC<LogoConfig> = (props: LogoConfig) => {
  return (<div className={props.style}>
    <Link to='/'>
      {<img alt='' src={props.image} width={props.size} />}
    </Link>
  </div>)
}


type SideBarCollapseButtonProps = { collapsed: boolean, setCollapsed: React.Dispatch<React.SetStateAction<boolean>> }
const SideBarCollapseButton: React.FC<SideBarCollapseButtonProps> = (props) => {
  const { collapsed, setCollapsed } = props;
  return (<Button
    type="text"
    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    onClick={() => setCollapsed(!collapsed)}
    style={{
      fontSize: "16px",
      width: 64,
      height: 64,
    }}
  />)
}


export const MainLayout: React.FC<MainLayoutProps> = (props: MainLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();
  const navigate = useNavigate();

  const ContentStyle = {
    margin: "24px 16px",
    padding: 24,
    minHeight: 280,
    background: colorBgContainer,
  }
  const LayoutStyle = {
    height: "100vh"
  }

  return (
    <Layout style={LayoutStyle}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <SideBarLogo {...collapsed ? props.logo_collapsed : props.logo}></SideBarLogo>
        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key }) => {
            navigate(key)
          }}
          defaultSelectedKeys={[props.defaultPath]}
          items={props.menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <SideBarCollapseButton {...{ collapsed, setCollapsed }} />
        </Header>
        <Content style={ContentStyle}>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};
