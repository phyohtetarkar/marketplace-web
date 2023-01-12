import "react-responsive-carousel/lib/styles/carousel.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/bootstrap-custom.css";
import "../../styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import { Layout } from "../components/template";
import NextNProgress from "nextjs-progressbar";
import awsconfig from "../aws-exports";
import { Amplify } from "aws-amplify";
import { AuthenticationContextProvider } from "../common/AuthenticationContextProvider";

Amplify.configure({
  ...awsconfig,
  Auth: {
    ...awsconfig,
    cookieStorage: {
      domain: "localhost",
      path: "/",
      expires: 365,
      sameSite: "strict",
      secure: process.env.NEXT_PUBLIC_DOMAIN !== "localhost"
    }
  }
});

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout || ((page: ReactElement) => <Layout>{page}</Layout>);

  return (
    <>
      <NextNProgress
        color="#4f46e5"
        startPosition={0.3}
        height={2}
        showOnShallow={true}
        options={{
          showSpinner: false
        }}
      />
      <AuthenticationContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </AuthenticationContextProvider>
    </>
  );
}

export default MyApp;
