import { Form, Input, Button, message } from "antd";

const dummyUser = {
  name: "Usama",
  email: "abc@example.com",
};

const Profile = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Updated Profile:", values);
    message.success("Profile updated successfully!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: dummyUser.name,
          email: dummyUser.email,
          password: "",
        }}
        onFinish={onFinish}
        className="max-w-md bg-white p-6 rounded shadow"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="password"
          rules={[
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password placeholder="Leave blank to keep existing" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
