import React from "react";
import { Modal, Form, Input, Switch, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, updateTask } from "../../api";

const TaskForm = ({ isOpen, onClose, task }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const createMutation = useMutation(createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      message.success("Task created successfully");
    },
  });

  const updateMutation = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      message.success("Task updated successfully");
    },
  });

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const taskData = {
        ...values,
        status: values.completed ? "completed" : "pending",
      };

      if (task) {
        updateMutation.mutate({ id: task.id, ...taskData });
      } else {
        createMutation.mutate(taskData);
      }
      onClose();
    });
  };

  return (
    <Modal
      title={task ? "Edit Task" : "Create New Task"}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={onClose}
      confirmLoading={createMutation.isLoading || updateMutation.isLoading}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...task,
          completed: task?.status === "completed",
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter task title" }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Enter task description" rows={3} />
        </Form.Item>

        <Form.Item name="completed" label="Status" valuePropName="checked">
          <Switch checkedChildren="Completed" unCheckedChildren="Pending" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;
