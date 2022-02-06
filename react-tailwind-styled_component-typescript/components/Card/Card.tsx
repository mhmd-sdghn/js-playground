import type { NextComponentType } from "next";
import styled from "styled-components";
import { css } from "styled-components";
import Image from "next/image";

import img from "../../assets/images/download.jpg";

const Card = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
`;
const CardHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #455a64;
  padding: 10px;
`;

const CardContainer = styled.div`
  flex: 1 1 auto;
  padding-right: 10px;
  padding-left: 10px;
`;

const CardFooter = styled.div``;

const ImageBox = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 10px;
`;

const Title = styled.h3`
  margin-top: 15px;
  margin-bottom: 10px;
  padding-left: 8px;
  padding-right: 8px;
`;

const DescriptionDesktop = styled.p`
  margin-top: 0px;
  color: #455a64;
  padding: 8px;
  display: none;
  @media only screen and (min-width: 768px) {
    display: block;
  }
`;

const DescriptionMobile = styled.p`
  margin-top: 0px;
  color: #455a64;
  padding: 8px;
  display: block;
  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const Home: NextComponentType = () => {
  return (
    <Card>
      <CardHeader>
        <ImageBox>
          <Image src={img} alt="card image" layout="responsive" />
        </ImageBox>
        <Title>Card Title</Title>
      </CardHeader>
      <CardContainer>
        <DescriptionDesktop>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores fuga
          reiciendis labore eaque laborum obcaecati officia sequi dolore, nemo
          cumque quibusdam maiores magni rerum voluptas voluptatem praesentium!
          Minus, labore tempora?
        </DescriptionDesktop>
        <DescriptionMobile>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores fuga
          reiciendis labore eaque laborum obcaecati officia sequi dolore, nemo
        </DescriptionMobile>
      </CardContainer>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default Home;
