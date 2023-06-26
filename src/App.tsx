import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MainLayout, MainLayoutConfig } from "./components/MainLayout";
import logo from './assets/logo.png'



const menus = [];
const pages = [];

const layoutConfig: MainLayoutConfig =
{
  logo: { image: logo, size: 50, style: "" },
  logo_collapsed: { image: logo, size: 20, style: "" },
}


export default function App() {
  return <MainLayout {...layoutConfig}> </MainLayout>;
}
