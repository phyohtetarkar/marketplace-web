import Head from "next/head";
import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  hideAuth?: boolean;
  hideFooter?: boolean;
  background?: string;
  children: ReactNode;
}

function Layout({ hideAuth, hideFooter, background, children }: LayoutProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        <title>Shopping Center</title>
      </Head>
      <div
        className="d-flex flex-column h-100"
        style={{
          background: background ? background : "transparent"
        }}
      >
        <Header hideAuth={hideAuth} />
        <main
          className="flex-grow-1"
          style={{
            background: background ? background : "transparent"
          }}
        >
          {/* <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            theme="colored"
          /> */}
          {children}
        </main>
        {!hideFooter && (
          <div
            className="mt-auto"
            style={{
              background: background ? background : "transparent"
            }}
          >
            <Footer />
          </div>
        )}
      </div>
      {/* <LoadingContext.Consumer>
        {({ loading, setLoading }) => {
          if (loading) {
            return (
              <div className="position-fixed end-0 bottom-0 bg-dark rounded p-2 m-4 bg-opacity-75 shadow-lg">
                <div
                  className="spinner-border m-1 text-light d-block"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            );
          }
        }}
      </LoadingContext.Consumer> */}
    </>
  );
}

export default Layout;
