import React from "react";
import {Stack, Typography } from "@mui/material";
import Nav from "../Nav";

export default function MainLayout({ children }) {
  return (
    <Stack direction="row">
      <Nav />
      {children}
    </Stack>
  );
}
