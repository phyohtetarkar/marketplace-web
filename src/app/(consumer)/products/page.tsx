import { redirect } from "next/navigation";
import ProductsPage from "./products-page";
import { Metadata } from "next";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata: Metadata = {
  title: "Browse products",
};

export default function Products({ searchParams }: Props) {
  const { q } = searchParams;

  if (!q) {
    redirect("/");
  }

  return <ProductsPage />;
}
