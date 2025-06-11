import React from "react";
import { Switch, Card, Divider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/themeSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Card className="max-w-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Dark Mode</span>
          <Switch checked={darkMode} onChange={() => dispatch(toggleTheme())} />
        </div>

        <Divider />

        <div className="flex justify-between items-center mb-3">
          <span>Email Notifications</span>
          <Switch defaultChecked />
        </div>

        <div className="flex justify-between items-center mb-3">
          <span>Push Notifications</span>
          <Switch />
        </div>

        <div className="flex justify-between items-center">
          <span>Weekly Summary</span>
          <Switch defaultChecked />
        </div>
      </Card>
    </div>
  );
};

export default Settings;
