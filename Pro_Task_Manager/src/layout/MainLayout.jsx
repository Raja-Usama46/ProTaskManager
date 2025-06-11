import React from "react";
import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  UserOutlined,
  SettingOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const menuItems = [
    { key: "/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/tasks", icon: <UnorderedListOutlined />, label: "Tasks" },
    { key: "/users", icon: <UserOutlined />, label: "Users" },
    { key: "/profile", icon: <ProfileOutlined />, label: "Profile" },
    { key: "/settings", icon: <SettingOutlined />, label: "Settings" },
  ];

  return (
    <div className={darkMode ? "dark" : ""}>
      <Layout className="min-h-screen  dark:bg-gray-900 text-black dark:text-white">
        <Sider theme="light">
          <div className="text-center text-2xl text-black bg-red-500 font-bold my-4">
            TaskManager Pro
          </div>
          <Menu
            mode="inline"
            items={menuItems}
            onClick={({ key }) => navigate(key)}
          />
        </Sider>
        <Layout>
          <Header className="bg-white shadow-sm px-6 dark:bg-gray-800">
            Welcome to TaskManager
          </Header>
          <Content className="p-6">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
