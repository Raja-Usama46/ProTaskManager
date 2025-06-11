import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import MainLayout from "./layout/MainLayout";

const App = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Navigate to="dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/users" element={<Users />} />

      {/* <Route path="/profile" element={<Profile />} /> */}
      {/* <Route path="/settings" element={<Settings />} /> */}
    </Route>
  </Routes>
);

export default App;
