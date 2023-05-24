import { NextPage } from "next";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { ReactElement, ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import "../../styles/bootstrap-custom.css";
import "../../styles/globals.css";
//import awsconfig from "../aws-exports";
import {
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip
} from "chart.js";
import { ToastContainer } from "react-toastify";
import { AuthenticationContextProvider } from "../common/AuthenticationContextProvider";
import { LocalizationContextProvider } from "../common/localization";
import ProgressContextProvider from "../common/ProgressContextProvider";
import { Layout } from "../components/template";

// Amplify.configure({
//   ...awsconfig,
//   ssr: true,
//   Auth: {
//     ...awsconfig,
//     ssr: true,
//     cookieStorage: {
//       domain:
//         process.env.NEXT_PUBLIC_PROFILE === "dev" ? "localhost" : "localhost",
//       path: "/",
//       expires: 365,
//       sameSite: "strict",
//       secure: process.env.NEXT_PUBLIC_PROFILE !== "dev"
//     }
//   }
// });

Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip
);

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
        color="#36213e"
        startPosition={0.3}
        height={2}
        showOnShallow={true}
        options={{
          showSpinner: false
        }}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        theme="colored"
      />
      <AuthenticationContextProvider>
        <LocalizationContextProvider>
          <ProgressContextProvider>
            {getLayout(<Component {...pageProps} />)}
          </ProgressContextProvider>
        </LocalizationContextProvider>
      </AuthenticationContextProvider>
    </>
  );
}

export default MyApp;
