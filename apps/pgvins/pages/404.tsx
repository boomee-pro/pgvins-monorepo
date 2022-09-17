import Head from "next/head";

import { BiErrorCircle } from "react-icons/bi";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>Erreur 404</title>
        <meta name="errorpage" content="Page de d'erreur" />
      </Head>

      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          color: "var(--gold-main)",
        }}
      >
        <BiErrorCircle size={80} />
        <h2>Erreur, cette page n&apos;existe pas !</h2>
      </div>
    </>
  );
};

export default Custom404;
