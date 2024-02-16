import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function ConsumerLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <main
        className="flex-grow-1 bg-light"
        style={{
          padding: "126px 0 0 0"
        }}
      >
        {children}
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
