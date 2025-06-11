import { Spin } from "antd";

const PageLoader = () => {
  return (
    <div className="flex justify-center items-center h-64 ">
      <Spin size="large" />
    </div>
  );
};

export default PageLoader;
