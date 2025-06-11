import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import client from "../api/client";
import { Table, Button, Drawer, Tag, Switch, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleBlock } from "../features/userSlice";
import { EyeOutlined } from "@ant-design/icons";

const Users = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();
  const blockedUsers = useSelector((state) => state.users.blockedUsers);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => client.get("/users").then((res) => res.data),
  });

  const isBlocked = (id) => blockedUsers.includes(id);

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Status",
      render: (_, record) =>
        isBlocked(record.id) ? (
          <Tag color="red">Blocked</Tag>
        ) : (
          <Tag color="green">Active</Tag>
        ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => setSelectedUser(record)}
          />
          <Switch
            checked={!isBlocked(record.id)}
            onChange={() => dispatch(toggleBlock(record.id))}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <Table
        loading={isLoading}
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Drawer
        open={!!selectedUser}
        title="User Details"
        onClose={() => setSelectedUser(null)}
        width={300}
      >
        {selectedUser && (
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Username:</strong> {selectedUser.username}
            </p>
            <p>
              <strong>Phone:</strong> {selectedUser.phone}
            </p>
            <p>
              <strong>Website:</strong> {selectedUser.website}
            </p>
            <p>
              <strong>Company:</strong> {selectedUser.company?.name}
            </p>
            <p>
              <strong>Blocked:</strong>{" "}
              {isBlocked(selectedUser.id) ? "Yes" : "No"}
            </p>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Users;
