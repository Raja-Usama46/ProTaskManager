import { useState } from "react";
import {
  Table,
  Button,
  Select,
  Modal,
  Tag,
  Space,
  message,
  Popconfirm,
  Badge,
  Card,
  Input,
  Spin,
} from "antd";
import {
  PlusOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TaskForm from "../components/TaskForm";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  updateTask,
  deleteTask,
  markAsCompleted,
  markAsPending,
} from "../store/taskSlice";

const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const currentTheme = useSelector((state) => state.theme);

  const { isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      return tasks;
    },
    initialData: tasks,
  });

  const createMutation = useMutation({
    mutationFn: async (newTask) => {
      const taskWithId = { ...newTask, id: Date.now() };
      dispatch(addTask(taskWithId));
      return taskWithId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      message.success("Task created successfully!");
    },
    onError: () => {
      message.error("Failed to create task");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedTask) => {
      dispatch(updateTask(updatedTask));
      return updatedTask;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      message.success("Task updated successfully!");
    },
    onError: () => {
      message.error("Failed to update task");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      dispatch(deleteTask(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      message.success("Task deleted successfully!");
    },
    onError: () => {
      message.error("Failed to delete task");
    },
  });

  const completeMutation = useMutation({
    mutationFn: async (id) => {
      dispatch(markAsCompleted(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      message.success("Task marked as completed!");
    },
  });

  const pendingMutation = useMutation({
    mutationFn: async (id) => {
      dispatch(markAsPending(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      message.success("Task marked as pending!");
    },
  });

  const filteredTasks = tasks
    .filter((task) => statusFilter === "all" || task.status === statusFilter)
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchText.toLowerCase()) ||
        task.description.toLowerCase().includes(searchText.toLowerCase())
    );

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <span className="font-medium dark:text-white">{text}</span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (text) => <span className="dark:text-gray-300">{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Space>
          <Badge
            status={status === "completed" ? "success" : "warning"}
            text={
              <span className="dark:text-white">
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            }
          />
          {status === "pending" ? (
            <Button
              size="small"
              icon={<CheckOutlined />}
              onClick={() => completeMutation.mutate(record.id)}
              className="dark:bg-green-600 dark:border-green-600 dark:text-white"
            >
              Complete
            </Button>
          ) : (
            <Button
              size="small"
              icon={<ClockCircleOutlined />}
              onClick={() => pendingMutation.mutate(record.id)}
              className="dark:bg-orange-500 dark:border-orange-500 dark:text-white"
            >
              Pending
            </Button>
          )}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentTask(record);
              setIsModalOpen(true);
            }}
            className="dark:bg-blue-600 dark:border-blue-600 dark:text-white"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => deleteMutation.mutate(record.id)}
            okText="Yes"
            cancelText="No"
            overlayClassName="dark:bg-gray-800 dark:text-white"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              className="dark:border-red-500"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleSubmit = (values) => {
    if (currentTask) {
      updateMutation.mutate({ ...values, id: currentTask.id });
    } else {
      createMutation.mutate(values);
    }
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  return (
    <Card
      title={
        <span className="dark:text-white text-xl font-semibold">
          Task Management
        </span>
      }
      bordered={false}
      className={`shadow-sm ${
        currentTheme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="w-full md:w-auto">
          <Input
            placeholder="Search tasks..."
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            className={`dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${
              currentTheme === "dark" ? "w-full md:w-64" : "w-full md:w-64"
            }`}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Select
            defaultValue="all"
            style={{ width: 150 }}
            onChange={setStatusFilter}
            options={[
              { value: "all", label: "All Tasks" },
              { value: "pending", label: "Pending" },
              { value: "completed", label: "Completed" },
            ]}
            className={`dark:bg-gray-700 ${
              currentTheme === "dark" ? "dark:text-white" : ""
            }`}
            popupClassName={`${
              currentTheme === "dark" ? "dark:bg-gray-700" : ""
            }`}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setCurrentTask(null);
              setIsModalOpen(true);
            }}
            className="dark:bg-blue-600 dark:border-blue-600"
          >
            Add Task
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredTasks}
          loading={isLoading}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: true }}
          className={`${currentTheme === "dark" ? "dark:bg-gray-800" : ""}`}
          rowClassName={(record, index) =>
            currentTheme === "dark"
              ? "dark:bg-gray-700 dark:hover:bg-gray-600"
              : "hover:bg-gray-50"
          }
        />
      )}

      <Modal
        title={
          <span className="dark:text-white">
            {currentTask ? "Edit Task" : "Create Task"}
          </span>
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setCurrentTask(null);
        }}
        footer={null}
        destroyOnClose
        className={`${currentTheme === "dark" ? "dark:text-white" : ""}`}
        bodyStyle={{
          backgroundColor: currentTheme === "dark" ? "#1f2937" : "white",
        }}
      >
        <TaskForm
          initialValues={currentTask}
          onSubmit={handleSubmit}
          isLoading={createMutation.isLoading || updateMutation.isLoading}
        />
      </Modal>
    </Card>
  );
};

export default Tasks;
