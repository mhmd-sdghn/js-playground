import { NextComponentType } from "next";
import styled from "styled-components";

const MyContainer = styled.div`
  width: 100%;
  margin: auto;
  @media only screen and (min-width: 640px) {
    max-width: 640px;
  }
  @media only screen and (min-width: 768px) {
    max-width: 768px;
  }
  @media only screen and (min-width: 1024px) {
    max-width: 1024px;
  }
  @media only screen and (min-width: 1280px) {
    max-width: 1280px
  }
  @media only screen and (min-width: 1536) {
    max-width: 1536px
  }
`;


const Container: NextComponentType = ({ children }) => {
    return (
        <MyContainer>
            {children}
        </MyContainer>
    )
}

export default Container;