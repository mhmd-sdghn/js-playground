import type { NextComponentType } from "next";
import { ReactNode } from "react";
import styled from "styled-components";

interface ColType {
  children?: ReactNode;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}

const MyCol = styled.div<ColType>`
  width: ${({ xs }) => ((xs || 12) * 100) / 12}%;
  @media only screen and (min-width: 640px) {
    width: ${({ sm }) => ((sm || 12) * 100) / 12}%;
  }
  @media only screen and (min-width: 768px) {
    width: ${({ md }) => ((md || 12) * 100) / 12}%;
  }
  @media only screen and (min-width: 1024px) {
    width: ${({ lg }) => ((lg || 12) * 100) / 12}%;
  }
  @media only screen and (min-width: 1280px) {
    width: ${({ xl }) => ((xl || 12) * 100) / 12}%;
  }
  @media only screen and (min-width: 1536) {
    width: ${({ xxl }) => ((xxl || 12) * 100) / 12}%;
  }
`;

const Col = ({ children, xs, sm, md, lg, xl, xxl }: ColType) => {
  return (
    <MyCol xs={xs} sm={sm} md={md} lg={lg} xl={xl} xxl={xxl}>
      {children}
    </MyCol>
  );
};

export default Col;
