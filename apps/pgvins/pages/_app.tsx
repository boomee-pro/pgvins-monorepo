import Head from "next/head";
import type { AppContext, AppProps } from "next/app";

import "@styles/globals.css";
import Layout from "@components/layout/Layout";
import App from "next/app";
import { AuthProvider, getUser } from "contexts/AuthContext";
import { Toaster } from "react-hot-toast";

const noLayout = ["/register", "/login", "/redirect"];

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/favicon.svg" />
      </Head>
      <AuthProvider userData={pageProps.auth}>
        <Layout
          noLayout={noLayout.includes(router.pathname.toString())}
          noCart={false}
        >
          <Component {...pageProps} />
          <Toaster position="bottom-right" />
        </Layout>
      </AuthProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const userData = await getUser(appContext.ctx);
  return { ...appProps, pageProps: { ...appProps.pageProps, auth: userData } };
};

export default MyApp;
