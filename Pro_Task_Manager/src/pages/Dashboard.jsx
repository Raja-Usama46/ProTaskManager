import React from "react";
import { useQuery } from "@tanstack/react-query";
import client from "../api/client";
import { Row, Col, Card, Spin, Alert } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
  const {
    data: tasks,
    isLoading: tasksLoading,
    error: tasksError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => client.get("/todos").then((res) => res.data),
  });

  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => client.get("/users").then((res) => res.data),
  });

  if (tasksLoading || usersLoading) {
    return <Spin size="large" className="flex justify-center mt-10" />;
  }

  if (tasksError || usersError) {
    return (
      <Alert
        message="Error loading data"
        description="Something went wrong while fetching tasks or users."
        type="error"
        showIcon
        className="my-10"
      />
    );
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const totalUsers = users.length;

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: <FileDoneOutlined className="text-blue-500" />,
    },
    {
      title: "Completed Tasks",
      value: completedTasks,
      icon: <CheckCircleOutlined className="text-green-500" />,
    },
    {
      title: "Pending Tasks",
      value: pendingTasks,
      icon: <ClockCircleOutlined className="text-yellow-500" />,
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: <TeamOutlined className="text-purple-500" />,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card className="shadow hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{stat.icon}</div>
                <div>
                  <div className="text-gray-600">{stat.title}</div>
                  <div className="text-xl font-semibold">{stat.value}</div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
