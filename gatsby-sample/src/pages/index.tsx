import React from "react";
import { useRecoilState } from "recoil";
import { Button, Container, Paper } from "@mui/material";
import Layout from "../components/layouts";
import atom from "../utils/atom";

export default function IndexPage() {
  const [mode, setMode] = useRecoilState(atom("theme", "light"));

  const changeTheme = () => {
    if (mode === "light") setMode("dark");
    else setMode("light");
  };
  return (
    <Layout>
      <Container>
      <h1>ٌصفحه نخست</h1>
        <Paper 
        className="MuiPaper-rounded"  >
          <Button onClick={changeTheme}>تغییر تم</Button>
        </Paper>
      </Container>
    </Layout>
  );
}
