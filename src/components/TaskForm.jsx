import { Form, Input, Select, Button } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .test(
      "no-spaces",
      "Title cannot be just spaces",
      (value) => value.trim().length > 0
    ),
  description: Yup.string()
    .required("Description is required")
    .test(
      "no-spaces",
      "Description cannot be just spaces",
      (value) => value.trim().length > 0
    ),
  status: Yup.string().required("Status is required"),
});

export default function TaskForm({ initialValues, onSubmit, loading }) {
  const formik = useFormik({
    initialValues: initialValues || {
      title: "",
      description: "",
      status: "pending",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <Input
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.touched.title && formik.errors.title ? "error" : ""}
        />
        {formik.touched.title && formik.errors.title && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.title}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <Input.TextArea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={4}
          status={
            formik.touched.description && formik.errors.description
              ? "error"
              : ""
          }
        />
        {formik.touched.description && formik.errors.description && (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.description}
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Status</label>
        <Select
          name="status"
          value={formik.values.status}
          onChange={(value) => formik.setFieldValue("status", value)}
          onBlur={formik.handleBlur}
          className="w-full"
          status={formik.touched.status && formik.errors.status ? "error" : ""}
        >
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="completed">Completed</Select.Option>
        </Select>
        {formik.touched.status && formik.errors.status && (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.status}
          </div>
        )}
      </div>

      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        className="w-full"
      >
        {initialValues ? "Update Task" : "Add Task"}
      </Button>
    </form>
  );
}
