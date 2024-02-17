import { getShopBySlug } from "@/services/ShopService";
import { Metadata, ResolvingMetadata } from "next";
import ShopPage from "./shop-page";
import { cache } from "react";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const getShop = cache(async (slug: string) => {
  return getShopBySlug(slug)
});

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;

  const shop = await getShop(slug);

  const previousImages = (await parent).openGraph?.images || [];

  if (shop) {
    return {
      title: shop.name,
      description: shop.headline,
      openGraph: {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/shops/${shop.slug}`,
        title: shop.name,
        description: shop.headline,
        images: [`${shop.cover ?? ""}`, ...previousImages],
        type: "website"
      },
      twitter: {
        title: shop.name,
        description: shop.headline,
        card: "summary_large_image",
        images: [`${shop.cover ?? ""}`, ...previousImages]
      }
    };
  }

  return {};
}

export default async function Shop({ params, searchParams }: Props) {
  const shop = await getShop(params.slug);

  return (
    <ShopPage shop={shop} />
  );
}
