import Head from "next/head";
import Image from "next/image";
import { Row, Col, Container } from "react-grid-system";

import styles from "@styles/home.module.scss";
import { useAuth } from "@contexts/AuthContext";
import bannerImg from "@images/layout/header.png";
import Card from "@components/wines/Card";

const Home = () => {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>PG Vins</title>
        <meta
          name="description"
          content="PG Vins | Site de vente de vin en ligne en belgique"
        />
      </Head>

      <section className={styles.header}>
        <div className={styles.header_background}>
          <Image
            src={bannerImg}
            alt="PG Vins Home"
            layout="responsive"
            width="100%"
            height="51%"
            objectFit="cover"
          />
        </div>
      </section>

      {/* <section
        style={{
          paddingTop: "50px",
          width: "80%",
          margin: "0 auto",
        }}
      >
        <Row justify="center">
          <Col xs={12} sm={6} xl={4}>
            <Card />
          </Col>
          <Col xs={12} sm={6} xl={4}>
            <Card />
          </Col>
          <Col xs={12} sm={6} xl={4}>
            <Card />
          </Col>
        </Row>
      </section> */}
      <section style={{ paddingTop: "50px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          <Card />
          <Card />
          <Card />
        </div>
      </section>
    </>
  );
};

export default Home;
