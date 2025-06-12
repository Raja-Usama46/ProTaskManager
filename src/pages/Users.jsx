import { Table, Switch, Button, Drawer, Card, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { toggleBlockUser } from "../store/authSlice";
import { useState } from "react";
import FetchUsers from "../hooks/FetchUsers";

export default function Users() {
  const [selectedUser, setSelectedUser] = useState(null);
  const blockedUsers = useSelector((state) => state.auth.blockedUsers);
  const dispatch = useDispatch();
  const { data: users, isLoading } = FetchUsers();
  console.log(users, "users");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Status",
      key: "status",
      render: (_, user) => (
        <Tag color={blockedUsers.includes(user.id) ? "red" : "green"}>
          {blockedUsers.includes(user.id) ? "Blocked" : "Active"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, user) => (
        <Space>
          <Switch
            checked={!blockedUsers.includes(user.id)}
            onChange={() => dispatch(toggleBlockUser(user.id))}
          />
          <Button onClick={() => setSelectedUser(user)}>Details</Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="User Management" bordered={false}>
      <Table
        columns={columns}
        dataSource={users}
        loading={isLoading}
        rowKey="id"
        scroll={{ x: true }}
      />

      <Drawer
        title="User Details"
        placement="right"
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        width={400}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Name</h3>
              <p>{selectedUser.name}</p>
            </div>
            <div>
              <h3 className="font-medium">Email</h3>
              <p>{selectedUser.email}</p>
            </div>
            <div>
              <h3 className="font-medium">Status</h3>
              <Tag
                color={blockedUsers.includes(selectedUser.id) ? "red" : "green"}
              >
                {blockedUsers.includes(selectedUser.id) ? "Blocked" : "Active"}
              </Tag>
            </div>
          </div>
        )}
      </Drawer>
    </Card>
  );
}
