import React from "react";
import { ThemeProvider } from "@mui/material";
import { useRecoilState } from "recoil";
import lightTheme from "../../theme/light";
import darkTheme from "../../theme/dark";
import atom from "../../utils/atom";

export default function ThemeSwitcher({ children }) {
  const [mode, setMode] = useRecoilState(atom("theme", "light"));
  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  );
}
