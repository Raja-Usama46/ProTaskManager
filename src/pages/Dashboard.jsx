import { Card, Row, Col, Statistic, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectStatusCounts } from "../store/taskSlice";
import FetchUsers from "../hooks/FetchUsers";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

export default function Dashboard() {
  const theme = useSelector((state) => state.theme);
  const Length = useSelector((state) => state.tasks.tasks).length;
  const statusCounts = useSelector(selectStatusCounts);
  const { data: users } = FetchUsers();

  const fetchStats = async () => {
    return {
      totalTasks: Length,
      totalUsers: users?.length || 0,
      pendingTasks: statusCounts.pending,
      completedTasks: statusCounts.completed,
    };
  };

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchStats,
  });

  const cardStyle = {
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card style={cardStyle}>
              <Statistic
                title="Total Tasks"
                value={data?.totalTasks}
                prefix={<UnorderedListOutlined />}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card style={cardStyle}>
              <Statistic
                title="Total Users"
                value={data?.totalUsers}
                prefix={<UserOutlined />}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card style={cardStyle}>
              <Statistic
                title="Completed Tasks"
                value={data?.completedTasks}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: "#52c41a" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card style={cardStyle}>
              <Statistic
                title="Pending Tasks"
                value={data?.pendingTasks}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: "#faad14" }}
              />
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}
