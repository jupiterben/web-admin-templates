import * as React from "react";
import { Routes, Route, useLocation, Router, useRoutes, useNavigate, RouteObject } from "react-router-dom";
import { MainLayout, MainLayoutProps, MenuItem } from "./components/MainLayout";
import logo from './assets/logo.svg'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import PageLoading from "./components/PageLoading";
import { IRouter, createUseRoutes } from "./utils/router";
import { lazy } from "react";


const RouteDefines: { [key: string]: IRouter } = {
  Group1: {
    path: "group1",
    redirect: "group1/page1"
  },
  Page1: {
    path: "group1/page1",
    component: lazy(() => import('@/pages/Page1')),
  },
  Page2: {
    path: "group1/page2",
    component: lazy(() => import('@/pages/Page2')),
  },
  Page3: {
    path: "group2/page3",
    component: lazy(() => import('@/pages/Page3')),
  },
  Page4: {
    path: "group2/page4",
    component: lazy(() => import('@/pages/Page4')),
  }
}


const menuItems: MenuItem[] = [
  {
    key: "group1",
    icon: <UserOutlined />,
    label: "group 1",
    children: [
      { key: "group1/page1", label: "page1" },
      { key: "group1/page2", label: "page2" }
    ]
  },
  {
    key: "group2",
    icon: <VideoCameraOutlined />,
    label: "group 2",
    children: [
      { key: "group2/page3", label: "page3" },
      { key: "group2/page4", label: "page4" }
    ]
  },
];


const layoutConfig: MainLayoutProps =
{
  logo: { image: logo, size: 50, style: "" },
  logo_collapsed: { image: logo, size: 20, style: "" },
  menuItems,
  defaultPath: "/"
}

type ReactNodeProps = { children: React.ReactNode };

const LoginGuard = React.memo(({ children }: ReactNodeProps) => {
  const navigate = useNavigate();
  const isLogin = true;
  return <>{isLogin ? children : <PageLoading />}</>;
});

const routes = createUseRoutes(Object.values(RouteDefines))
export const SuspenseLazy = React.memo(({ children }: ReactNodeProps) => (
  <React.Suspense fallback={<PageLoading />}>{children}</React.Suspense>
));

export default function App() {
  const routesElement = useRoutes(routes);
  return (
    <LoginGuard>
      <MainLayout {...layoutConfig}>
        <SuspenseLazy>{routesElement}</SuspenseLazy>
      </MainLayout>
    </LoginGuard>
  );
}
