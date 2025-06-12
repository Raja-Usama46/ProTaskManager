import { Layout, Menu, theme as antdTheme } from "antd";
import { Link, Outlet } from "react-router-dom";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useState } from "react";
const { Header, Sider, Content } = Layout;

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const currentTheme = useSelector((state) => state.theme);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = antdTheme.useToken();

  return (
    <Layout className="min-h-screen">
      <Sider
        theme={currentTheme === "dark" ? "dark" : "light"}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
        className="shadow-lg"
        breakpoint="lg"
      >
        <div className="flex items-center justify-center h-16">
          <h1 className="text-xl font-bold text-black text-bold">
            {!collapsed ? "TaskManager Pro" : "TM"}
          </h1>
        </div>
        <Menu
          theme={currentTheme === "dark" ? "dark" : "light"}
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: <Link to="/">Dashboard</Link>,
            },
            {
              key: "2",
              icon: <UnorderedListOutlined />,
              label: <Link to="/tasks">Tasks</Link>,
            },
            {
              key: "3",
              icon: <TeamOutlined />,
              label: <Link to="/users">Users</Link>,
            },
            {
              key: "4",
              icon: <UserOutlined />,
              label: <Link to="/profile">Profile</Link>,
            },
            {
              key: "5",
              icon: <SettingOutlined />,
              label: <Link to="/settings">Settings</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        {/* <Header
          // style={{
          //   background: colorBgContainer,
          // }}
          className="shadow-sm "
        
        /> */}
        <div className="bg-[#5c5858] shadow-sm px-6 dark:bg-gray-800  py-8 text-center text-2xl text-white font-bold">
          <h1> Welcome to TaskManager</h1>
        </div>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
