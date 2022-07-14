import { useAuth } from "@contexts/AuthContext";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <Head>
        <title>PG Vins</title>
        <meta
          name="description"
          content="PG Vins | Site de vente de vin en ligne en belgique"
        />
      </Head>
    </div>
  );
};

export default Home;
