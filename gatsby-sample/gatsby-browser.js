import React from "react";
import { RecoilRoot } from "recoil";



// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
  return <RecoilRoot {...props}>{element}</RecoilRoot>;
};
