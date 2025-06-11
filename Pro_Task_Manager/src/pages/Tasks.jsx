import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../api/client";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  Tag,
  Space,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const Tasks = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form] = Form.useForm();
  const [statusFilter, setStatusFilter] = useState(null);

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => client.get("/todos").then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (task) => {
      if (task.id) return client.put(`/todos/${task.id}`, task);
      return client.post("/todos", task);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsModalOpen(false);
      form.resetFields();
      setEditingTask(null);
    },
  });

 const deleteMutation = useMutation({
  mutationFn: (id) => client.delete(`/todos/${id}`),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
});


  const openModal = (task = null) => {
    setEditingTask(task);
    if (task) form.setFieldsValue(task);
    else form.resetFields();
    setIsModalOpen(true);
  };

  const onFinish = (values) => {
    const task = editingTask ? { ...editingTask, ...values } : values;
    mutation.mutate(task);
  };

  const filteredTasks = statusFilter
    ? tasks.filter((task) =>
        statusFilter === "Completed" ? task.completed : !task.completed
      )
    : tasks;

  const columns = [
    { title: "ID", dataIndex: "id", width: 70 },
    { title: "Title", dataIndex: "title" },
    {
      title: "Status",
      dataIndex: "completed",
      render: (completed) => (
        <Tag color={completed ? "green" : "orange"}>
          {completed ? "Completed" : "Pending"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openModal(record)} />
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => deleteMutation.mutate(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal()}
        >
          Add Task
        </Button>
      </div>

      <div className="mb-4">
        <Select
          placeholder="Filter by Status"
          allowClear
          style={{ width: 200 }}
          onChange={(value) => setStatusFilter(value)}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      </div>

      <Table
        loading={isLoading}
        dataSource={filteredTasks}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        open={isModalOpen}
        title={editingTask ? "Edit Task" : "Add Task"}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onOk={() => form.submit()}
        okText="Save"
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="title"
            label="Task Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="completed" label="Status" initialValue={false}>
            <Select>
              <Option value={false}>Pending</Option>
              <Option value={true}>Completed</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Tasks;
