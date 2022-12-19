import "react-responsive-carousel/lib/styles/carousel.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/bootstrap-custom.css";
import "../../styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Layout } from "../components/template";
import NextNProgress from "nextjs-progressbar";
import awsconfig from "../aws-exports";
import { Amplify } from "aws-amplify";
import { AuthenticationContextProvider } from "../common/AuthenticationContextProvider";
Amplify.configure(awsconfig);

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
