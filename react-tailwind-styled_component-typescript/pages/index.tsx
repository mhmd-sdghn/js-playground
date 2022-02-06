import type { NextPage } from "next";
import useSWR from "swr";
import axios from "axios";
import Card from "../components/Card";
import { Row, Col } from "../components/Gird";
import Container from "../components/Container";

const Home: NextPage = () => {
  return (
    <div style={{ marginTop: "50px" }}>
      <Container>
        <Row>
          {[1,2,3,4,5,6].map((item) => (
            <Col xxl={3} xl={4} lg={4} md={6} sm={6} xs={12}>
              <div style={{ padding: '10px'}}>
                <Card />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
