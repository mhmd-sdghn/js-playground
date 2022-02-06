import React from "react";
import styled from "@emotion/styled";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import ThemeLayout from "./theme";
import MainLayout from "./main";

import "../../statics/fonts/stylesheet.css";
import "../../styles/global.css";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

// Layout Component
export default function ({ children, type }: ComponentProps) {
  const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: #FAFAFA;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  `;
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeLayout>
        <Container dir="rtl">
          <MainLayout>{children}</MainLayout>
        </Container>
      </ThemeLayout>
    </CacheProvider>
  );
}

type ComponentProps = {
  children: object;
  type?: "main" | "auth";
};
