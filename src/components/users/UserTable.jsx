import React from "react";
import { Table, Tag, Button, Drawer, Space } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleUserBlock } from "../../store/blockedUsersSlice";

const UserTable = ({ users }) => {
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const dispatch = useDispatch();
  const blockedUsers = useSelector((state) => state.blockedUsers);

  const showUserDetails = (user) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const handleBlockToggle = (userId) => {
    dispatch(toggleUserBlock(userId));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "admin" ? "purple" : "blue"}>{role}</Tag>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag color={blockedUsers.includes(record.id) ? "red" : "green"}>
          {blockedUsers.includes(record.id) ? "Blocked" : "Active"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => showUserDetails(record)}
          />
          <Button
            type={blockedUsers.includes(record.id) ? "default" : "dashed"}
            danger={!blockedUsers.includes(record.id)}
            onClick={() => handleBlockToggle(record.id)}
          >
            {blockedUsers.includes(record.id) ? "Unblock" : "Block"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 8 }}
      />

      <Drawer
        title="User Details"
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        width={400}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Full Name</p>
              <p className="font-medium">{selectedUser.name}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-medium">{selectedUser.email}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Role</p>
              <p>
                <Tag color={selectedUser.role === "admin" ? "purple" : "blue"}>
                  {selectedUser.role}
                </Tag>
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Status</p>
              <p>
                <Tag
                  color={
                    blockedUsers.includes(selectedUser.id) ? "red" : "green"
                  }
                >
                  {blockedUsers.includes(selectedUser.id)
                    ? "Blocked"
                    : "Active"}
                </Tag>
              </p>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default UserTable;
