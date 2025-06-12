import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../store/themeSlice";
import { ConfigProvider, theme } from "antd";

export default function ThemeProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    dispatch(setTheme(savedTheme));
    document.documentElement.className = savedTheme;
  }, [dispatch]);

  const currentTheme = useSelector((state) => state.theme);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}
