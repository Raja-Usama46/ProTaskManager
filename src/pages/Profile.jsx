import { Form, Input, Button } from "antd";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .test(
      "no-spaces",
      "Name cannot be just spaces",
      (value) => value.trim().length > 0
    ),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .test(
      "no-spaces",
      "Password cannot contain spaces",
      (value) => !value || !value.includes(" ")
    ),
});

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Profile updated:", values);
      formik.resetForm();
    },
  });

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            status={formik.touched.name && formik.errors.name ? "error" : ""}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.name}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            status={formik.touched.email && formik.errors.email ? "error" : ""}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.email}
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">New Password</label>
          <Input.Password
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Leave blank to keep current"
            status={
              formik.touched.password && formik.errors.password ? "error" : ""
            }
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.password}
            </div>
          )}
        </div>

        <Button type="primary" htmlType="submit" className="w-full">
          Update Profile
        </Button>
      </form>
    </div>
  );
}
