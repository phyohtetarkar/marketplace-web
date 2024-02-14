import { getCategoryBySlug } from "@/services/CategoryService";
import { redirect } from "next/navigation";
import CollectionPage from "./collection-page";
import { Metadata } from "next";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const getData = async (slug: string) => {
  return await getCategoryBySlug(slug);
};

export const metadata: Metadata = {
  title: "Browse products"
};

export default async function Collection({ params, searchParams }: Props) {
  const category = await getData(params.slug);

  if (!category) {
    redirect("/");
  }

  return <CollectionPage category={category} searchParams={searchParams} />;
}
