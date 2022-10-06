import Head from "next/head";
import { Container, Row, Col } from "react-grid-system";

import Card from "@components/wines/Card";
import BreadCrumbs from "@components/layout/BreadCrumbs";

export async function getStaticProps() {
  // const wines = await res.json();

  // if (!res.ok) {
  //     throw new Error(`Failed to fetch posts, received status ${res.status}`)
  // }

  const wines = [
    {
      id: 0,
      name: "Montrachet Grand Cru",
      price: 4205,
      origin: "France",
      domain: "Domaine Leflaive",
      img: "/wines/grand-cru.png",
      flag: "/flags/FR.svg",
    },
    {
      id: 1,
      name: "Roumier Musigny Grand Cru",
      price: 4205,
      origin: "France",
      domain: "Domaine Georges & Christophe",
      img: "/wines/musigny.png",
      flag: "/flags/FR.svg",
    },
    {
      id: 2,
      name: "Barolo DOCG",
      price: 4205,
      origin: "Italy",
      domain: "Bruno Giacosa Collina Rionda",
      img: "/wines/barolo.png",
      flag: "/flags/IT.svg",
    },
  ];

  return { props: { wines } };
}

const Wines = ({ wines }: any) => {
  return (
    <>
      <Head>
        <title>Nos vins</title>
        <meta name="description" content="Liste de nos vins" />
      </Head>

      <Container style={{ marginBottom: "30px" }}>
        <BreadCrumbs
          items={[
            { title: "Accueil", destination: "/" },
            { title: "Liste des vins", active: true },
          ]}
        />

        <div
          style={{
            display: "grid",
            gridGap: "50px 20px",
            margin: "0 auto",
            textAlign: "center",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            justifyItems: "center",
          }}
        >
          {wines.map((wine: any) => (
            <Card key={wine.id} />
          ))}
          {wines.map((wine: any) => (
            <Card key={wine.id} />
          ))}
          <Card />
        </div>
      </Container>
    </>
  );
};

export default Wines;
